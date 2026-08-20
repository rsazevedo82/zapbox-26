import { Button } from "@/components/ui/Button";
import { LeadFormButton } from "@/components/ui/LeadFormButton";
import { cn } from "@/lib/utils";

/**
 * Hero da homepage.
 *
 * Copy: `geral/zapbox-copy-site.md`, Seção 1 — HERO (headline recomendada na
 * seção 4 do mesmo documento). Único ajuste em relação ao documento está na
 * microcopy — ver comentário abaixo.
 *
 * Server component: não há interatividade própria aqui.
 */

const MICRO_BENEFITS = [
  "Vários atendentes no mesmo WhatsApp",
  "Histórico centralizado da conversa",
  "Atendimento pelo computador e pelo celular",
  "Controle sobre quem é responsável por cada cliente",
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-titulo"
      className={cn(
        "relative isolate overflow-hidden",
        "from-primary-950 via-primary-950 to-primary-900 bg-gradient-to-b",
        "pt-16 lg:pt-20"
      )}
    >
      {/* Malha decorativa sutil — não compete com o texto. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-32 left-1/2 -z-10 h-[32rem] w-[32rem]",
          "bg-accent-600/20 -translate-x-1/2 rounded-full blur-3xl"
        )}
      />

      <div className="container flex min-h-[calc(100dvh-4rem)] flex-col justify-center py-16 lg:min-h-[calc(100dvh-5rem)] lg:py-24">
        <div className="mx-auto flex max-w-[50rem] flex-col items-center text-center">
          {/* Eyebrow */}
          <p
            className={cn(
              "inline-flex items-center rounded-full border border-white/20 bg-white/5",
              "text-primary-100 px-4 py-1.5 text-sm font-medium"
            )}
          >
            Plataforma de atendimento e vendas pelo WhatsApp
          </p>

          <h1
            id="hero-titulo"
            className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Transforme seu WhatsApp em uma operação organizada
          </h1>

          <p className="text-primary-200 mt-6 max-w-[42rem] text-base sm:text-lg lg:text-xl">
            Um único número, vários atendentes e todo o histórico em um só lugar — para sua equipe
            atender e vender sem perder conversas.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <LeadFormButton
              sourceCta="hero"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Começar agora
            </LeadFormButton>
            <Button
              href="#como-funciona"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Ver como funciona
            </Button>
          </div>

          {/*
            Microcopy do documento: "Sem trocar seu número. Comece a organizar em minutos."
            A segunda frase promete início imediato, o que implicaria autoatendimento —
            o site não tem contratação self-service. Mantida a primeira frase e ajustada
            a segunda para preservar a ideia de baixo atrito sem prometer imediatismo.
          */}
          <p className="text-primary-300 mt-6 text-sm">
            Sem trocar seu número. Comece a organizar sua operação com nosso time.
          </p>

          {/* Microbenefícios */}
          <ul className="mt-12 grid w-full gap-x-8 gap-y-3 text-left sm:grid-cols-2">
            {MICRO_BENEFITS.map((benefit) => (
              <li key={benefit} className="text-primary-100 flex items-start gap-3 text-sm">
                <CheckIcon />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-accent-400 mt-0.5 shrink-0"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}
