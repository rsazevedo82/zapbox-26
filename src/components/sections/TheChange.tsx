import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * Seção 3 — A MUDANÇA.
 *
 * Copy: `geral/zapbox-copy-site.md`, "SEÇÃO 3 — A MUDANÇA". Eyebrow, headline,
 * subheadline, corpo e CTA literais.
 *
 * O diagrama "antes → depois" usa os termos da própria sugestão visual do
 * documento ("de um único aparelho passando de mão em mão para uma central com
 * múltiplos usuários organizados") — nenhum texto foi inventado.
 */

export function TheChange() {
  return (
    <section
      id="a-mudanca"
      aria-labelledby="a-mudanca-titulo"
      className="surface-noise surface-glow bg-surface-muted relative py-20 lg:py-28"
    >
      <div className="container">
        <ScrollReveal className="mx-auto max-w-[45rem] text-center">
          <p className="text-accent-700 text-sm font-semibold tracking-widest uppercase">
            A mudança
          </p>

          <h2
            id="a-mudanca-titulo"
            className="text-primary-950 mt-4 font-display text-3xl leading-[1.12] font-bold tracking-tight text-balance sm:text-4xl"
          >
            O Zapbox coloca ordem na operação sem mudar a forma como seu cliente fala com você
          </h2>

          <p className="mt-6 text-base text-neutral-700 sm:text-lg">
            Seu cliente continua mandando mensagem no mesmo número de sempre. O que muda é o que
            acontece do seu lado.
          </p>

          <p className="mt-4 text-base text-neutral-600">
            A Zapbox organiza sua equipe, centraliza o histórico e dá visibilidade ao gestor — para
            que atender bem deixe de depender da sorte de quem pegou o celular primeiro.
          </p>
        </ScrollReveal>

        {/* Diagrama antes → depois */}
        <div className="mx-auto mt-12 grid max-w-[52rem] items-stretch gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <ScrollReveal direction="left" distance="1rem">
            <StateCard
              label="Antes"
              description="Um único aparelho passando de mão em mão"
              tone="muted"
              icon={<PhoneIcon />}
            />
          </ScrollReveal>

          <div className="flex items-center justify-center" aria-hidden="true">
            <ArrowIcon />
          </div>

          <ScrollReveal direction="right" distance="1rem" delay={120}>
            <StateCard
              label="Depois"
              description="Uma central com múltiplos usuários organizados"
              tone="accent"
              icon={<HubIcon />}
            />
          </ScrollReveal>
        </div>

        <div className="mt-12 flex justify-center">
          <Button href="#solucoes" variant="outline" size="md">
            Conhecer os recursos
          </Button>
        </div>
      </div>
    </section>
  );
}

function StateCard({
  label,
  description,
  tone,
  icon,
}: {
  label: string;
  description: string;
  tone: "muted" | "accent";
  icon: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "card-surface flex flex-col items-center gap-3 rounded-xl p-6 text-center",
        tone === "accent"
          ? "outline-accent-600/45 shadow-[inset_0_1px_0_0_rgb(255_255_255/0.9),0_20px_48px_-20px_rgb(0_153_95/0.4)] outline-2"
          : "opacity-90 grayscale-[0.35]"
      )}
    >
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-lg",
          tone === "accent"
            ? "from-accent-600 to-accent-700 glow-accent bg-gradient-to-b text-white shadow-[inset_0_1px_0_0_rgb(255_255_255/0.25)]"
            : "bg-neutral-100 text-neutral-500"
        )}
      >
        {icon}
      </span>
      <p
        className={cn(
          "text-xs font-semibold tracking-widest uppercase",
          tone === "accent" ? "text-accent-700" : "text-neutral-600"
        )}
      >
        {label}
      </p>
      <p className="text-primary-950 text-base font-medium text-balance">{description}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

const ICON_PROPS = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function PhoneIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M10.5 18.5h3" />
    </svg>
  );
}

function HubIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="3.5" r="1.75" />
      <circle cx="19.5" cy="16.5" r="1.75" />
      <circle cx="4.5" cy="16.5" r="1.75" />
      <path d="M12 6.5V9" />
      <path d="m14.6 13.7 3.2 1.9" />
      <path d="m9.4 13.7-3.2 1.9" />
    </svg>
  );
}

/** Seta: horizontal no desktop, vertical no mobile. */
function ArrowIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-accent-600 rotate-90 motion-safe:animate-pulse sm:rotate-0"
    >
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </svg>
  );
}
