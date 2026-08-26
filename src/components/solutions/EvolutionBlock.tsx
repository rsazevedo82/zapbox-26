import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

/**
 * Bloco de conexão entre as páginas de solução.
 *
 * Copy: `geral/Copy das páginas de soluções Zapbox.md`, seção "Mensagem de
 * conexão entre as páginas". São CINCO etapas — a jornada da home tem seis,
 * porque inclui "Converta"; aqui vale a lista do documento.
 *
 * `activeStep` marca onde a solução da página se encaixa na jornada.
 */

const STAGES = [
  { id: "organize", name: "Organize", solution: "Atendimento Zapbox" },
  { id: "controle", name: "Controle", solution: "CRM & Vendas" },
  { id: "automatize", name: "Automatize", solution: "Automações" },
  { id: "escale", name: "Escale", solution: "Sales AI" },
  { id: "integre", name: "Integre", solution: "Seus sistemas" },
] as const;

export type EvolutionStep = (typeof STAGES)[number]["id"];

export function EvolutionBlock({ activeStep }: { activeStep?: EvolutionStep }) {
  return (
    <section
      id="jornada"
      aria-labelledby="jornada-titulo"
      className="surface-noise bg-surface-muted relative py-20 lg:py-28"
    >
      <div className="container">
        <ScrollReveal className="mx-auto max-w-[46rem] text-center">
          <h2
            id="jornada-titulo"
            className="text-primary-950 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
          >
            O Zapbox cresce junto com sua operação
          </h2>
        </ScrollReveal>

        <ol className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5 lg:gap-4">
          {/* Linha conectora: nasce accent na entrada e esmaece ao avançar. */}
          <span
            aria-hidden="true"
            className="from-accent-500/60 absolute top-5 right-[10%] left-[10%] hidden h-px bg-gradient-to-r via-neutral-300 to-neutral-200 lg:block"
          />

          {STAGES.map((stage, index) => {
            const isActive = activeStep === stage.id;

            return (
              <ScrollReveal
                key={stage.id}
                as="li"
                delay={index * 70}
                className="relative flex flex-col lg:items-center lg:text-center"
              >
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    "ring-surface-muted text-sm font-bold ring-8",
                    isActive
                      ? "from-accent-600 to-accent-700 glow-accent motion-safe:animate-node-pulse bg-gradient-to-b text-white shadow-[inset_0_1px_0_0_rgb(255_255_255/0.25)]"
                      : "bg-surface text-primary-700 border border-neutral-300"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {index + 1}
                </span>

                <h3
                  className={cn(
                    "mt-4 text-base font-semibold",
                    isActive ? "text-accent-800" : "text-primary-800"
                  )}
                >
                  {stage.name}
                </h3>
                <p className="mt-1 text-sm text-neutral-600">{stage.solution}</p>
              </ScrollReveal>
            );
          })}
        </ol>

        <ScrollReveal className="mt-12 text-center">
          <p className="text-primary-950 text-lg font-semibold text-balance">
            Comece pelo problema mais urgente. Evolua quando precisar.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
