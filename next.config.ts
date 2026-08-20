import type { NextConfig } from "next";

/**
 * Headers de segurança.
 *
 * Cobrem clickjacking, MIME sniffing, vazamento de referrer e APIs sensíveis
 * do navegador que o site não usa. São seguros para este site estático — não
 * quebram GTM, Google Fonts nem next/image.
 *
 * Content-Security-Policy NÃO está aqui de propósito: uma CSP correta precisa
 * liberar googletagmanager.com, google-analytics.com e fonts.gstatic.com, e o
 * Next injeta scripts inline que exigiriam nonce. Fazer isso sem validar em
 * produção quebraria o GTM silenciosamente. Fica como tarefa própria.
 */
const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

const nextConfig: NextConfig = {
  // Não anunciar o framework no header de resposta.
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
