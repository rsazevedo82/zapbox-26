"use client";

import { useEffect, useState } from "react";

import { CONSENT_EVENT, readConsent, type ConsentValue } from "@/lib/analytics";

/**
 * Estado do consentimento de cookies.
 *
 * `undefined` significa "ainda não sabemos" (antes da hidratação) — importante
 * para não renderizar nada divergente do HTML do servidor. `null` significa que
 * o usuário ainda não decidiu.
 */
export function useConsent(): ConsentValue | null | undefined {
  const [consent, setConsent] = useState<ConsentValue | null | undefined>(undefined);

  useEffect(() => {
    setConsent(readConsent());

    const onChange = (event: Event) => {
      setConsent((event as CustomEvent<ConsentValue>).detail);
    };

    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  return consent;
}
