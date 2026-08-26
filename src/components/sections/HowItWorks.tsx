import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * Seção 7 — COMO FUNCIONA.
 *
 * Copy: `geral/zapbox-copy-site.md`, "SEÇÃO 7 — COMO FUNCIONA".
 * O documento traz QUATRO passos (não três) e sugere "linha do tempo horizontal
 * com 4 pontos numerados (mobile: vertical)" — foi o layout adotado.
 *
 * Ajuste de self-service no passo 2: ver comentário no array.
 */

const STEPS = [
  {
    title: "Escolha seu plano",
    description: "Selecione o plano de acordo com o tamanho e o volume da sua equipe.",
  },
  {
    title: "Conecte seu WhatsApp",
    // Documento: "Faça a configuração inicial sem trocar de número."
    // A forma imperativa sugere que o próprio cliente configura sozinho, o que
    // implicaria onboarding self-service. A implantação é feita com nosso time.
    description: "Nosso time faz a configuração inicial, sem trocar de número.",
  },
  {
    title: "Convide sua equipe",
    description: "Crie os usuários e defina quem é responsável por cada frente.",
  },
  {
    title: "Comece a atender",
    description: "As conversas passam a ser centralizadas — e organizadas — no Zapbox.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-titulo"
      className="surface-noise bg-surface-muted relative py-20 lg:py-28"
    >
      <div className="container">
        <ScrollReveal className="mx-auto max-w-[46rem] text-center">
          <h2
            id="como-funciona-titulo"
            className="text-primary-950 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
          >
            Começar é simples
          </h2>
        </ScrollReveal>

        <ol className="relative mt-12 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {/*
            Linha conectora da timeline: apenas no desktop, atrás dos números.
            Recuada em 1/8 de cada lado para começar e terminar nos badges das pontas.
          */}
          {/* Conector com degradê: mais forte no início, some nas pontas. */}
          <span
            aria-hidden="true"
            className="via-accent-500/45 absolute top-6 right-[12.5%] left-[12.5%] hidden h-px bg-gradient-to-r from-transparent to-transparent lg:block"
          />

          {STEPS.map((step, index) => (
            <ScrollReveal
              key={step.title}
              as="li"
              delay={index * 90}
              className={cn(
                // Empilhado vira linha do tempo vertical: marcador à esquerda,
                // texto à direita. A partir de sm volta a ser coluna.
                "relative flex items-start gap-4",
                "sm:flex-col sm:gap-0 lg:items-center lg:text-center"
              )}
            >
              {/* Conector vertical — só na linha do tempo empilhada. */}
              {index < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "from-accent-500/45 absolute top-14 -bottom-6 left-6 w-px -translate-x-1/2",
                    "bg-gradient-to-b to-neutral-300/70 sm:hidden"
                  )}
                />
              )}

              <span
                className={cn(
                  "from-accent-600 to-accent-700 flex h-12 w-12 shrink-0 items-center justify-center bg-gradient-to-b",
                  "rounded-full text-lg font-bold text-white shadow-[inset_0_1px_0_0_rgb(255_255_255/0.25)]",
                  "glow-accent ring-surface-muted ring-8"
                )}
              >
                {index + 1}
              </span>

              <div className="min-w-0 flex-1 pt-1 sm:mt-5 sm:flex-none sm:pt-0">
                <h3 className="text-primary-950 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 max-w-[22rem] text-base text-neutral-600">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <Button href="#planos" variant="outline" size="md">
            Escolher meu plano
          </Button>
        </div>
      </div>
    </section>
  );
}
