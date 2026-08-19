/**
 * Divisor estratégico — "QUEBRA DE NARRATIVA (DIVISOR ENTRE OS DOIS FUNIS)".
 *
 * Copy: `geral/zapbox-copy-site.md`, seção "QUEBRA DE NARRATIVA".
 * Eyebrow, headline e subheadline literais. O documento não define CTA aqui —
 * nenhum foi adicionado, é uma transição, não um bloco de conversão.
 */

export function NarrativeDivider() {
  return (
    <section id="alem" aria-labelledby="alem-titulo" className="bg-primary-950 py-20 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-[46rem] text-center">
          <p className="text-accent-400 text-sm font-semibold tracking-widest uppercase">
            Zapbox pode ir além
          </p>

          <h2
            id="alem-titulo"
            className="mt-4 text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl"
          >
            Precisa de mais do que organizar seu WhatsApp?
          </h2>

          <p className="text-primary-200 mt-6 text-base sm:text-lg">
            O Zapbox pode evoluir junto com sua operação, adicionando gestão comercial, automações e
            inteligência artificial conforme sua empresa cresce. Você não precisa contratar tudo
            agora.
          </p>
        </div>
      </div>
    </section>
  );
}
