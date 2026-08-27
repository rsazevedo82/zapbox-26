import Link from "next/link";
import type { ReactNode } from "react";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

/**
 * Moldura compartilhada das páginas legais (/privacidade e /termos).
 *
 * Largura de leitura confortável (~720px) e uma hierarquia simples de H1 + H2,
 * já que o conteúdo é texto corrido.
 */

export function LegalPage({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <article className="surface-noise surface-glow bg-surface relative pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="container">
        <div className="mx-auto max-w-[45rem]">
          <Link
            href="/"
            className={cn(
              "text-accent-700 hover:text-accent-800 ease-fluid inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200",
              "focus-visible:outline-accent-500 rounded focus-visible:outline-2 focus-visible:outline-offset-4"
            )}
          >
            <span aria-hidden="true">←</span> Voltar para o site
          </Link>

          <h1 className="text-primary-950 mt-6 font-display text-3xl leading-[1.12] font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>

          <p className="mt-3 text-sm text-neutral-600">Última atualização: {updatedAt}</p>

          <hr className="rule-gradient mt-10 ml-0 w-24" />

          <div className="mt-10 flex flex-col gap-10">{children}</div>
        </div>
      </div>
    </article>
  );
}

/** Bloco de seção com H2. */
export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <ScrollReveal
      as="div"
      distance="0.75rem"
      duration={450}
      className="card-surface flex scroll-mt-24 flex-col gap-3 rounded-xl p-6 sm:p-7"
    >
      <h2 className="text-primary-950 font-display text-xl font-semibold">{title}</h2>
      {children}
    </ScrollReveal>
  );
}

/** Parágrafo padrão das páginas legais. */
export function LegalText({ children }: { children: ReactNode }) {
  return <p className="text-base leading-relaxed text-neutral-700">{children}</p>;
}

/** Lista com marcadores. */
export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5">
      {items.map((item, index) => (
        <li key={index} className="text-base leading-relaxed text-neutral-700">
          {item}
        </li>
      ))}
    </ul>
  );
}
