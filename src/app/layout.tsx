import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { CookieConsent } from "@/components/layout/CookieConsent";
import { GTMNoScript } from "@/components/layout/GTMNoScript";
import { Footer } from "@/components/layout/Footer";
import { GTMScript } from "@/components/layout/GTMScript";
import { JsonLd } from "@/components/layout/JsonLd";
import { LeadFormProvider } from "@/components/layout/LeadFormProvider";
import { Header } from "@/components/layout/Header";
import { SITE_CONFIG } from "@/lib/constants";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Fonte de display — só para H1, H2 e frases de destaque; o corpo segue Inter.
 *
 * Space Grotesk é a única das candidatas que atende aos três critérios ao mesmo
 * tempo: está no Google Fonts (logo, `next/font/google`, sem dependência nova),
 * é grotesca — técnica, não editorial nem lúdica — e cobre os acentos do
 * português. Suas particularidades (o "a" de perna reta, o "g" de andar único)
 * dão voz aos títulos sem brigar com a neutralidade da Inter ao lado.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  // `--font-display-face` guarda só a família; o token do Tailwind que gera a
  // utility chama-se `--font-display` e monta a pilha completa em globals.css.
  variable: "--font-display-face",
  display: "swap",
});

/**
 * Title e description da home vêm de `geral/zapbox-copy-site.md`,
 * seção "13. META TITLES E META DESCRIPTIONS".
 */
const SITE_TITLE = "Zapbox | Atendimento em equipe pelo WhatsApp";
const SITE_DESCRIPTION =
  "Centralize seu WhatsApp, organize atendentes e mantenha todo o histórico da operação em um só lugar. Comece simples e evolua com CRM, automações e IA.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_TITLE,
    template: "%s | Zapbox",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "atendimento whatsapp",
    "whatsapp para empresas",
    "múltiplos atendentes whatsapp",
    "central de atendimento whatsapp",
    "whatsapp equipe",
    "zapbox",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.company,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zapbox — Atendimento em equipe pelo WhatsApp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-surface font-sans text-neutral-900 antialiased">
        <GTMNoScript />
        <GTMScript />
        <JsonLd />

        <a
          href="#conteudo"
          className="focus:bg-accent-600 sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
        >
          Pular para o conteúdo
        </a>

        <LeadFormProvider>
          <Header />

          <main id="conteudo">{children}</main>

          <Footer />
        </LeadFormProvider>

        <CookieConsent />
      </body>
    </html>
  );
}
