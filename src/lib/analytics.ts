// Eventos que o site dispara para o GTM via dataLayer.
export type AnalyticsEvent =
  | { event: "cta_click"; cta_id: string; section: string }
  | { event: "form_open" }
  | { event: "form_start" }
  | { event: "form_submit" }
  | { event: "form_success"; plan?: string }
  | { event: "form_error"; error: string }
  | { event: "whatsapp_redirect"; plan?: string };

/**
 * Empurra um evento para o dataLayer do GTM.
 *
 * Sem consentimento o GTM não é carregado, então o `dataLayer` pode não existir —
 * neste caso o evento é simplesmente descartado, sem erro.
 */
export function trackEvent(eventData: AnalyticsEvent): void {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push(eventData);
  }
}

/* -------------------------------------------------------------------------- */
/* Consentimento                                                              */
/* -------------------------------------------------------------------------- */

export const CONSENT_COOKIE = "zapbox_consent";
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // 365 dias
/** Evento interno (window) emitido quando o usuário decide sobre cookies. */
export const CONSENT_EVENT = "zapbox:consent-change";

export type ConsentValue = "granted" | "denied";

/** Lê o cookie de consentimento. Retorna null se o usuário ainda não decidiu. */
export function readConsent(): ConsentValue | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.split("; ").find((row) => row.startsWith(`${CONSENT_COOKIE}=`));

  const value = match?.split("=")[1];
  return value === "granted" || value === "denied" ? value : null;
}

/** Grava o consentimento e notifica os listeners na mesma página. */
export function writeConsent(value: ConsentValue): void {
  if (typeof document === "undefined") return;

  document.cookie = `${CONSENT_COOKIE}=${value}; max-age=${CONSENT_MAX_AGE}; path=/; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}
