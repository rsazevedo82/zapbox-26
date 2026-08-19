"use client";

import { useConsent } from "@/components/layout/useConsent";

/** Fallback `<noscript>` do GTM — também condicionado ao consentimento. */
export function GTMNoScript() {
  const consent = useConsent();
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  if (!gtmId || consent !== "granted") return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
