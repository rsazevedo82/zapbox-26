import type { Metadata } from "next";

import { EvolutionBlock } from "@/components/solutions/EvolutionBlock";
import { FlowDiagram } from "@/components/solutions/FlowDiagram";
import { SolutionFinalCTA } from "@/components/solutions/SolutionFinalCTA";
import { SolutionHero } from "@/components/solutions/SolutionHero";
import {
  SolutionCards,
  SolutionHighlight,
  SolutionList,
  SolutionQuote,
  SolutionSection,
} from "@/components/solutions/SolutionSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * Página /crm-vendas.
 *
 * Copy: `geral/Copy das páginas de soluções Zapbox.md`, seção "2. /crm-vendas".
 * Textos literais; nenhuma ferramenta da arquitetura é citada, conforme a
 * "Diretriz geral de comunicação" do documento.
 */

export const metadata: Metadata = {
  title: "CRM para WhatsApp e Gestão de Vendas",
  description:
    "Transforme conversas do WhatsApp em oportunidades comerciais. Organize leads, pipeline, tarefas e vendas com o Zapbox CRM & Vendas.",
  alternates: { canonical: "/crm-vendas" },
};

const FUNCIONALIDADES = [
  { title: "Leads", description: "Organize novos contatos e sua origem." },
  {
    title: "Empresas e contatos",
    description: "Centralize informações importantes da carteira.",
  },
  { title: "Oportunidades", description: "Registre cada possibilidade real de negócio." },
  { title: "Pipeline", description: "Visualize em qual etapa está cada negociação." },
  { title: "Tarefas", description: "Saiba qual é o próximo passo e quem é responsável." },
  {
    title: "Previsão comercial",
    description: "Tenha visibilidade do valor que está em negociação.",
  },
  {
    title: "Ganhos e perdas",
    description: "Entenda o que fechou e por que oportunidades foram perdidas.",
  },
];

const PERGUNTAS_DO_GESTOR = [
  "Quem precisa receber contato?",
  "Quem pediu proposta?",
  "Quem está negociando?",
  "Quem parou de responder?",
  "Quanto existe para fechar este mês?",
];

const METRICAS = [
  "oportunidades abertas;",
  "valor em pipeline;",
  "oportunidades por etapa;",
  "propostas paradas;",
  "negócios ganhos;",
  "negócios perdidos;",
  "responsáveis;",
  "próximos passos;",
  "carteira comercial.",
];

const AUTOMACOES_EXEMPLO = [
  "“Se uma proposta ficar 48 horas sem avanço, avise o vendedor.”",
  "“Quando o lead for qualificado, crie uma oportunidade.”",
  "“Quando uma reunião for marcada, atualize o pipeline.”",
  "“Quando uma venda for ganha, inicie o onboarding.”",
];

