import type { ReactNode } from "react";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

/**
 * Blocos de construção das páginas de solução.
 *
 * Mantêm o mesmo ritmo da home: py-20/28, container, H2 revelado ao rolar e
 * alternância de fundos.
 */

type Background = "white" | "muted" | "dark";

const BACKGROUNDS: Record<Background, string> = {
  white: "surface-noise bg-surface",
  muted: "surface-noise bg-surface-muted",
  dark: "surface-beam grid-fade bg-primary-950 overflow-hidden",
};

type SolutionSectionProps = {
  id: string;
  title: string;
  eyebrow?: string;
  subtitle?: ReactNode;
  background?: Background;
  children?: ReactNode;
};

export function SolutionSection({
  id,
  title,
  eyebrow,
  subtitle,
  background = "white",
  children,
}: SolutionSectionProps) {
  const dark = background === "dark";
  const tituloId = `${id}-titulo`;

  return (
    <section
      id={id}
      aria-labelledby={tituloId}
      className={cn("relative py-20 lg:py-28", BACKGROUNDS[background])}
    >
      <div className="container">
        <ScrollReveal className="mx-auto max-w-[48rem] text-center">
          {eyebrow && (
            <p
              className={cn(
                "text-xs font-semibold tracking-[0.14em] uppercase",
                dark ? "text-accent-300" : "text-accent-700"
              )}
            >
              {eyebrow}
            </p>
          )}

          <h2
            id={tituloId}
            className={cn(
              "text-3xl font-bold tracking-tight text-balance sm:text-4xl",
              eyebrow && "mt-4",
              dark ? "text-shine" : "text-primary-950"
            )}
          >
            {title}
          </h2>

          {subtitle && (
            <div
              className={cn(
                "mt-6 flex flex-col gap-4 text-base sm:text-lg",
                dark ? "text-primary-200" : "text-neutral-600"
              )}
            >
              {subtitle}
            </div>
          )}
        </ScrollReveal>

        {children && <div className="mt-12 lg:mt-16">{children}</div>}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/** Grid de cards com título e descrição, revelado com escalonamento. */
export function SolutionCards({
  items,
  columns = 3,
  dark = false,
}: {
  items: { title: string; description: string }[];
  columns?: 2 | 3;
  dark?: boolean;
}) {
  return (
    <ul
      className={cn(
        "grid gap-6 sm:grid-cols-2",
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
      )}
    >
      {items.map((item, i) => (
        <ScrollReveal
          key={item.title}
          as="li"
          delay={Math.min(i, 4) * 70}
          className={cn(
            "flex flex-col rounded-xl p-6",
            dark
              ? "glass-panel ease-fluid transition-colors duration-300 hover:border-white/25 hover:bg-white/10"
              : "card-surface card-lift"
          )}
        >
          <h3 className={cn("text-lg font-semibold", dark ? "text-white" : "text-primary-950")}>
            {item.title}
          </h3>
          <p className={cn("mt-2 text-base", dark ? "text-primary-200" : "text-neutral-600")}>
            {item.description}
          </p>
        </ScrollReveal>
      ))}
    </ul>
  );
}

/** Lista com marcador accent — usada nos blocos de bullets do documento. */
export function SolutionList({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="mx-auto flex max-w-[42rem] flex-col gap-3">
      {items.map((item, i) => (
        <ScrollReveal
          key={item}
          as="li"
          delay={Math.min(i, 5) * 50}
          className="flex items-start gap-3"
        >
          <span
            aria-hidden="true"
            className={cn(
              "mt-2 h-1.5 w-1.5 shrink-0 rounded-full",
              dark ? "bg-accent-400" : "bg-accent-600"
            )}
          />
          <span className={cn("text-base", dark ? "text-primary-100" : "text-neutral-700")}>
            {item}
          </span>
        </ScrollReveal>
      ))}
    </ul>
  );
}

/** Frase de destaque: tipografia maior, sem virar headline. */
export function SolutionHighlight({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <ScrollReveal className="mx-auto max-w-[44rem] text-center">
      <p
        className={cn(
          "text-xl font-semibold text-balance sm:text-2xl",
          dark ? "text-white" : "text-primary-950"
        )}
      >
        {children}
      </p>
    </ScrollReveal>
  );
}

/** Citação com filete accent à esquerda. */
export function SolutionQuote({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <blockquote
      className={cn(
        "border-accent-600/60 rounded-r-lg border-l-2 py-3 pl-5",
        dark ? "text-primary-100 bg-white/5" : "bg-accent-50/60 text-primary-900"
      )}
    >
      <p className="text-base sm:text-lg">{children}</p>
    </blockquote>
  );
}
