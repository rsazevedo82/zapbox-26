import { SITE_CONFIG } from "@/lib/constants";

/**
 * Schema.org (JSON-LD) do site.
 *
 * Contém apenas dados verificáveis: identidade, descrição e a relação com a
 * RC2 Soluções. Deliberadamente FORA daqui, por não existirem ainda:
 *   - aggregateRating / review (não temos avaliações reais)
 *   - Offer com preço (não há URL de contratação — o site não tem checkout)
 *   - telephone / address (não definidos em SITE_CONFIG)
 *
 * `sameAs` só aparece quando houver redes sociais preenchidas.
 */
export function JsonLd() {
  const socialProfiles = [
    SITE_CONFIG.socialLinks.instagram,
    SITE_CONFIG.socialLinks.linkedin,
  ].filter((url) => url !== "");

  const organization = {
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}/#organizacao`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: "Plataforma de atendimento e vendas pelo WhatsApp",
    logo: `${SITE_CONFIG.url}/images/zapbox-logo-light.png`,
    parentOrganization: {
      "@type": "Organization",
      name: SITE_CONFIG.company,
    },
    ...(socialProfiles.length > 0 ? { sameAs: socialProfiles } : {}),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#site`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    inLanguage: "pt-BR",
    publisher: { "@id": `${SITE_CONFIG.url}/#organizacao` },
  };

  const application = {
    "@type": "SoftwareApplication",
    "@id": `${SITE_CONFIG.url}/#software`,
    name: SITE_CONFIG.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Android, iOS",
    description:
      "Centralize seu WhatsApp, organize atendentes e mantenha todo o histórico da operação em um só lugar.",
    inLanguage: "pt-BR",
    publisher: { "@id": `${SITE_CONFIG.url}/#organizacao` },
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [organization, website, application],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
