import Link from "next/link";
import type { ReactNode } from "react";

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
    <article className="bg-surface pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="container">
        <div className="mx-auto max-w-[45rem]">
          <Link
            href="/"
            className={cn(
              "text-accent-700 hover:text-accent-800 text-sm font-medium",
              "focus-visible:outline-accent-500 rounded focus-visible:outline-2 focus-visible:outline-offset-4"
            )}
          >
            ← Voltar para o site
          </Link>

          <h1 className="text-primary-950 mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>

          <p className="mt-3 text-sm text-neutral-600">Última atualização: {updatedAt}</p>

          <div className="mt-10 flex flex-col gap-8">{children}</div>
        </div>
      </div>
    </article>
  );
}

/** Bloco de seção com H2. */
export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-primary-950 text-xl font-semibold">{title}</h2>
      {children}
    </section>
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
