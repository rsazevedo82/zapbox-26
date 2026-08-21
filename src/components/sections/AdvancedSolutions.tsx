import type { ReactNode } from "react";

import { SpecialistButton } from "@/components/ui/SpecialistButton";
import { cn } from "@/lib/utils";

/**
 * Seção 9 — SOLUÇÕES AVANÇADAS.
 *
 * Copy: `geral/zapbox-copy-site.md`, "SEÇÃO 9 — SOLUÇÕES AVANÇADAS".
 * Headline de cada solução, texto e os cinco benefícios são literais.
 *
 * Nesta metade da página o CTA é consultivo: os três CTAs documentados
 * ("Conhecer CRM & Vendas" etc.) levam ao WhatsApp, não a contratação.
 * "Começar agora" não aparece aqui, conforme a regra do documento.
 */

type Solution = {
  /** Slug estável para identificar a origem do CTA no analytics. */
  id: string;
  name: string;
  headline: string;
  text: string;
  benefits: string[];
  ctaLabel: string;
  icon: ReactNode;
};

const SOLUTIONS: Solution[] = [
  {
    id: "crm-vendas",
    name: "CRM & Vendas",
    headline: "Transforme conversas em oportunidades de venda",
    text: "Organize leads, propostas e negociações em um pipeline comercial e acompanhe cada oportunidade até o fechamento.",
    benefits: [
      "Pipeline comercial organizado",
      "Cada lead com etapa e responsável definidos",
      "Tarefas e acompanhamento de propostas",
      "Visão da carteira e previsão comercial",
      "Motivos de perda registrados, não esquecidos",
    ],
    ctaLabel: "Conhecer CRM & Vendas",
    icon: <PipelineIcon />,
  },
  {
    id: "automacoes",
    name: "Automações",
    headline: "Elimine tarefas que sua equipe ainda faz manualmente",
    text: "Automatize distribuição de leads, alertas, atualizações e follow-ups entre o Zapbox e os sistemas da empresa.",
    benefits: [
      "Distribuição automática de leads",
      "Alertas quando algo precisa de atenção",
      "Atualizações sem digitação manual",
      "Follow-ups disparados no momento certo",
      "Conexão entre Zapbox e outros sistemas",
    ],
    ctaLabel: "Conhecer Automações",
    icon: <AutomationIcon />,
  },
  {
    id: "sales-ai",
    name: "Sales AI",
    headline: "Adicione inteligência à operação",
    text: "Use inteligência artificial para responder, qualificar, resumir conversas e apoiar sua equipe 24 horas por dia — sem substituir o atendimento humano.",
    benefits: [
      "Atendimento com IA disponível o tempo todo",
      "Qualificação automática de leads",
      "Resumo de conversas para o vendedor",
      "Atualização automática do CRM",
      "Transferência para humano quando necessário",
    ],
    ctaLabel: "Conhecer Sales AI",
    icon: <SparkIcon />,
  },
];

export function AdvancedSolutions() {
  return (
    <section
      id="solucoes-avancadas"
      aria-labelledby="solucoes-avancadas-titulo"
      className="surface-noise bg-surface relative py-20 lg:py-28"
    >
      <div className="container">
        <div className="mx-auto max-w-[46rem] text-center">
          <p className="text-accent-700 text-sm font-semibold tracking-widest uppercase">
            Soluções avançadas
          </p>

          <h2
            id="solucoes-avancadas-titulo"
            className="text-primary-950 mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
          >
            Três formas de fazer sua operação ir além do atendimento
          </h2>
        </div>

        <ul className="mt-12 grid items-stretch gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {SOLUTIONS.map((solution) => (
            <li key={solution.id} className="flex">
              <div
                className={cn(
                  "group relative flex w-full flex-col overflow-hidden rounded-2xl p-6 lg:p-8",
                  "from-primary-950 to-primary-900 bg-gradient-to-b",
                  "ease-fluid ring-1 ring-white/10 transition-shadow duration-300",
                  "shadow-[inset_0_1px_0_0_rgb(255_255_255/0.08),0_18px_44px_-24px_rgb(0_33_54/0.55)]",
                  "hover:ring-accent-500/40 hover:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.12),0_26px_60px_-24px_rgb(0_153_95/0.45)]",
                  "motion-safe:transition-transform motion-safe:hover:-translate-y-1"
                )}
              >
                <span className="glass-panel text-accent-300 relative flex h-12 w-12 items-center justify-center rounded-xl">
                  {solution.icon}
                </span>

                <p className="text-accent-300 mt-5 text-xs font-semibold tracking-[0.16em] uppercase">
                  {solution.name}
                </p>

                <h3 className="mt-2 text-xl font-bold text-balance text-white">
                  {solution.headline}
                </h3>

                <p className="text-primary-200 mt-3 text-base">{solution.text}</p>

                <ul className="mt-6 flex flex-col gap-2.5 border-t border-white/10 pt-6">
                  {solution.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5">
                      <CheckIcon />
                      <span className="text-primary-100 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 grow" />

                <SpecialistButton
                  sourceCta={`advanced-solutions-${solution.id}`}
                  variant="secondary"
                  size="md"
                  className="w-full"
                >
                  {solution.ctaLabel}
                </SpecialistButton>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <SpecialistButton sourceCta="advanced-solutions-specialist" variant="primary" size="lg">
            Falar com especialista
          </SpecialistButton>
        </div>
      </div>
    </section>
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

function PipelineIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="3" y="4" width="5" height="16" rx="1.5" />
      <rect x="9.5" y="4" width="5" height="11" rx="1.5" />
      <rect x="16" y="4" width="5" height="7" rx="1.5" />
    </svg>
  );
}

function AutomationIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.5 6H15a3 3 0 0 1 3 3v6" />
      <path d="m15.5 12.5 2.5 3 2.5-3" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="m5.6 5.6 2.8 2.8" />
      <path d="m15.6 15.6 2.8 2.8" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <circle cx="12" cy="12" r="3" />
    </svg>
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
      className="text-accent-400 mt-0.5 shrink-0"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}
