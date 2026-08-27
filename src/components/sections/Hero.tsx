import { Button } from "@/components/ui/Button";
import { LeadFormButton } from "@/components/ui/LeadFormButton";
import { cn } from "@/lib/utils";

/**
 * Hero da homepage.
 *
 * Copy: `geral/zapbox-copy-site.md`, Seção 1 — HERO (headline recomendada na
 * seção 4 do mesmo documento). Único ajuste em relação ao documento está na
 * microcopy — ver comentário abaixo.
 *
 * Server component: não há interatividade própria aqui.
 */

/**
 * Entrada escalonada — a única sequência coreografada do site.
 * `motion-safe:` garante que nada anima com prefers-reduced-motion; sem ele,
 * `animation-fill-mode: both` deixaria os elementos presos em opacity 0.
 */
const ENTER = "motion-safe:animate-enter";
/** O delay vai em style inline: o JIT do Tailwind não vê classes montadas em runtime. */
const enterDelay = (ms: number) => ({ animationDelay: `${ms}ms` });

const MICRO_BENEFITS = [
  "Vários atendentes no mesmo WhatsApp",
  "Histórico centralizado da conversa",
  "Atendimento pelo computador e pelo celular",
  "Controle sobre quem é responsável por cada cliente",
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-titulo"
      className={cn(
        "surface-beam grid-fade relative overflow-hidden",
        "from-primary-950 via-primary-950 to-primary-900 bg-gradient-to-b",
        "pt-16 lg:pt-20"
      )}
    >
      {/* Linha de luz que fecha a seção e emenda com a próxima. */}
      <div
        aria-hidden="true"
        className="via-accent-500/40 absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent"
      />

      <div className="container flex min-h-[calc(100dvh-4rem)] flex-col justify-center py-16 lg:min-h-[calc(100dvh-5rem)] lg:py-24">
        <div className="mx-auto flex max-w-[50rem] flex-col items-center text-center">
          {/* Eyebrow */}
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
            Plataforma de atendimento e vendas pelo WhatsApp
          </p>

          <h1
            id="hero-titulo"
            className={cn(
              "text-shine font-display mt-7 text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl lg:text-7xl",
              "leading-[1.08]",
              ENTER
            )}
            style={enterDelay(200)}
          >
            Transforme seu WhatsApp em uma{" "}
            <span className="from-accent-300 to-accent-500 bg-gradient-to-b bg-clip-text text-transparent">
              operação organizada
            </span>
          </h1>

          <p
            className={cn(
              "text-primary-200 mt-6 max-w-[42rem] text-base sm:text-lg lg:text-xl",
              ENTER
            )}
            style={enterDelay(350)}
          >
            Um único número, vários atendentes e todo o histórico em um só lugar — para sua equipe
            atender e vender sem perder conversas.
          </p>

          {/* CTAs */}
          <div
            className={cn("mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4", ENTER)}
            style={enterDelay(500)}
          >
            <LeadFormButton
              sourceCta="hero"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Começar agora
            </LeadFormButton>
            <Button
              href="#como-funciona"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Ver como funciona
            </Button>
          </div>

          {/*
            Microcopy do documento: "Sem trocar seu número. Comece a organizar em minutos."
            A segunda frase promete início imediato, o que implicaria autoatendimento —
            o site não tem contratação self-service. Mantida a primeira frase e ajustada
            a segunda para preservar a ideia de baixo atrito sem prometer imediatismo.
          */}
          <p className={cn("text-primary-300 mt-6 text-sm", ENTER)} style={enterDelay(600)}>
            Sem trocar seu número. Comece a organizar sua operação com nosso time.
          </p>

          {/* Microbenefícios */}
          <ul
            className={cn("mt-14 grid w-full gap-3 text-left sm:grid-cols-2", ENTER)}
            style={enterDelay(700)}
          >
            {MICRO_BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className={cn(
                  "glass-panel text-primary-100 flex items-start gap-3 rounded-lg px-4 py-3 text-sm",
                  "ease-fluid transition-colors duration-300 hover:border-white/25 hover:bg-white/10"
                )}
              >
                <CheckIcon />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-accent-400 mt-0.5 shrink-0"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}
