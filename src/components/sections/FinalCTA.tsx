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
  "glass-panel ease-fluid flex flex-col rounded-2xl p-8 text-center transition-colors duration-300 lg:p-10",
  "hover:border-white/25 hover:bg-white/10"
);

export function FinalCTA() {
  return (
    <section
      id="contato"
      aria-label="Próximos passos"
      className="surface-beam grid-fade bg-primary-950 relative overflow-hidden py-24 lg:py-36"
    >
      <div className="container">
        <div className="mx-auto grid max-w-[56rem] items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Bloco esquerdo — Produto (primeiro também no mobile) */}
          <div className={BLOCK_STYLES}>
            <h2 className="text-shine text-2xl font-bold text-balance sm:text-3xl">
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
            <h2 className="text-shine text-2xl font-bold text-balance sm:text-3xl">
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
