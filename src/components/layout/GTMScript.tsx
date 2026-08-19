"use client";

import Script from "next/script";

import { useConsent } from "@/components/layout/useConsent";

/**
 * Carrega o Google Tag Manager APENAS após consentimento explícito.
 *
 * Sem cookie `zapbox_consent=granted` nenhum script de tracking é injetado.
 * Quando o usuário aceita no banner, o evento de consentimento atualiza este
 * componente e o GTM entra sem exigir reload.
 */
export function GTMScript() {
  const consent = useConsent();
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  if (!gtmId || consent !== "granted") return null;

  return (
    <Script id="gtm-script" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
    </Script>
  );
}
