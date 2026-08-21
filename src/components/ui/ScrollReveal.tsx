"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Revela o conteúdo quando ele entra na viewport.
 *
 * Duas decisões de segurança:
 *
 * 1. O estado padrão do CSS é VISÍVEL. Só o JavaScript aplica
 *    `data-reveal="hidden"`. Sem JS — ou se o IntersectionObserver falhar —
 *    nada fica preso invisível.
 *
 * 2. Só esconde o que está abaixo da dobra no momento da montagem. Conteúdo
 *    já visível não pisca nem espera animação para ser lido.
 *
 * Com `prefers-reduced-motion: reduce` o componente nem chega a esconder, e o
 * CSS global neutraliza qualquer transição remanescente.
 */

type Direction = "up" | "down" | "left" | "right" | "none";

const FROM: Record<Direction, string> = {
  up: "translateY(1.5rem)",
  down: "translateY(-1.5rem)",
  left: "translateX(-1.5rem)",
  right: "translateX(1.5rem)",
  none: "none",
};

type ScrollRevealProps = {
  children: React.ReactNode;
  /** Elemento renderizado — use "li" dentro de listas para não quebrar a semântica. */
  as?: "div" | "li";
  className?: string;
  /** Atraso em ms — use para escalonar irmãos de uma mesma lista. */
  delay?: number;
  direction?: Direction;
  distance?: string;
  duration?: number;
  once?: boolean;
  threshold?: number;
};

// useLayoutEffect avisa no SSR; no cliente ele evita o frame em que o
// elemento apareceria antes de ser escondido.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function ScrollReveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  direction = "up",
  distance,
  duration = 600,
  once = true,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (semMovimento || typeof IntersectionObserver === "undefined") return;

    // Já visível na carga: mostra direto, sem animar nem piscar.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      setState("shown");
      return;
    }

    setState("hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState("shown");
            if (once) observer.disconnect();
          } else if (!once) {
            setState("hidden");
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const style = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-duration": `${duration}ms`,
    "--reveal-from": distance ? FROM[direction].replace("1.5rem", distance) : FROM[direction],
  } as CSSProperties;

  return (
    <Tag
      // Tag alterna entre div e li; o ref genérico precisa do cast.
      ref={ref as React.Ref<HTMLDivElement & HTMLLIElement>}
      className={className}
      style={style}
      data-reveal={state === "idle" ? undefined : state}
    >
      {children}
    </Tag>
  );
}
