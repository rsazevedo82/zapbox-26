import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * Seção 10 — JORNADA DE EVOLUÇÃO.
 *
 * Copy: `geral/zapbox-copy-site.md`, "SEÇÃO 10 — JORNADA DE EVOLUÇÃO".
 * Headline, corpo e as SEIS etapas são literais.
 *
 * O documento cita destacar dinamicamente o estágio do visitante "se a
 * arquitetura permitir" — não implementado nesta fase. O destaque é fixo na
 * primeira etapa (Organize), que é o ponto de entrada do produto.
 */

const STAGES = [
  { name: "Organize", solution: "Zapbox" },
  { name: "Controle", solution: "CRM & Vendas" },
  { name: "Automatize", solution: "Automações" },
  { name: "Converta", solution: "Qualificação, Agenda e Follow-up" },
  { name: "Escale", solution: "Sales AI" },
  { name: "Integre", solution: "ERP, CRM e outros sistemas" },
];

export function EvolutionJourney() {
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
            Comece simples. Evolua quando precisar.
          </h2>

          <p className="mt-6 text-base text-neutral-600 sm:text-lg">
            Você não precisa transformar toda a operação de uma vez. Comece resolvendo o problema
            mais urgente. Quando sua equipe estiver pronta, o Zapbox ganha novas capacidades — sem
            obrigar sua empresa a trocar toda a operação.
          </p>
        </ScrollReveal>

        <ol className="relative mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-6 lg:gap-4">
          {/* Linha conectora: só no desktop, entre o primeiro e o último marcador. */}
          {/* A linha nasce accent na etapa de entrada e esmaece ao avançar. */}
          <span
            aria-hidden="true"
            className="from-accent-500/60 absolute top-5 right-[8.33%] left-[8.33%] hidden h-px bg-gradient-to-r via-neutral-300 to-neutral-200 lg:block"
          />

          {STAGES.map((stage, index) => {
            const isEntryPoint = index === 0;

            return (
              <ScrollReveal
                key={stage.name}
                as="li"
                delay={index * 70}
                className={cn(
                  // Empilhado vira linha do tempo vertical: marcador à esquerda,
                  // texto à direita. A partir de sm volta a ser coluna.
                  "relative flex items-start gap-4",
                  "sm:flex-col sm:gap-0 lg:items-center lg:text-center"
                )}
              >
                {/* Conector vertical — só na linha do tempo empilhada. */}
                {index < STAGES.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "from-accent-500/45 absolute top-11 -bottom-5 left-5 w-px -translate-x-1/2",
                      "bg-gradient-to-b to-neutral-300/70 sm:hidden"
                    )}
                  />
                )}

                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    "ring-surface-muted text-sm font-bold ring-8",
                    isEntryPoint
                      ? "from-accent-600 to-accent-700 glow-accent motion-safe:animate-node-pulse bg-gradient-to-b text-white shadow-[inset_0_1px_0_0_rgb(255_255_255/0.25)]"
                      : cn(
                          "from-surface to-primary-50 text-primary-700 border border-neutral-300 bg-gradient-to-b",
                          "shadow-[inset_0_1px_0_0_rgb(255_255_255/0.9),0_1px_2px_0_rgb(0_33_54/0.08)]"
                        )
                  )}
                >
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1 pt-1.5 sm:mt-4 sm:flex-none sm:pt-0">
                  <h3
                    className={cn(
                      "text-base font-semibold",
                      isEntryPoint ? "text-primary-950" : "text-primary-800"
                    )}
                  >
                    {stage.name}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600">{stage.solution}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
