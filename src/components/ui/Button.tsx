import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Button — primitivo de ação do site.
 *
 * Renderiza `<button>` por padrão. Com `href`, vira `<Link>` do Next (rotas
 * internas e âncoras) ou `<a>` (URLs externas, que ganham target/rel seguros).
 *
 * Raio de borda: `rounded-lg` em todas as variantes e tamanhos — o mesmo já
 * usado no CookieConsent. Não misture outros raios.
 */

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

const BASE_STYLES = cn(
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold",
  // Curva --ease-fluid: dá peso ao movimento em vez do ease-out padrão.
  "transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-fluid",
  "focus-visible:outline-2 focus-visible:outline-offset-2",
  "motion-safe:active:translate-y-px",
  "disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
);

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  // Ação principal de conversão.
  // accent-700 (não accent-600): branco sobre #00995F dá 3,67:1, abaixo do
  // mínimo AA de 4,5:1. Sobre accent-700 o contraste sobe para 5,40:1.
  // Degradê curto + brilho interno no topo dão volume; a sombra é verde e
  // difusa, não cinza-escura, para o botão parecer emitir luz própria.
  primary: cn(
    "bg-accent-700 bg-gradient-to-b from-accent-600 to-accent-700 text-white",
    "shadow-[inset_0_1px_0_0_rgb(255_255_255/0.18)] glow-accent",
    "hover:from-accent-700 hover:to-accent-800 hover:glow-accent-strong",
    "focus-visible:outline-accent-400"
  ),
  // Pensada para superfícies escuras (hero sobre primary-950).
  secondary: cn(
    "glass-panel text-white",
    "hover:border-white/30 hover:bg-white/12",
    "focus-visible:outline-white"
  ),
  // Ação discreta em superfícies claras (header).
  ghost: cn(
    "bg-transparent text-primary-800 hover:bg-primary-50 hover:text-primary-950",
    "focus-visible:outline-accent-500"
  ),
  // Ação secundária em superfícies claras: preenche no hover.
  outline: cn(
    "border border-accent-600/40 bg-accent-50/40 text-accent-700",
    "hover:border-accent-600 hover:bg-accent-600 hover:text-white hover:glow-accent",
    "focus-visible:outline-accent-500"
  ),
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/** Âncoras (#secao) e rotas internas (/precos) usam o Link do Next. */
function isInternalHref(href: string): boolean {
  return href.startsWith("/") || href.startsWith("#");
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(BASE_STYLES, VARIANT_STYLES[variant], SIZE_STYLES[size], className);

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest;

    if (isInternalHref(href)) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { type, ...buttonProps } = rest;

  return (
    <button type={type ?? "button"} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
