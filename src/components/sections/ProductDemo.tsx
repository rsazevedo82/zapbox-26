import Image from "next/image";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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
      className="surface-beam grid-fade bg-primary-950 relative overflow-hidden py-20 lg:py-28"
    >
      <div className="container">
        <ScrollReveal className="mx-auto max-w-[46rem] text-center">
          <h2
            id="produto-titulo"
            className="text-shine text-3xl font-bold tracking-tight text-balance sm:text-4xl"
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
        </ScrollReveal>

        {/*
          Palco do produto: halo por trás, moldura dupla (bandeja de vidro +
          núcleo) com raios concêntricos, e um reflexo desbotado abaixo.
        */}
        <ScrollReveal
          delay={120}
          distance="2.5rem"
          duration={780}
          className="relative mx-auto mt-14 max-w-[64rem]"
        >
          <div
            aria-hidden="true"
            className="bg-accent-600/20 absolute inset-x-8 -top-6 h-24 rounded-full blur-3xl"
          />

          <div className="glass-panel relative rounded-2xl p-1.5 shadow-2xl">
            <div className="ring-primary-800/60 overflow-hidden rounded-[0.875rem] ring-1">
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
          </div>

          {/* Reflexo: a mesma imagem espelhada, apagando para baixo. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 top-full hidden h-24 overflow-hidden opacity-25 sm:block"
            style={{
              maskImage: "linear-gradient(to bottom, rgb(0 0 0 / 0.55), transparent 70%)",
            }}
          >
            <Image
              src="/images/zapbox-painel.webp"
              alt=""
              width={3020}
              height={1710}
              sizes="1000px"
              loading="lazy"
              className="w-full -scale-y-100 blur-[1px]"
            />
          </div>
        </ScrollReveal>

        <ul className="mx-auto mt-32 flex max-w-[56rem] flex-wrap justify-center gap-3 sm:mt-36">
          {HIGHLIGHTS.map((highlight) => (
            <li
              key={highlight}
              className={cn(
                "glass-panel text-primary-100 flex items-center gap-2 rounded-full px-4 py-2 text-sm",
                "ease-fluid transition-colors duration-300 hover:border-white/25 hover:bg-white/10"
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
