import type { Metadata } from "next";

import { EvolutionBlock } from "@/components/solutions/EvolutionBlock";
import { FlowDiagram } from "@/components/solutions/FlowDiagram";
import { SolutionFinalCTA } from "@/components/solutions/SolutionFinalCTA";
import { SolutionHero } from "@/components/solutions/SolutionHero";
import {
  SolutionCards,
  SolutionHighlight,
  SolutionList,
  SolutionSection,
} from "@/components/solutions/SolutionSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SpecialistButton } from "@/components/ui/SpecialistButton";

/**
 * Página /sales-ai.
 *
 * Copy: `geral/Copy das páginas de soluções Zapbox.md`, seção "1. /sales-ai".
 * Todos os textos são literais. Conforme a "Diretriz geral de comunicação" do
 * mesmo documento, nenhuma ferramenta da arquitetura é citada na interface.
 */

export const metadata: Metadata = {
  title: "Sales AI para WhatsApp",
  description:
    "Atenda, qualifique e organize leads com inteligência artificial no WhatsApp. Conheça a Valéria, a assistente virtual que já atende a própria Zapbox.",
  alternates: { canonical: "/sales-ai" },
};

const O_QUE_FAZ = [
  {
    title: "Responder",
    description:
      "Dúvidas frequentes, produtos, serviços, horários, políticas e informações autorizadas.",
  },
  {
    title: "Entender",
    description: "Identificar intenção, necessidade, perfil e contexto da conversa.",
  },
  {
    title: "Qualificar",
    description: "Coletar as informações que sua equipe precisa antes de assumir o atendimento.",
  },
  {
    title: "Organizar",
    description: "Classificar leads, adicionar contexto e registrar informações comerciais.",
  },
  {
    title: "Executar",
    description: "Acionar automações e sistemas quando a operação permitir.",
  },
  {
    title: "Transferir",
    description:
      "Quando a situação precisa de uma pessoa, o atendimento é entregue para sua equipe com o contexto da conversa.",
  },
];

const CONECTADA = [
  { title: "Zapbox Atendimento", description: "Conversas e handoff humano." },
  { title: "CRM & Vendas", description: "Leads, oportunidades e pipeline." },
  { title: "Automações", description: "Regras, notificações e tarefas." },
  { title: "Agenda", description: "Reuniões e compromissos." },
  { title: "Integrações", description: "ERP, CRM, e-commerce e sistemas próprios." },
];

const DADOS_QUALIFICACAO = [
  "Nome",
  "Empresa",
  "Necessidade",
  "Cidade",
  "Prazo",
  "Perfil",
  "Interesse",
];

