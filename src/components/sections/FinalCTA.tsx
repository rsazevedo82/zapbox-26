import { Button } from "@/components/ui/Button";
import { SpecialistButton } from "@/components/ui/SpecialistButton";
import { cn } from "@/lib/utils";

/**
 * Seção 15 — CTA FINAL.
 *
 * Copy: `geral/zapbox-copy-site.md`, "SEÇÃO 15 — CTA FINAL".
 * Estrutura de dois blocos ("produto" e "soluções") conforme documentado.
 *
 * O documento NÃO define headline para a seção como um todo (marcada "—"),
 * apenas os títulos dos dois blocos. Para não inventar copy, cada bloco leva
 * seu título como H2 e a seção recebe um aria-label descritivo.
 */

const BLOCK_STYLES = cn(
  "flex flex-col rounded-lg border border-white/15 bg-white/5 p-8 lg:p-10",
  "text-center"
);

export function FinalCTA() {
  return (
    <section id="contato" aria-label="Próximos passos" className="bg-primary-950 py-20 lg:py-32">
      <div className="container">
        <div className="mx-auto grid max-w-[56rem] items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Bloco esquerdo — Produto (primeiro também no mobile) */}
          <div className={BLOCK_STYLES}>
            <h2 className="text-2xl font-bold text-balance text-white sm:text-3xl">
              Quer organizar seu WhatsApp agora?
            </h2>

            <div className="grow" />

            <div className="mt-8">
              <Button href="#planos" variant="primary" size="lg" className="w-full sm:w-auto">
                Escolher meu plano
              </Button>
            </div>
          </div>

          {/* Bloco direito — Soluções */}
          <div className={BLOCK_STYLES}>
            <h2 className="text-2xl font-bold text-balance text-white sm:text-3xl">
              Quer automatizar sua operação?
            </h2>

            <p className="text-primary-200 mt-4 text-base">
              CRM, automações, IA e integrações são desenhados de acordo com a sua necessidade.
            </p>

            <div className="grow" />

            <div className="mt-8">
              <SpecialistButton
                sourceCta="final-cta-specialist"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Falar com especialista
              </SpecialistButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
