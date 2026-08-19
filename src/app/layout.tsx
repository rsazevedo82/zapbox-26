import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { CookieConsent } from "@/components/layout/CookieConsent";
import { GTMNoScript } from "@/components/layout/GTMNoScript";
import { GTMScript } from "@/components/layout/GTMScript";
import { Header } from "@/components/layout/Header";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zapbox | Atendimento em equipe pelo WhatsApp",
  description:
    "Centralize seu WhatsApp, organize atendentes e mantenha todo o histórico da operação em um só lugar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="bg-surface font-sans text-neutral-900 antialiased">
        <GTMNoScript />
        <GTMScript />

        <a
          href="#conteudo"
          className="focus:bg-accent-600 sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
        >
          Pular para o conteúdo
        </a>

        <Header />

        <main id="conteudo">{children}</main>

        <CookieConsent />
      </body>
    </html>
  );
}
