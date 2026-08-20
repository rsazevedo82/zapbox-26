export const SITE_CONFIG = {
  name: "Zapbox",
  tagline: "Atendimento em equipe pelo WhatsApp",
  url: "https://zapbox.com.br", // placeholder — confirmar domínio
  company: "RC2 Soluções",
  // Dados institucionais — preencher quando disponíveis
  whatsappNumber: "", // placeholder — formato: 5511999999999
  contactEmail: "", // placeholder
  // Social
  socialLinks: {
    instagram: "", // placeholder
    linkedin: "", // placeholder
  },
} as const;

export const PLANS = [
  {
    id: "essencial",
    name: "Essencial",
    price: 149,
    currency: "BRL",
    period: "mês",
    description: "Para pequenas equipes que precisam sair do improviso.",
    highlight: false,
    features: [
      "1 número de WhatsApp",
      "3 usuários incluídos",
      "20.000 mensagens de texto/mês",
      "10.000 mensagens de mídia/mês",
      "Mensagens recebidas ilimitadas",
      "Aplicativo móvel",
      "Retenção de dados: 30 dias",
    ],
  },
  {
    id: "time",
    name: "Time",
    price: 319,
    currency: "BRL",
    period: "mês",
    description: "Para equipes em crescimento que precisam de mais capacidade.",
    highlight: true, // plano destaque na UI
    features: [
      "1 número de WhatsApp",
      "6 usuários incluídos",
      "60.000 mensagens de texto/mês",
      "30.000 mensagens de mídia/mês",
      "Mensagens recebidas ilimitadas",
      "Aplicativo móvel",
      "Retenção de dados: 60 dias",
    ],
  },
  {
    id: "operacao",
    name: "Operação",
    price: 499,
    currency: "BRL",
    period: "mês",
    description: "Para operações maiores, com mais volume e necessidade de controle.",
    highlight: false,
    features: [
      "1 número de WhatsApp",
      "9 usuários incluídos",
      "Usuários adicionais: R$ 30,00/cada",
      "300.000 mensagens de texto/mês",
      "300.000 mensagens de mídia/mês",
      "Mensagens recebidas ilimitadas",
      "Aplicativo móvel",
      "Eventos de webhook",
      "Retenção de dados: 90 dias",
    ],
  },
] as const;

/** Id de plano, derivado de PLANS — evita duplicar a união de strings. */
export type PlanId = (typeof PLANS)[number]["id"];

/** Busca um plano pelo id. */
export function getPlanById(id: PlanId) {
  return PLANS.find((plan) => plan.id === id);
}

// Mensagem para WhatsApp — template com placeholders
export const WHATSAPP_MESSAGE_TEMPLATE =
  "Olá! Vim pelo site da Zapbox e tenho interesse no plano {plan}. Meu nome é {name}.";

/**
 * Monta a URL do WhatsApp com a mensagem pré-preenchida.
 *
 * Fonte única para todos os links de WhatsApp do site. Enquanto
 * `SITE_CONFIG.whatsappNumber` estiver vazio, devolve "#" — o CTA continua
 * visível, mas não gera um link quebrado para wa.me.
 *
 * Os placeholders não preenchidos são removidos junto com o trecho de frase
 * que os acompanha, para a mensagem continuar gramatical.
 */
export function getWhatsAppUrl(params?: { name?: string; plan?: string }): string {
  const number = SITE_CONFIG.whatsappNumber;
  if (!number) return "#";

  let message: string = WHATSAPP_MESSAGE_TEMPLATE;

  message = params?.plan
    ? message.replace("{plan}", params.plan)
    : message.replace(" no plano {plan}", "");

  message = params?.name
    ? message.replace("{name}", params.name)
    : message.replace(" Meu nome é {name}.", "");

  return `https://wa.me/${number}?text=${encodeURIComponent(message.trim())}`;
}
