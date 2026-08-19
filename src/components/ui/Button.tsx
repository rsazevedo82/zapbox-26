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
  "transition-colors duration-150 ease-out",
  "focus-visible:outline-2 focus-visible:outline-offset-2",
  "disabled:cursor-not-allowed disabled:opacity-60"
);

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  // Ação principal de conversão.
  primary: cn("bg-accent-600 text-white hover:bg-accent-700", "focus-visible:outline-accent-400"),
  // Pensada para superfícies escuras (hero sobre primary-950).
  secondary: cn(
    "border border-white/30 bg-transparent text-white hover:bg-white/10",
    "focus-visible:outline-white"
  ),
  // Ação discreta em superfícies claras (header).
  ghost: cn(
    "bg-transparent text-primary-800 hover:bg-primary-50 hover:text-primary-950",
    "focus-visible:outline-accent-500"
  ),
  // Ação secundária em superfícies claras: preenche no hover.
  outline: cn(
    "border border-accent-600 bg-transparent text-accent-700",
    "hover:bg-accent-600 hover:text-white",
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