export default function CrmVendasPage() {
  return (
    <>
      <SolutionHero
        eyebrow="Zapbox CRM & Vendas"
        headline="Pare de deixar oportunidades escondidas dentro do WhatsApp."
        cta={{ label: "Quero organizar meu comercial", sourceCta: "crm-hero" }}
      >
        <p>
          O <strong className="font-semibold text-white">Zapbox CRM &amp; Vendas</strong> transforma
          conversas em oportunidades comerciais organizadas.
        </p>
        <p>
          Sua equipe acompanha leads, propostas, negociações e próximos passos em um pipeline claro
          — do primeiro contato ao fechamento.
        </p>
      </SolutionHero>

      {/* 2 — Problema */}
      <SolutionSection
        id="problema"
        background="white"
        title="Atendimento organizado é o começo. Venda organizada é o próximo passo."
        subtitle={
          <>
            <p>Com o Zapbox, sua equipe já consegue organizar conversas.</p>
            <p>Mas depois surge outra pergunta:</p>
          </>
        }
      >
        <ScrollReveal className="mx-auto max-w-[44rem]">
          <SolutionQuote>
            <strong className="font-semibold">
              O que aconteceu com cada oportunidade depois do atendimento?
            </strong>
          </SolutionQuote>
        </ScrollReveal>

        <div className="mt-10">
          <SolutionList items={PERGUNTAS_DO_GESTOR} />
        </div>

        <ScrollReveal className="mt-10 text-center">
          <p className="text-base text-neutral-600">É aí que entra o CRM &amp; Vendas.</p>
        </ScrollReveal>
      </SolutionSection>

      {/* 3 — Pipeline */}
      {/*
        Escura e numerada: o pipeline é o que diferencia esta página das outras
        três, e é o único fluxo do site em que a ORDEM é a informação — cada
        etapa só existe depois da anterior. Numerar aqui é semântico, não enfeite.
      */}
      <SolutionSection
        id="pipeline"
        background="dark"
        title="Do WhatsApp para o pipeline"
        subtitle={
          <>
            <p>A conversa continua no atendimento.</p>
            <p>A oportunidade passa a ser acompanhada comercialmente.</p>
          </>
        }
      >
        <FlowDiagram
          surface="dark"
          numbered
          nodes={[
            { label: "Conversa" },
            { label: "Lead" },
            { label: "Qualificado" },
            { label: "Oportunidade", tone: "accent" },
            { label: "Proposta" },
            { label: "Negociação" },
          ]}
          branch={{
            options: [
              { label: "Fechamento", tone: "accent", nodes: [{ label: "Ganho", tone: "accent" }] },
              {
                label: "Encerramento",
                tone: "muted",
                nodes: [{ label: "Perdido", tone: "muted" }],
              },
            ],
          }}
        />
      </SolutionSection>

      {/* 4 — Funcionalidades */}
      <SolutionSection
        id="funcionalidades"
        background="white"
        title="Saiba exatamente onde está cada venda"
      >
        <SolutionCards items={FUNCIONALIDADES} columns={3} />
      </SolutionSection>

      {/* 5 — Chat vs CRM */}
      <SolutionSection
        id="chat-e-crm"
        background="muted"
        title="Chat é conversa. CRM é processo comercial."
        subtitle={
          <>
            <p>São duas coisas diferentes.</p>
            <p>O Zapbox organiza o atendimento.</p>
            <p>
              O CRM organiza o que precisa acontecer{" "}
              <strong className="text-primary-950 font-semibold">
                depois e durante a conversa
              </strong>{" "}
              para que uma oportunidade avance.
            </p>
          </>
        }
      >
        <FlowDiagram
          nodes={[
            { label: "Cliente fala no WhatsApp" },
            { label: "Zapbox" },
            { label: "Vendedor identifica oportunidade" },
            {
              label: "CRM & Vendas",
              tone: "accent",
              lines: [
                "R$ 12.000",
                "Etapa: Proposta",
                "Responsável: Carlos",
                "Próximo passo: sexta-feira",
              ],
            },
          ]}
        />

        <div className="mt-14">
          <SolutionHighlight>
            Agora a venda não depende apenas da memória do vendedor.
          </SolutionHighlight>
        </div>
      </SolutionSection>

      {/* 6 — Visão do gestor */}
      <SolutionSection
        id="gestor"
        background="dark"
        title="Gestor: pare de perguntar “como estão as vendas?”"
        subtitle={
          <>
            <p>Tenha uma visão clara da operação.</p>
            <p>Acompanhe:</p>
          </>
        }
      >
        <SolutionList items={METRICAS} dark />
      </SolutionSection>

      {/* 7 — CRM + Atendimento */}
      <SolutionSection
        id="conectado"
        background="white"
        title="CRM conectado ao atendimento"
        subtitle={
          <>
            <p>Quando atendimento e CRM trabalham juntos, sua equipe reduz retrabalho.</p>
            <p>
              Informações comerciais podem circular entre as duas operações para que o vendedor
              tenha contexto e o gestor tenha visibilidade.
            </p>
          </>
        }
      >
        <SolutionHighlight>Menos planilha. Menos memória. Mais processo.</SolutionHighlight>
      </SolutionSection>

      {/* 8 — Automação */}
      <SolutionSection
        id="automacao"
        background="muted"
        title="E depois você pode automatizar"
        subtitle={
          <>
            <p>Com o CRM estruturado, começam a surgir novas possibilidades.</p>
            <p>Por exemplo:</p>
          </>
        }
      >
        <ul className="mx-auto flex max-w-[44rem] flex-col gap-4">
          {AUTOMACOES_EXEMPLO.map((exemplo, i) => (
            <ScrollReveal key={exemplo} as="li" delay={Math.min(i, 4) * 70}>
              <SolutionQuote>{exemplo}</SolutionQuote>
            </ScrollReveal>
          ))}
        </ul>

        <ScrollReveal className="mt-12 text-center">
          <p className="text-primary-950 text-lg font-semibold">
            CRM é a base. Automação é a evolução.
          </p>
        </ScrollReveal>
      </SolutionSection>

      <EvolutionBlock activeStep="controle" />

      <SolutionFinalCTA
        title="Seu WhatsApp já gera oportunidades. Falta organizar o que acontece com elas."
        cta={{ label: "Quero organizar meu comercial", sourceCta: "crm-cta-final" }}
      />
    </>
  );
}
