import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * Seção 4 — COMO A ZAPBOX RESOLVE.
 *
 * Copy: `geral/zapbox-copy-site.md`, "SEÇÃO 4 — COMO A ZAPBOX RESOLVE".
 * Eyebrow, headline e os três pilares literais.
 *
 * O documento sugere um "micro-screenshot" por pilar — não temos screenshots
 * individuais de cada funcionalidade, então ficam apenas os ícones.
 */

type Pillar = {
  title: string;
  description: string;
  icon: ReactNode;
};

const PILLARS: Pillar[] = [
  {
    title: "Atendimento em equipe",
    description:
      "Várias pessoas atendem o mesmo número, cada uma com seu próprio usuário. Ninguém precisa mais dividir aparelho — e dois atendentes nunca mais respondem o mesmo cliente ao mesmo tempo.",
    icon: <TeamPillarIcon />,
  },
  {
    title: "Histórico centralizado",
    description:
      "Qualquer atendente autorizado enxerga o contexto completo da conversa. O atendimento continua de onde parou, mesmo que a pessoa que começou não esteja mais disponível.",
    icon: <HistoryPillarIcon />,
  },
  {
    title: "Gestão da operação",
    description:
      "O gestor acompanha conversas, responsáveis e gargalos em tempo real — e para de descobrir problemas só quando o cliente já reclamou.",
    icon: <ManagementPillarIcon />,
  },
];

export function ThreePillars() {
  return (
    <section
      id="pilares"
      aria-labelledby="pilares-titulo"
      className="surface-noise bg-surface relative py-20 lg:py-28"
    >
      <div className="container">
        <ScrollReveal className="mx-auto max-w-[46rem] text-center">
          <p className="text-accent-700 text-sm font-semibold tracking-widest uppercase">
            Como funciona por dentro
          </p>

          <h2
            id="pilares-titulo"
            className="text-primary-950 mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
          >
            Três pilares que tiram o WhatsApp do improviso
          </h2>
        </ScrollReveal>

        <ul className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {PILLARS.map((pillar, i) => (
            <ScrollReveal
              key={pillar.title}
              as="li"
              delay={i * 90}
              className="card-surface card-lift flex flex-col rounded-xl p-6 lg:p-8"
            >
              <span
                className={cn(
                  "from-accent-600 to-accent-700 text-white shadow-[inset_0_1px_0_0_rgb(255_255_255/0.25)]",
                  "glow-accent flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b"
                )}
              >
                {pillar.icon}
              </span>

              <h3 className="text-primary-950 mt-5 text-xl font-semibold">{pillar.title}</h3>
              <p className="mt-3 text-base text-neutral-600">{pillar.description}</p>
            </ScrollReveal>
          ))}
        </ul>
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

function TeamPillarIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="8" cy="8" r="3" />
      <circle cx="16.5" cy="9.5" r="2.25" />
      <path d="M2.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 15.5a4.5 4.5 0 0 1 5.5 3.5" />
    </svg>
  );
}

function HistoryPillarIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M20.5 12a8.5 8.5 0 1 1-2.6-6.1" />
      <path d="M20.5 3.5V9H15" />
      <path d="M12 7.5V12l3 1.75" />
    </svg>
  );
}

function ManagementPillarIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M3.5 3.5v17h17" />
      <path d="m7 15.5 3.5-4 3 2.5 4.5-6" />
    </svg>
  );
}