export default function SalesAiPage() {
  return (
    <>
      <SolutionHero
        eyebrow="Zapbox Sales AI"
        headline="Inteligência artificial que atende. Qualifica. E sabe quando chamar uma pessoa."
        cta={{ label: "Quero uma IA na minha empresa", sourceCta: "sales-ai-hero" }}
        whatsappCta={{ label: "Conversar com a Valéria", sourceCta: "sales-ai-hero-valeria" }}
      >
        <p>
          A <strong className="font-semibold text-white">Zapbox Sales AI</strong> adiciona uma
          equipe digital à sua operação para responder clientes, entender necessidades, qualificar
          leads, organizar informações e preparar oportunidades para seus vendedores.
        </p>
        <p>E você não precisa imaginar como funciona.</p>
        <p className="font-semibold text-white">
          A Valéria, nossa assistente virtual, já atende hoje o WhatsApp da própria Zapbox e RC2.
        </p>
        <p className="font-semibold text-white">É só chamar e ver ela em ação.</p>
      </SolutionHero>

      {/* 2 — Demonstração real */}
      <SolutionSection
        id="demonstracao"
        background="white"
        title="Não é uma apresentação. É uma demonstração real."
        subtitle={
          <p>
            Quando você chama a Zapbox pelo WhatsApp, quem faz o primeiro atendimento é a{" "}
            <strong className="text-primary-950 font-semibold">Valéria</strong>. Ela foi criada
            para:
          </p>
        }
      >
        <SolutionList
          items={[
            "entender o que a pessoa procura;",
            "responder dúvidas sobre a Zapbox;",
            "explicar planos e soluções;",
            "identificar o tamanho da operação;",
            "recomendar o próximo passo;",
            "qualificar oportunidades;",
            "registrar informações;",
            "encaminhar para uma pessoa quando necessário.",
          ]}
        />

        <div className="mt-12">
          <SolutionHighlight>
            A mesma tecnologia que oferecemos aos nossos clientes já trabalha na nossa própria
            operação.
          </SolutionHighlight>
        </div>
      </SolutionSection>

      {/* 3 — Experiência do cliente */}
      <SolutionSection
        id="experiencia"
        background="dark"
        title="Seu cliente não quer saber se está falando com um workflow"
        subtitle={
          <>
            <p className="text-2xl font-semibold text-white sm:text-3xl">
              Ele quer uma resposta. Rápida. Correta. No contexto certo.
            </p>
            <p>
              O Sales AI combina inteligência artificial, regras comerciais, conhecimento da empresa
              e integrações para criar uma experiência de atendimento natural — sem deixar sua
              operação dependente exclusivamente de pessoas para tarefas repetitivas.
            </p>
          </>
        }
      />

      {/* 4 — O que um Sales AI pode fazer */}
      <SolutionSection id="capacidades" background="white" title="O que um Sales AI pode fazer">
        <SolutionCards items={O_QUE_FAZ} columns={3} />
      </SolutionSection>

      {/* 5 — Fluxograma IA vs Humano */}
      <SolutionSection
        id="ia-e-pessoas"
        background="muted"
        title="IA onde funciona. Pessoas onde importam."
        subtitle={
          <>
            <p>A proposta do Sales AI não é eliminar o atendimento humano.</p>
            <p>É impedir que sua equipe precise gastar tempo com tudo.</p>
          </>
        }
      >
        <FlowDiagram
          nodes={[{ label: "Cliente" }, { label: "Sales AI", tone: "accent" }]}
          branch={{
            question: "Entendeu e pode resolver?",
            options: [
              { label: "Sim", tone: "accent", nodes: [{ label: "Resolve", tone: "accent" }] },
              {
                label: "Não",
                tone: "muted",
                nodes: [{ label: "Humano" }, { label: "Recebe contexto", tone: "muted" }],
              },
            ],
          }}
        />

        <div className="mt-14">
          <ScrollReveal className="mx-auto max-w-[42rem] text-center">
            <p className="text-base text-neutral-600">
              Sua equipe entra principalmente quando existe:
            </p>
          </ScrollReveal>
          <div className="mt-6">
            <SolutionList
              items={[
                "negociação;",
                "exceção;",
                "reclamação;",
                "dúvida complexa;",
                "decisão comercial;",
                "necessidade de relacionamento humano.",
              ]}
            />
          </div>
        </div>
      </SolutionSection>

      {/* 6 — Qualificação automática */}
      <SolutionSection
        id="qualificacao"
        background="white"
        title="Qualificação automática"
        subtitle={<p>Imagine que um lead chegue dizendo:</p>}
      >
        <ScrollReveal className="mx-auto max-w-[44rem]">
          <p className="border-accent-600/60 bg-accent-50/60 text-primary-900 rounded-r-lg border-l-2 py-3 pl-5 text-lg">
            “Quero saber mais.”
          </p>
        </ScrollReveal>

        <ScrollReveal className="mx-auto mt-10 max-w-[44rem] text-center">
          <p className="text-base text-neutral-600">
            Antes de o vendedor assumir, o Sales AI pode descobrir:
          </p>
        </ScrollReveal>

        <ul className="mx-auto mt-6 flex max-w-[44rem] flex-wrap justify-center gap-3">
          {DADOS_QUALIFICACAO.map((dado, i) => (
            <ScrollReveal key={dado} as="li" delay={Math.min(i, 5) * 50}>
              <span className="card-surface text-primary-950 inline-block rounded-full px-4 py-2 text-sm font-semibold">
                {dado}
              </span>
            </ScrollReveal>
          ))}
        </ul>

        <div className="mx-auto mt-14 grid max-w-[44rem] gap-4 sm:grid-cols-2">
          <ScrollReveal direction="left" distance="1rem" className="card-surface rounded-xl p-6">
            <p className="text-xs font-semibold tracking-[0.14em] text-neutral-500 uppercase">
              O vendedor deixa de começar com
            </p>
            <p className="mt-3 text-lg text-neutral-600 italic">“Como posso ajudar?”</p>
          </ScrollReveal>

          <ScrollReveal
            direction="right"
            distance="1rem"
            delay={110}
            className="card-surface outline-accent-600/45 rounded-xl p-6 outline-2"
          >
            <p className="text-accent-700 text-xs font-semibold tracking-[0.14em] uppercase">
              E começa com
            </p>
            <p className="text-primary-950 mt-3 text-lg font-semibold">contexto.</p>
          </ScrollReveal>
        </div>
      </SolutionSection>

      {/* 7 — IA conectada à operação */}
      <SolutionSection
        id="conectada"
        background="dark"
        title="IA conectada à operação"
        subtitle={<p>O Sales AI pode evoluir para trabalhar junto com:</p>}
      >
        <SolutionCards items={CONECTADA} columns={3} dark />
      </SolutionSection>

      {/* 8 — Não é um chatbot genérico */}
      <SolutionSection
        id="personalizado"
        background="white"
        title="Não é um chatbot genérico"
        subtitle={<p>Cada operação possui:</p>}
      >
        <SolutionList
          items={[
            "regras diferentes;",
            "perguntas diferentes;",
            "critérios comerciais diferentes;",
            "sistemas diferentes;",
            "limites diferentes.",
          ]}
        />

        <ScrollReveal className="mx-auto mt-10 max-w-[44rem] text-center">
          <p className="text-base text-neutral-600">
            Por isso, um Sales AI é configurado de acordo com o processo da empresa.
          </p>
        </ScrollReveal>

        <div className="mt-10">
          <SolutionHighlight>
            A inteligência precisa entender seu negócio antes de representar seu negócio.
          </SolutionHighlight>
        </div>
      </SolutionSection>

      {/* 9 — Veja antes de contratar */}
      <SolutionSection
        id="experimente"
        background="muted"
        eyebrow="Veja antes de contratar"
        title="Quer saber como é conversar com um Sales AI?"
        subtitle={
          <>
            <p>Chame a Zapbox no WhatsApp.</p>
            <p>
              Você será atendido pela{" "}
              <strong className="text-primary-950 font-semibold">Valéria</strong>, nossa própria
              assistente comercial.
            </p>
          </>
        }
      >
        <SolutionList
          items={[
            "Pergunte sobre os planos.",
            "Diga quantas pessoas atendem sua empresa.",
            "Pergunte sobre CRM.",
            "Pergunte sobre automações.",
          ]}
        />

        <ScrollReveal className="mt-10 text-center">
          <p className="text-base text-neutral-600">E veja a experiência funcionando de verdade.</p>
          <div className="mt-8 flex justify-center">
            <SpecialistButton sourceCta="sales-ai-experimente-valeria" variant="primary" size="lg">
              Conversar com a Valéria
            </SpecialistButton>
          </div>
        </ScrollReveal>
      </SolutionSection>

      <EvolutionBlock activeStep="escale" />

      <SolutionFinalCTA
        title="Quer criar uma Valéria para sua empresa?"
        cta={{ label: "Quero atendimento com IA", sourceCta: "sales-ai-cta-final" }}
      >
        <p>
          Nós entendemos sua operação, estruturamos o conhecimento, definimos regras, integrações e
          handoff humano.
        </p>
      </SolutionFinalCTA>
    </>
  );
}
