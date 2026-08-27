import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * Divisor estratégico — "QUEBRA DE NARRATIVA (DIVISOR ENTRE OS DOIS FUNIS)".
 *
 * Copy: `geral/zapbox-copy-site.md`, seção "QUEBRA DE NARRATIVA".
 * Eyebrow, headline e subheadline literais. O documento não define CTA aqui —
 * nenhum foi adicionado, é uma transição, não um bloco de conversão.
 */

export function NarrativeDivider() {
  return (
    <section
      id="alem"
      aria-labelledby="alem-titulo"
      className="surface-beam grid-fade bg-primary-950 relative overflow-hidden py-24 lg:py-40"
    >
      <div className="container">
        <ScrollReveal direction="none" duration={800} className="mx-auto max-w-[46rem] text-center">
          <p className="glass-panel text-accent-300 inline-flex items-start gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.14em] uppercase">
            <span
              aria-hidden="true"
              className="bg-accent-400 mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full"
            />
            Zapbox pode ir além
          </p>

          <h2
            id="alem-titulo"
            className="text-shine font-display mt-6 text-3xl leading-[1.08] font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Precisa de mais do que organizar seu WhatsApp?
          </h2>

          <p className="text-primary-200 mt-6 text-base sm:text-lg">
            O Zapbox pode evoluir junto com sua operação, adicionando gestão comercial, automações e
            inteligência artificial conforme sua empresa cresce. Você não precisa contratar tudo
            agora.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
