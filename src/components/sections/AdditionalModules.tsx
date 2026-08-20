import type { ReactNode } from "react";

import { SpecialistButton } from "@/components/ui/SpecialistButton";
import { cn } from "@/lib/utils";

/**
 * Seção 11 — MÓDULOS ADICIONAIS.
 *
 * Copy: `geral/zapbox-copy-site.md`, "SEÇÃO 11 — MÓDULOS ADICIONAIS".
 * Título e frase de cada módulo literais.
 *
 * Peso visual deliberadamente menor que o das três soluções avançadas,
 * conforme o objetivo declarado da seção no documento.
 */

type Module = {
  name: string;
  tagline: string;
  description: string;
  icon: ReactNode;
};

const MODULES: Module[] = [
  {
    name: "Qualificação",
    tagline: "Prepare o lead antes do vendedor",
    description: "Colete informações e critérios importantes antes do atendimento humano começar.",
    icon: <FilterIcon />,
  },
  {
    name: "Agenda",
    tagline: "Transforme conversas em reuniões",
    description:
      "Permita que leads escolham horários disponíveis, sem a troca interminável de mensagens.",
    icon: <CalendarIcon />,
  },
  {
    name: "Follow-up",
    tagline: "Nenhuma oportunidade esquecida",
    description:
      "Crie rotinas automáticas para propostas, no-shows e leads que pararam de responder.",
    icon: <RepeatIcon />,
  },
  {
    name: "Integrações",
    tagline: "Conecte seus sistemas",
    description:
      "Integre ERP, CRM, e-commerce, formulários e sistemas próprios à operação da Zapbox.",
    icon: <PlugIcon />,
  },
];

export function AdditionalModules() {
  return (
    <section id="modulos" aria-labelledby="modulos-titulo" className="bg-surface py-16 lg:py-24">
      <div className="container">
        <div className="mx-auto max-w-[46rem] text-center">
          <h2
            id="modulos-titulo"
            className="text-primary-950 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
          >
            Adicione novos recursos conforme sua operação cresce
          </h2>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {MODULES.map((module) => (
            <li
              key={module.name}
              className={cn(
                "bg-surface-muted flex flex-col rounded-lg p-5",
                "ring-1 ring-neutral-200/70",
                "transition-shadow duration-200 hover:shadow-md motion-safe:hover:-translate-y-0.5",
                "motion-safe:transition-[box-shadow,transform]"
              )}
            >
              <span className="bg-accent-50 text-accent-700 flex h-10 w-10 items-center justify-center rounded-lg">
                {module.icon}
              </span>

              <h3 className="text-primary-950 mt-4 text-base font-semibold">{module.name}</h3>
              <p className="text-primary-800 mt-1 text-sm font-medium">{module.tagline}</p>
              <p className="mt-2 text-sm text-neutral-600">{module.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <SpecialistButton sourceCta="additional-modules-specialist" variant="outline" size="md">
            Falar com especialista
          </SpecialistButton>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

const ICON_PROPS = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function FilterIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M3.5 5h17l-6.5 7.5V19l-4 2v-8.5z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17" />
      <path d="M8 3.5V6" />
      <path d="M16 3.5V6" />
    </svg>
  );
}

function RepeatIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M4 9a4 4 0 0 1 4-4h9" />
      <path d="m14 2.5 3 2.5-3 2.5" />
      <path d="M20 15a4 4 0 0 1-4 4H7" />
      <path d="m10 21.5-3-2.5 3-2.5" />
    </svg>
  );
}

function PlugIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M9 3v5" />
      <path d="M15 3v5" />
      <path d="M6.5 8h11v3.5a5.5 5.5 0 0 1-11 0z" />
      <path d="M12 17v4" />
    </svg>
  );
}
