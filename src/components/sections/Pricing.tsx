import { Button } from "@/components/ui/Button";
import { LeadFormButton } from "@/components/ui/LeadFormButton";
import { PLANS, getWhatsAppUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Seção 8 — PLANOS DO ZAPBOX SOFTWARE.
 *
 * Copy: `geral/zapbox-copy-site.md`, "SEÇÃO 8 — PLANOS DO ZAPBOX SOFTWARE".
 *
 * Preços e features vêm de `PLANS` em `src/lib/constants.ts` — fonte de verdade.
 * A lista de features do documento é redigida em benefícios ("Atendimento em
 * equipe no mesmo número"), enquanto a de constants.ts é quantitativa
 * ("3 usuários incluídos"). Conforme instrução, prevalece constants.ts.
 *
 * "Ideal para" e o rótulo do CTA não existem em constants.ts e vêm do
 * documento, mapeados por id do plano.
 */

const PLAN_COPY: Record<string, { idealFor: string; ctaLabel: string }> = {
  essencial: {
    idealFor: "Pequenos negócios que precisam sair do improviso.",
    ctaLabel: "Começar agora",
  },
  time: {
    idealFor: "Equipes em crescimento que precisam de mais capacidade.",
    ctaLabel: "Escolher Time",
  },
  operacao: {
    idealFor: "Operações maiores, com mais volume e mais necessidade de controle.",
    ctaLabel: "Escolher Operação",
  },
};

function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR");
}

export function Pricing() {
  return (
    <section
      id="planos"
      aria-labelledby="planos-titulo"
      className="bg-surface-muted py-16 lg:py-24"
    >
      <div className="container">
        <div className="mx-auto max-w-[46rem] text-center">
          <p className="text-accent-700 text-sm font-semibold tracking-widest uppercase">
            Zapbox Software
          </p>

          <h2
            id="planos-titulo"
            className="text-primary-950 mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
          >
            Escolha o plano certo para organizar seu WhatsApp
          </h2>

          <p className="mt-6 text-base text-neutral-600 sm:text-lg">
            Comece com o que sua operação precisa hoje. Você pode evoluir depois.
          </p>
        </div>

        <ul className="mt-12 grid items-stretch gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {PLANS.map((plan) => {
            const copy = PLAN_COPY[plan.id];

            return (
              <li key={plan.id} className="flex">
                <div
                  className={cn(
                    "bg-surface flex w-full flex-col rounded-lg p-6 lg:p-8",
                    plan.highlight
                      ? "ring-accent-600 relative ring-2 lg:-my-2 lg:py-10"
                      : "ring-1 ring-neutral-200"
                  )}
                >
                  {plan.highlight && (
                    <span
                      className={cn(
                        "bg-accent-600 absolute -top-3 left-1/2 -translate-x-1/2",
                        "rounded-full px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase"
                      )}
                    >
                      Mais escolhido
                    </span>
                  )}

                  <h3 className="text-primary-950 text-xl font-bold">{plan.name}</h3>

                  <p className="mt-4 flex items-baseline gap-1">
                    <span className="text-primary-950 text-lg font-medium">R$</span>
                    <span className="text-primary-950 text-4xl font-bold tracking-tight">
                      {formatPrice(plan.price)}
                    </span>
                    <span className="text-base text-neutral-500">/{plan.period}</span>
                  </p>

                  <p className="mt-4 text-sm text-neutral-600">{plan.description}</p>

                  {copy && (
                    <p className="text-primary-800 mt-3 text-sm">
                      <span className="font-semibold">Ideal para:</span> {copy.idealFor}
                    </p>
                  )}

                  <ul className="mt-6 flex flex-col gap-3 border-t border-neutral-200 pt-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <CheckIcon />
                        <span className="text-sm text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* grow empurra o CTA para a base, equalizando a altura dos cards. */}
                  <div className="mt-8 grow" />

                  <LeadFormButton
                    planInterest={plan.id}
                    sourceCta={`pricing-${plan.id}`}
                    variant={plan.highlight ? "primary" : "outline"}
                    size="md"
                    className="w-full"
                  >
                    {copy?.ctaLabel ?? "Começar agora"}
                  </LeadFormButton>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mx-auto mt-12 max-w-[46rem] text-center">
          <p className="text-sm text-neutral-600">
            Nenhum plano inclui CRM, automações personalizadas ou inteligência artificial — essas
            soluções vêm depois, quando sua operação estiver pronta para elas.
          </p>

          <p className="mt-6 text-sm text-neutral-600">
            Ficou com dúvida antes de decidir?{" "}
            <Button
              href={getWhatsAppUrl()}
              variant="ghost"
              size="sm"
              className="px-1 py-0 align-baseline"
            >
              Falar com especialista
            </Button>
          </p>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-accent-600 mt-0.5 shrink-0"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}
