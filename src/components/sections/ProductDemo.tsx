import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Seção 5 — PRODUTO EM AÇÃO.
 *
 * Copy: `geral/zapbox-copy-site.md`, "SEÇÃO 5 — PRODUTO EM AÇÃO".
 * Headline, subheadline, corpo e os cinco destaques literais.
 *
 * Screenshot: `public/images/zapbox-painel.webp` (3020x1710) — placeholder
 * temporário da interface base, sem branding próprio ainda.
 *
 * Hotspots numerados (sugeridos pelo documento) NÃO foram implementados:
 * dependeriam de tooltip em hover, que não funciona em toque, e ficariam
 * ilegíveis sobre a imagem reduzida no mobile. Os destaques abaixo da imagem
 * cumprem o mesmo papel em qualquer tela.
 */

const HIGHLIGHTS = [
  "Lista de conversas com status visível",
  "Responsável identificado em cada atendimento",
  "Tags para organizar por tipo de contato",
  "Busca rápida no histórico completo",
  "Mesma experiência no computador e no aplicativo",
];

export function ProductDemo() {
  return (
    <section
      id="produto"
      aria-labelledby="produto-titulo"
      className="bg-primary-950 py-16 lg:py-24"
    >
      <div className="container">
        <div className="mx-auto max-w-[46rem] text-center">
          <h2
            id="produto-titulo"
            className="text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl"
          >
            Veja o Zapbox em ação
          </h2>

          <p className="text-primary-200 mt-6 text-base sm:text-lg">
            Esta é a central de atendimento que sua equipe vai usar todos os dias.
          </p>

          <p className="text-primary-300 mt-4 text-base">
            Ao olhar para a tela, repare em quatro coisas: a lista de conversas organizadas por
            status, o responsável marcado em cada uma, as tags que classificam o tipo de atendimento
            e a busca que encontra qualquer conversa em segundos.
          </p>
        </div>

        <div
          className={cn(
            "mx-auto mt-12 max-w-[62.5rem] overflow-hidden rounded-lg",
            "ring-primary-800 shadow-2xl ring-1"
          )}
        >
          <Image
            src="/images/zapbox-painel.webp"
            alt="Painel de atendimento do Zapbox mostrando conversas, responsáveis e histórico"
            width={3020}
            height={1710}
            sizes="(min-width: 1024px) 1000px, 100vw"
            loading="lazy"
            className="h-auto w-full"
          />
        </div>

        <ul className="mx-auto mt-10 flex max-w-[56rem] flex-wrap justify-center gap-3">
          {HIGHLIGHTS.map((highlight) => (
            <li
              key={highlight}
              className={cn(
                "flex items-center gap-2 rounded-full border border-white/15 bg-white/5",
                "text-primary-100 px-4 py-2 text-sm"
              )}
            >
              <CheckIcon />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-accent-400 shrink-0"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}
