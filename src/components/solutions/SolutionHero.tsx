import type { ReactNode } from "react";

import { LeadFormButton } from "@/components/ui/LeadFormButton";
import { SpecialistButton } from "@/components/ui/SpecialistButton";
import { cn } from "@/lib/utils";

/**
 * Hero das páginas de solução.
 *
 * Mesma linguagem do hero da home — feixe-assinatura, eyebrow em vidro e
 * entrada escalonada —, porém mais compacto: página interna não precisa
 * ocupar a viewport inteira.
 */

const ENTER = "motion-safe:animate-enter";
const enterDelay = (ms: number) => ({ animationDelay: `${ms}ms` });

type SolutionHeroProps = {
  eyebrow: string;
  headline: ReactNode;
  children: ReactNode;
  /** CTA principal: abre o formulário de lead. */
  cta: { label: string; sourceCta: string };
  /** CTA secundário opcional: leva direto ao WhatsApp. */
  whatsappCta?: { label: string; sourceCta: string };
};

export function SolutionHero({ eyebrow, headline, children, cta, whatsappCta }: SolutionHeroProps) {
  return (
    <section
      aria-labelledby="pagina-titulo"
      className={cn(
        "surface-beam grid-fade relative overflow-hidden",
        "from-primary-950 via-primary-950 to-primary-900 bg-gradient-to-b",
        "pt-28 pb-20 lg:pt-36 lg:pb-28"
      )}
    >
      <div
        aria-hidden="true"
        className="via-accent-500/40 absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent"
      />

      <div className="container">
        <div className="mx-auto flex max-w-[52rem] flex-col items-center text-center">
          <p
            className={cn(
              "glass-panel inline-flex items-start gap-2 rounded-full",
              "text-primary-100 px-4 py-1.5 text-xs font-medium tracking-[0.14em] uppercase",
              ENTER
            )}
            style={enterDelay(100)}
          >
            <span
              aria-hidden="true"
              className="bg-accent-400 mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full"
            />
            {eyebrow}
          </p>

          <h1
            id="pagina-titulo"
            className={cn(
              "text-shine font-display mt-7 text-3xl leading-[1.08] font-bold tracking-tight text-balance",
              "sm:text-4xl lg:text-5xl",
              ENTER
            )}
            style={enterDelay(200)}
          >
            {headline}
          </h1>

          <div
            className={cn(
              "text-primary-200 mt-6 flex max-w-[44rem] flex-col gap-4 text-base sm:text-lg",
              ENTER
            )}
            style={enterDelay(350)}
          >
            {children}
          </div>

          <div
            className={cn("mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4", ENTER)}
            style={enterDelay(500)}
          >
            {whatsappCta && (
              <SpecialistButton
                sourceCta={whatsappCta.sourceCta}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {whatsappCta.label}
              </SpecialistButton>
            )}

            <LeadFormButton
              sourceCta={cta.sourceCta}
              variant={whatsappCta ? "secondary" : "primary"}
              size="lg"
              className="w-full sm:w-auto"
            >
              {cta.label}
            </LeadFormButton>
          </div>
        </div>
      </div>
    </section>
  );
}
