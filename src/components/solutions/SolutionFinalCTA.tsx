import type { ReactNode } from "react";

import { LeadFormButton } from "@/components/ui/LeadFormButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * CTA final das páginas de solução. Fecha a página com o mesmo tom escuro do
 * hero, para a leitura terminar onde começou.
 */
export function SolutionFinalCTA({
  title,
  children,
  cta,
}: {
  title: string;
  children?: ReactNode;
  cta: { label: string; sourceCta: string };
}) {
  return (
    <section
      id="contato"
      aria-labelledby="cta-final-titulo"
      className="surface-beam grid-fade bg-primary-950 relative overflow-hidden py-24 lg:py-32"
    >
      <div className="container">
        <ScrollReveal className="mx-auto max-w-[46rem] text-center">
          <h2
            id="cta-final-titulo"
            className="text-shine text-3xl font-bold tracking-tight text-balance sm:text-4xl"
          >
            {title}
          </h2>

          {children && <div className="text-primary-200 mt-6 text-base sm:text-lg">{children}</div>}

          <div className="mt-10 flex justify-center">
            <LeadFormButton sourceCta={cta.sourceCta} variant="primary" size="lg">
              {cta.label}
            </LeadFormButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
