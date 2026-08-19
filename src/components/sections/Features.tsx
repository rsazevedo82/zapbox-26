import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Seção 6 — BENEFÍCIOS / RECURSOS.
 *
 * Copy: `geral/zapbox-copy-site.md`, "SEÇÃO 6 — BENEFÍCIOS / RECURSOS".
 * Os 6 cards estão literais (título + uma linha), como no documento, que sugere
 * "grid de 6 cards (desktop: 3 colunas; mobile: 1 coluna), ícone simples".
 *
 * O documento não define CTA para esta seção — nenhum foi adicionado.
 */

type Feature = {
  title: string;
  description: string;
  icon: ReactNode;
};

const FEATURES: Feature[] = [
  {
    title: "Atenda em equipe sem conflito",
    description:
      "Várias pessoas respondem pelo mesmo número sem atropelar o trabalho umas das outras.",
    icon: <TeamIcon />,
  },
  {
    title: "Nunca perca o contexto",
    description: "Histórico centralizado para a equipe continuar o atendimento de onde ele parou.",
    icon: <HistoryIcon />,
  },
  {
    title: "Responda mais rápido",
    description: "Organização, respostas rápidas e visibilidade sobre o que ainda está pendente.",
    icon: <BoltIcon />,
  },
  {
    title: "Saiba quem está cuidando de cada cliente",
    description: "Responsabilidade clara em cada atendimento, sem depender de perguntar no grupo.",
    icon: <AssigneeIcon />,
  },
  {
    title: "Trabalhe no computador e no celular",
    description: "A operação acompanha sua equipe, esteja ela onde estiver.",
    icon: <DevicesIcon />,
  },
  {
    title: "Ganhe controle para crescer",
    description: "Uma estrutura que aguenta mais gente e mais volume sem virar bagunça.",
    icon: <GrowthIcon />,
  },
];

export function Features() {
  return (
    <section id="solucoes" aria-labelledby="solucoes-titulo" className="bg-surface py-16 lg:py-24">
      <div className="container">
        <div className="mx-auto max-w-[46rem] text-center">
          <h2
            id="solucoes-titulo"
            className="text-primary-950 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
          >
            Tudo o que sua equipe precisa para atender melhor
          </h2>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {FEATURES.map((feature) => (
            <li
              key={feature.title}
              className={cn(
                "bg-surface flex flex-col rounded-lg p-6",
                "ring-1 ring-neutral-200",
                "transition-shadow duration-200 hover:shadow-md motion-safe:hover:-translate-y-0.5",
                "motion-safe:transition-[box-shadow,transform]"
              )}
            >
              <span
                className={cn(
                  "bg-accent-50 text-accent-700 flex h-11 w-11 items-center justify-center",
                  "rounded-lg"
                )}
              >
                {feature.icon}
              </span>

              <h3 className="text-primary-950 mt-5 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-base text-neutral-600">{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Ícones — SVG inline mínimo, sem dependências. Todos decorativos.            */
/* -------------------------------------------------------------------------- */

const ICON_PROPS = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function TeamIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.5a3.25 3.25 0 0 1 0 6" />
      <path d="M17.5 14.5a5.5 5.5 0 0 1 3 5" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M13 2.5 4.5 13.5H11l-.5 8L19 10.5h-6.5z" />
    </svg>
  );
}

function AssigneeIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="10" cy="8" r="3.25" />
      <path d="M4 19.5a6 6 0 0 1 10.5-3.95" />
      <path d="m15.5 18.5 2 2 4-4.5" />
    </svg>
  );
}

function DevicesIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="2.5" y="4.5" width="13" height="9.5" rx="1.5" />
      <path d="M6.5 18.5h5" />
      <path d="M9 14v4.5" />
      <rect x="17.5" y="10.5" width="4.5" height="9" rx="1.5" />
    </svg>
  );
}

function GrowthIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M3.5 20.5h17" />
      <path d="M7 20.5v-5" />
      <path d="M12 20.5v-9" />
      <path d="M17 20.5v-13" />
    </svg>
  );
}
