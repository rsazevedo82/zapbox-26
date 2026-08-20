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

          <p className="mt-3 text-sm text-neutral-500">Última atualização: {updatedAt}</p>

          <ReviewNotice />

          <div className="mt-10 flex flex-col gap-8">{children}</div>
        </div>
      </div>
    </article>
  );
}

/** Aviso no topo: o documento inteiro ainda não passou por revisão jurídica. */
function ReviewNotice() {
  return (
    <div
      role="note"
      className="border-warning-500 bg-warning-50 mt-8 rounded-lg border-l-4 px-4 py-3"
    >
      <p className="text-warning-700 text-sm font-semibold">
        Documento preliminar — pendente de revisão jurídica
      </p>
      <p className="mt-1 text-sm text-neutral-700">
        Este texto é um modelo estruturado e ainda não tem validade como documento definitivo. Os
        trechos destacados precisam ser preenchidos e todo o conteúdo deve ser revisado por um
        advogado antes da publicação.
      </p>
    </div>
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

/**
 * Marcador de pendência — impossível confundir com texto definitivo.
 * Fundo âmbar, monoespaçado e colchetes explícitos.
 */
export function Pending({ children }: { children: ReactNode }) {
  return (
    <mark
      className={cn(
        "bg-warning-50 text-warning-700 ring-warning-500/40 rounded px-1.5 py-0.5 ring-1",
        "font-mono text-sm font-semibold"
      )}
    >
      [{children}]
    </mark>
  );
}
