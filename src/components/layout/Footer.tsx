import Image from "next/image";
import Link from "next/link";

import { SITE_CONFIG, getWhatsAppUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Footer do site.
 *
 * Tudo que depende de dado ainda não definido em SITE_CONFIG é renderizado
 * condicionalmente — nada de link morto ou ícone social sem destino.
 * Hoje `whatsappNumber`, `contactEmail` e `socialLinks` estão vazios, então
 * as áreas de contato e social simplesmente não aparecem.
 *
 * A assinatura "Zapbox by RC2 Soluções" vem do documento de copy (FOOTER).
 */

const LEGAL_LINKS = [
  { label: "Política de Privacidade", href: "/privacidade" },
  { label: "Termos de Uso", href: "/termos" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: SITE_CONFIG.socialLinks.instagram, Icon: InstagramIcon },
  { label: "LinkedIn", href: SITE_CONFIG.socialLinks.linkedin, Icon: LinkedInIcon },
].filter((link) => link.href !== "");

// `py-1` eleva a área clicável de 17px para 25px, acima do mínimo de 24px
// do WCAG 2.5.8 (AA). O gap das listas cai de 3 para 1 para compensar e o
// espaçamento visual entre os textos fica idêntico ao anterior.
const LINK_STYLES = cn(
  "text-primary-300 ease-fluid inline-block py-1 text-sm transition-colors duration-200 hover:text-accent-300",
  "rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
);

export function Footer() {
  const year = new Date().getFullYear();
  const hasContact = SITE_CONFIG.contactEmail !== "" || SITE_CONFIG.whatsappNumber !== "";

  return (
    <footer className="bg-primary-950 relative">
      {/* Régua de luz separando o CTA final do rodapé. */}
      <div aria-hidden="true" className="rule-gradient absolute inset-x-0 top-0" />
      <div className="container py-12 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
          {/* Marca */}
          <div className="max-w-xs">
            <Link
              href="/"
              className="focus-visible:outline-accent-400 inline-block rounded focus-visible:outline-2 focus-visible:outline-offset-4"
              aria-label="Zapbox — página inicial"
            >
              <Image
                src="/images/zapbox-logo-dark.png"
                alt="Zapbox"
                width={480}
                height={160}
                className="h-9 w-auto"
              />
            </Link>

            <p className="mt-4 text-sm font-semibold text-white">
              Zapbox by{" "}
              <a
                href="https://www.rc2solucoes.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-primary-200"
              >
                {SITE_CONFIG.company}
              </a>
            </p>
            <p className="text-primary-300 mt-2 text-sm">{SITE_CONFIG.tagline}</p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            {/* Institucional */}
            <nav aria-label="Links institucionais">
              <h2 className="text-sm font-semibold tracking-wide text-white uppercase">Legal</h2>
              <ul className="mt-4 flex flex-col gap-1">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={LINK_STYLES}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contato — some por inteiro enquanto não houver dado real */}
            {hasContact && (
              <div>
                <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
                  Contato
                </h2>
                <ul className="mt-4 flex flex-col gap-1">
                  {SITE_CONFIG.contactEmail !== "" && (
                    <li>
                      <a href={`mailto:${SITE_CONFIG.contactEmail}`} className={LINK_STYLES}>
                        {SITE_CONFIG.contactEmail}
                      </a>
                    </li>
                  )}
                  {SITE_CONFIG.whatsappNumber !== "" && (
                    <li>
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={LINK_STYLES}
                      >
                        WhatsApp
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Social — some por inteiro se nenhuma rede estiver definida */}
            {SOCIAL_LINKS.length > 0 && (
              <nav aria-label="Redes sociais">
                <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
                  Redes sociais
                </h2>
                <ul className="mt-4 flex flex-col gap-1">
                  {SOCIAL_LINKS.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(LINK_STYLES, "inline-flex items-center gap-2")}
                      >
                        <link.Icon />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-primary-400 text-sm">
            © {year} {SITE_CONFIG.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */

const SOCIAL_ICON_PROPS = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  className: "shrink-0",
} as const;

function InstagramIcon() {
  return (
    <svg {...SOCIAL_ICON_PROPS}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg {...SOCIAL_ICON_PROPS}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.5 10.5v6" />
      <path d="M7.5 7.5v.01" />
      <path d="M11.5 16.5v-3.5a2.5 2.5 0 0 1 5 0v3.5" />
      <path d="M11.5 10.5v6" />
    </svg>
  );
}
