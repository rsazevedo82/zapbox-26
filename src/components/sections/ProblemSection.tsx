import { cn } from "@/lib/utils";

/**
 * Seção 2 — DOR / PROBLEMA.
 *
 * Copy: `geral/zapbox-copy-site.md`, "SEÇÃO 2 — DOR / PROBLEMA".
 * Headline, corpo e os 7 itens estão literais, sem reescrita.
 *
 * Os itens do documento são frases únicas — não há divisão título/descrição.
 * Renderizamos cada um como uma afirmação inteira em vez de inventar títulos.
 */

const PAIN_POINTS = [
  "Clientes esperando resposta por mais tempo do que deveriam",
  "Mensagens que se perdem no meio da rotina",
  "Dois atendentes respondendo a mesma pessoa",
  "Nenhum histórico compartilhado quando alguém sai de férias ou muda de setor",
  "Ninguém sabe ao certo quem está cuidando de qual cliente",
  "A operação inteira depende de um único aparelho",
  "Leads importantes misturados com conversas do dia a dia",
];

export function ProblemSection() {
  return (
    <section
      id="problema"
      aria-labelledby="problema-titulo"
      className="surface-noise bg-surface relative py-20 lg:py-28"
    >
      <div className="container">
        <div className="mx-auto max-w-[46rem] text-center">
          <h2
            id="problema-titulo"
            className="text-primary-950 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
          >
            Seu WhatsApp está ajudando sua empresa a vender ou está criando mais confusão?
          </h2>

          <p className="mt-6 text-base text-neutral-600 sm:text-lg">
            Quando o WhatsApp cresce sem processo, a equipe perde produtividade e oportunidades
            começam a escapar — mesmo que ninguém tenha feito nada errado.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {PAIN_POINTS.map((point) => (
            <li
              key={point}
              className={cn(
                "card-surface card-lift relative flex items-start gap-3 overflow-hidden rounded-xl p-6",
                // Filete vermelho na lateral: marca o card como um problema.
                "before:bg-error-500/70 before:absolute before:inset-y-4 before:left-0 before:w-0.5 before:rounded-full"
              )}
            >
              <AlertIcon />
              <span className="text-base text-neutral-700">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Ícone único para todos os itens: os sete são a mesma categoria (um problema).
 * Ícones distintos por item exigiriam inventar significados que a copy não tem.
 */
function AlertIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-error-500 mt-0.5 shrink-0"
    >
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 6.25v4.25" />
      <path d="M10 13.5h.01" />
    </svg>
  );
}
