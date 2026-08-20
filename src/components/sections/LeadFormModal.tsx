"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { trackEvent } from "@/lib/analytics";
import { getPlanById, getWhatsAppUrl, type PlanId } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { leadFormSchema } from "@/lib/validations";

/**
 * Modal de captura de lead — principal ponto de conversão do site.
 *
 * Fluxo: valida no client com o MESMO schema Zod do backend
 * (`leadFormSchema`), envia para `POST /api/leads` e redireciona ao WhatsApp.
 *
 * O backend responde `success: true` mesmo quando o Supabase falha
 * (`persisted: false`) — nesse caso ele já disparou o e-mail de emergência.
 * Aqui tratamos os dois casos como sucesso: o lead não pode ser penalizado
 * por uma falha de infraestrutura.
 */

type LeadFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  planInterest?: PlanId;
  sourceCta?: string;
};

type Status = "idle" | "loading" | "success" | "error";

type FieldErrors = Partial<Record<"name" | "phone" | "company" | "consent_lgpd", string>>;

const REDIRECT_DELAY_MS = 1500;

/** Lê as UTMs da URL atual. Só roda no client. */
function readUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
    utm_term: params.get("utm_term") ?? undefined,
  };
}

export function LeadFormModal({ isOpen, onClose, planInterest, sourceCta }: LeadFormModalProps) {
  const titleId = useId();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState("#");

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const startedRef = useRef(false);

  const plan = planInterest ? getPlanById(planInterest) : undefined;
  const isBusy = status === "loading" || status === "success";

  /** Dispara form_start apenas uma vez por abertura. */
  const markStarted = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent({ event: "form_start" });
  }, []);

  // Reset + evento de abertura.
  useEffect(() => {
    if (!isOpen) return;

    setErrors({});
    setFormError(null);
    setStatus("idle");
    startedRef.current = false;
    trackEvent({ event: "form_open" });

    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 50);
    return () => window.clearTimeout(focusTimer);
  }, [isOpen]);

  // Escape fecha, Tab fica preso, body não rola.
  useEffect(() => {
    if (!isOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  /** Monta o payload exatamente no formato que o schema/route espera. */
  const buildPayload = useCallback(() => {
    return {
      name,
      phone,
      company,
      plan_interest: planInterest ?? "",
      source_page: window.location.pathname,
      source_cta: sourceCta ?? "",
      ...readUtmParams(),
      referrer: document.referrer || undefined,
      consent_lgpd: consent,
      honeypot,
    };
  }, [name, phone, company, planInterest, sourceCta, consent, honeypot]);

  /**
   * Valida o objeto inteiro com o schema do backend e devolve os erros
   * indexados por campo. `fields` limita quais erros ficam visíveis — usado
   * no blur para não acusar campos que o usuário ainda nem tocou.
   */
  const validate = useCallback(
    (fields?: Array<keyof FieldErrors>): FieldErrors | null => {
      const result = leadFormSchema.safeParse(buildPayload());
      if (result.success) return null;

      const found: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FieldErrors | undefined;
        if (!field) continue;
        if (fields && !fields.includes(field)) continue;
        if (!found[field]) found[field] = issue.message;
      }
      return found;
    },
    [buildPayload]
  );

  const handleBlur = (field: keyof FieldErrors) => () => {
    const found = validate([field]);
    setErrors((current) => ({ ...current, [field]: found?.[field] }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isBusy) return;

    trackEvent({ event: "form_submit" });
    setFormError(null);

    const found = validate();
    if (found && Object.keys(found).length > 0) {
      setErrors(found);
      trackEvent({ event: "form_error", error: "validacao_client" });
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });

      const data: { success?: boolean; errors?: string[] } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok || !data.success) {
        const message =
          response.status === 429
            ? "Muitas tentativas. Aguarde alguns minutos."
            : response.status === 400 && data.errors?.length
              ? data.errors.join(" ")
              : "Ocorreu um erro. Tente novamente ou fale direto pelo WhatsApp.";

        setFormError(message);
        setStatus("error");
        trackEvent({ event: "form_error", error: `http_${response.status}` });
        return;
      }

      // Sucesso — inclui persisted: false, em que o backend já acionou o fallback.
      const url = getWhatsAppUrl({ name, plan: plan?.name });
      setWhatsappUrl(url);
      setStatus("success");
      trackEvent({ event: "form_success", plan: planInterest });

      window.setTimeout(() => {
        trackEvent({ event: "whatsapp_redirect", plan: planInterest });
        // location.href em vez de window.open: não é bloqueado por popup blocker.
        if (url !== "#") window.location.href = url;
      }, REDIRECT_DELAY_MS);
    } catch {
      setFormError("Não foi possível conectar. Tente novamente ou fale direto pelo WhatsApp.");
      setStatus("error");
      trackEvent({ event: "form_error", error: "network" });
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="presentation"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative z-10 flex max-h-[92dvh] w-full flex-col overflow-y-auto",
          "bg-surface rounded-t-xl p-6 shadow-2xl sm:max-w-lg sm:rounded-xl sm:p-8",
          "motion-safe:animate-consent-in"
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className={cn(
            "absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-lg",
            "text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800",
            "focus-visible:outline-accent-500 focus-visible:outline-2 focus-visible:outline-offset-2"
          )}
        >
          <CloseIcon />
        </button>

        {status === "success" ? (
          <SuccessState whatsappUrl={whatsappUrl} titleId={titleId} />
        ) : (
          <>
            <h2 id={titleId} className="text-primary-950 pr-10 text-xl font-bold sm:text-2xl">
              {plan ? `Comece com o plano ${plan.name}` : "Fale com a gente"}
            </h2>

            <p className="mt-2 text-sm text-neutral-600">
              Preencha seus dados e um especialista entra em contato pelo WhatsApp.
            </p>

            {plan && (
              <p className="bg-accent-50 text-accent-800 mt-4 rounded-lg px-3 py-2 text-sm">
                Plano selecionado: <span className="font-semibold">{plan.name}</span>
              </p>
            )}

            <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
              <Input
                ref={firstFieldRef}
                label="Seu nome"
                name="name"
                autoComplete="name"
                placeholder="Como podemos te chamar?"
                required
                disabled={isBusy}
                value={name}
                onChange={(e) => {
                  markStarted();
                  setName(e.target.value);
                }}
                onBlur={handleBlur("name")}
                error={errors.name}
              />

              <Input
                label="Seu WhatsApp"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(11) 99999-9999"
                required
                disabled={isBusy}
                value={phone}
                onChange={(e) => {
                  markStarted();
                  setPhone(e.target.value);
                }}
                onBlur={handleBlur("phone")}
                error={errors.phone}
              />

              <Input
                label="Empresa (opcional)"
                name="company"
                autoComplete="organization"
                placeholder="Nome da sua empresa"
                disabled={isBusy}
                value={company}
                onChange={(e) => {
                  markStarted();
                  setCompany(e.target.value);
                }}
                onBlur={handleBlur("company")}
                error={errors.company}
              />

              {/*
                Honeypot: fora da tela, mas sem display:none — bots preenchem,
                humanos nunca veem nem alcançam via teclado.
              */}
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="company_url">Não preencha este campo</label>
                <input
                  id="company_url"
                  name="company_url"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="flex cursor-pointer items-start gap-3 text-sm text-neutral-600">
                  <input
                    type="checkbox"
                    checked={consent}
                    disabled={isBusy}
                    onChange={(e) => {
                      markStarted();
                      setConsent(e.target.checked);
                      setErrors((current) => ({ ...current, consent_lgpd: undefined }));
                    }}
                    aria-invalid={Boolean(errors.consent_lgpd) || undefined}
                    className="accent-accent-600 mt-0.5 h-4 w-4 shrink-0"
                  />
                  <span>
                    Autorizo a Zapbox a entrar em contato comigo pelo WhatsApp e e-mail sobre planos
                    e soluções. Leia nossa{" "}
                    <Link
                      href="/privacidade"
                      className="text-accent-700 font-medium underline underline-offset-2"
                    >
                      Política de Privacidade
                    </Link>
                    .
                  </span>
                </label>

                {errors.consent_lgpd && (
                  <p className="text-error-600 mt-1.5 text-sm">{errors.consent_lgpd}</p>
                )}
              </div>

              {formError && (
                <div
                  role="alert"
                  className="bg-error-50 text-error-700 rounded-lg px-3 py-2.5 text-sm"
                >
                  <p>{formError}</p>
                  <a
                    href={getWhatsAppUrl({ name: name || undefined, plan: plan?.name })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block font-semibold underline underline-offset-2"
                  >
                    Falar direto pelo WhatsApp
                  </a>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isBusy}
                className="w-full"
              >
                {status === "loading" ? (
                  <>
                    <Spinner />
                    Enviando...
                  </>
                ) : (
                  "Enviar"
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function SuccessState({ whatsappUrl, titleId }: { whatsappUrl: string; titleId: string }) {
  return (
    <div className="py-4 text-center" role="status">
      <span className="bg-accent-50 text-accent-700 mx-auto flex h-14 w-14 items-center justify-center rounded-full">
        <CheckIcon />
      </span>

      <h2 id={titleId} className="text-primary-950 mt-5 text-xl font-bold">
        Recebemos seu contato!
      </h2>

      <p className="mt-2 text-sm text-neutral-600">Redirecionando para o WhatsApp...</p>

      {whatsappUrl !== "#" && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-700 mt-4 inline-block text-sm font-semibold underline underline-offset-2"
        >
          Se não foi redirecionado, clique aqui para abrir o WhatsApp
        </a>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="animate-spin"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
