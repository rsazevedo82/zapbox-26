"use client";

import Link from "next/link";

import { useConsent } from "@/components/layout/useConsent";
import { writeConsent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Banner de consentimento de cookies (LGPD).
 *
 * Só aparece enquanto o usuário não tiver decidido. A escolha é gravada no
 * cookie `zapbox_consent` (365 dias) e propagada por evento, para que o
 * `GTMScript` reaja na hora — sem reload.
 */
export function CookieConsent() {
  const consent = useConsent();

  // `undefined` = ainda hidratando; qualquer valor = usuário já decidiu.
  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Aviso de cookies"
      className={cn(
        "fixed inset-x-0 bottom-0 z-50",
        "border-primary-800 bg-primary-950/95 border-t backdrop-blur",
        "motion-safe:animate-consent-in"
      )}
    >
      <div
        className={cn(
          "container flex flex-col gap-4 py-4",
          "sm:flex-row sm:items-center sm:justify-between sm:gap-6"
        )}
      >
        <p className="text-primary-100 text-sm leading-relaxed">
          Usamos cookies de análise para melhorar sua experiência. Ao aceitar, você permite o uso do
          Google Analytics.{" "}
          <Link
            href="/privacidade"
            className={cn(
              "font-medium text-white underline underline-offset-4",
              "hover:text-accent-300 focus-visible:outline-2 focus-visible:outline-offset-2",
              "focus-visible:outline-accent-400"
            )}
          >
            Política de Privacidade
          </Link>
        </p>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => writeConsent("denied")}
            className={cn(
              "border-primary-600 text-primary-100 rounded-lg border px-4 py-2 text-sm font-medium",
              "hover:border-primary-400 transition-colors hover:text-white",
              "focus-visible:outline-accent-400 focus-visible:outline-2 focus-visible:outline-offset-2"
            )}
          >
            Recusar
          </button>

          <button
            type="button"
            onClick={() => writeConsent("granted")}
            className={cn(
              "bg-accent-600 rounded-lg px-5 py-2 text-sm font-semibold text-white",
              "hover:bg-accent-700 transition-colors",
              "focus-visible:outline-accent-400 focus-visible:outline-2 focus-visible:outline-offset-2"
            )}
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
