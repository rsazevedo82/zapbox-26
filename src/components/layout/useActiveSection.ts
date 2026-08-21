"use client";

import { useEffect, useState } from "react";

/**
 * Devolve o id da seção que está sendo lida no momento.
 *
 * Observa as seções com `rootMargin` recortando a viewport numa faixa central:
 * a seção só conta como ativa quando ocupa o miolo da tela, não quando apenas
 * encosta na borda. Entre várias candidatas, vence a de maior área visível.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const alvos = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (alvos.length === 0) return;

    const visiveis = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visiveis.set(entry.target.id, entry.intersectionRatio);
          else visiveis.delete(entry.target.id);
        }

        let melhor: string | null = null;
        let maior = 0;
        for (const [id, ratio] of visiveis) {
          if (ratio > maior) {
            maior = ratio;
            melhor = id;
          }
        }
        setActive(melhor);
      },
      // Faixa central da tela: ignora os 45% de cima e os 45% de baixo.
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.01, 0.5, 1] }
    );

    alvos.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
