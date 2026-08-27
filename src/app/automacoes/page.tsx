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

/**
 * Página /automacoes.
 *
 * Copy: `geral/Copy das páginas de soluções Zapbox.md`, seção "3. /automacoes".
 * Textos literais; nenhuma ferramenta da arquitetura é citada, conforme a
 * "Diretriz geral de comunicação" do documento.
 */

export const metadata: Metadata = {
  title: "Automação de Atendimento e Vendas",
  description:
    "Automatize tarefas repetitivas entre WhatsApp, atendimento, CRM e seus sistemas. Menos trabalho manual e mais velocidade para sua operação.",
  alternates: { canonical: "/automacoes" },
};

const EXEMPLOS = [
  {
    title: "Distribuição de leads",
    description: "Um novo lead entra e é enviado automaticamente para o vendedor correto.",
  },
  {
    title: "Alertas",
    description: "Uma oportunidade fica parada e o responsável recebe um aviso.",
  },
  {
    title: "CRM",
    description: "Informações do atendimento criam ou atualizam registros comerciais.",
  },
  {
    title: "Follow-up",
    description: "Determinadas etapas podem gerar ações futuras automaticamente.",
  },
  {
    title: "Formulários",
    description: "Um formulário preenchido pode chegar diretamente à operação comercial.",
  },
  {
    title: "Notificações",
    description: "Gestores e equipes podem ser avisados quando eventos importantes acontecem.",
  },
  {
    title: "Pós-venda",
    description: "Uma venda concluída pode iniciar novos processos.",
  },
];

const TIPOS_DE_TRABALHO = [
  { title: "Automatizar", description: "Quando a regra é previsível." },
  { title: "Assistir", description: "Quando a tecnologia ajuda uma pessoa a decidir." },
  { title: "Alertar", description: "Quando alguém precisa tomar uma ação." },
];

const ANTES_DE_AUTOMATIZAR = [
  "o que acontece hoje;",
  "quem faz;",
  "em qual sistema;",
  "qual evento inicia o processo;",
  "qual é a regra;",
  "qual resultado esperado;",
  "o que fazer em caso de erro.",
];

export default function AutomacoesPage() {
  return (
    <>
      <SolutionHero
        eyebrow="Zapbox Automações"
        headline="Pare de usar pessoas para fazer tarefas que podem acontecer sozinhas."
        cta={{ label: "Quero automatizar minha operação", sourceCta: "automacoes-hero" }}
      >
        <p>
          O <strong className="font-semibold text-white">Zapbox Automações</strong> conecta
          atendimento, vendas e sistemas para eliminar tarefas repetitivas da operação.
        </p>
        <p>
          Se existe uma regra clara para fazer alguma coisa todos os dias, existe uma boa chance
          de ela poder ser automatizada.
        </p>
      </SolutionHero>

      {/* 2 — Problema */}
      <SolutionSection
        id="problema"
        background="white"
        title="O problema não é a tarefa. É repetir a tarefa milhares de vezes."
      >
        <SolutionList
          items={[
            "Uma pessoa recebe um lead.",
            "Copia para uma planilha.",
            "Avisa o vendedor.",
            "Cria uma tarefa.",
            "Muda uma etapa.",
            "Manda uma mensagem.",
            "Agenda um follow-up.",
            "E repete tudo amanhã.",
          ]}
        />

        <div className="mt-12">
          <SolutionHighlight>
            Isso não é trabalho estratégico. É processo manual.
          </SolutionHighlight>
        </div>
      </SolutionSection>

      {/* 3 — Evento → Regra → Ação */}
      <SolutionSection
        id="como-funciona"
        background="muted"
        title="A automação trabalha entre os sistemas"
      >
        <FlowDiagram
          nodes={[{ label: "Evento" }, { label: "Regra" }, { label: "Ação", tone: "accent" }]}
        />

        <ScrollReveal className="mx-auto mt-14 max-w-[44rem] text-center">
          <p className="text-base text-neutral-600">Exemplo:</p>
        </ScrollReveal>

        <div className="mt-8">
          <FlowDiagram
            nodes={[
              { label: "Novo lead" },
              { label: "Identifica origem" },
              { label: "Cria registro" },
              { label: "Define responsável" },
              { label: "Avisa vendedor" },
              { label: "Agenda próxima ação", tone: "accent" },
            ]}
          />
        </div>

        <ScrollReveal className="mx-auto mt-10 max-w-[44rem] text-center">
          <p className="text-base text-neutral-600">
            Sem alguém precisar executar cada etapa.
          </p>
        </ScrollReveal>
      </SolutionSection>

      {/* 4 — Exemplos de automações */}
      <SolutionSection id="exemplos" background="white" title="Exemplos de automações">
        <SolutionCards items={EXEMPLOS} columns={3} />
      </SolutionSection>

      {/* 5 — Exemplo comercial */}
      <SolutionSection id="exemplo-comercial" background="dark" title="Um exemplo comercial">
        <FlowDiagram
          surface="dark"
          nodes={[{ label: "Lead entrou" }, { label: "CRM criado" }, { label: "Vendedor definido" }]}
          branch={{
            question: "Sem contato em 15 min?",
            options: [
              {
                label: "Sim",
                tone: "accent",
                nodes: [{ label: "Alerta", tone: "accent" }],
              },
            ],
          }}
        />

        <ScrollReveal className="mx-auto mt-14 max-w-[44rem]">
          <FlowDiagram
            surface="dark"
            nodes={[{ label: "Proposta enviada" }]}
            branch={{
              question: "Sem avanço em 48h?",
              options: [
                {
                  label: "Sim",
                  tone: "accent",
                  nodes: [{ label: "Follow-up", tone: "accent" }],
                },
              ],
            }}
          />
        </ScrollReveal>

        <div className="mt-14">
          <SolutionHighlight dark>
            A tecnologia acompanha o processo. A equipe cuida do relacionamento.
          </SolutionHighlight>
        </div>
      </SolutionSection>

      {/* 6 — Automatizar ≠ robotizar */}
      <SolutionSection
        id="tipos"
        background="white"
        title="Automação não significa robotizar tudo"
        subtitle={
          <>
            <p>Nem todo processo deveria ser automático.</p>
            <p>Algumas decisões precisam de pessoas.</p>
            <p>Por isso, desenhamos automações para três tipos de trabalho:</p>
          </>
        }
      >
        <SolutionCards items={TIPOS_DE_TRABALHO} columns={3} />
      </SolutionSection>

      {/* 7 — Processo primeiro */}
      <SolutionSection
        id="processo"
        background="muted"
        title="Começamos pelo processo, não pela ferramenta"
        subtitle={<p>Antes de automatizar, entendemos:</p>}
      >
        <SolutionList items={ANTES_DE_AUTOMATIZAR} />

        <ScrollReveal className="mx-auto mt-10 max-w-[44rem] text-center">
          <p className="text-base text-neutral-600">Só depois desenhamos a automação.</p>
        </ScrollReveal>

        <div className="mt-10">
          <SolutionHighlight>
            Automatizar um processo ruim apenas faz o problema acontecer mais rápido.
          </SolutionHighlight>
        </div>
      </SolutionSection>

      {/* 8 — Stack integrada */}
      {/*
        Escura e com pulso: é a única página cujo assunto é o dado se movendo
        sozinho entre sistemas. O pulso percorre os blocos em sequência e diz
        isso sem uma palavra a mais. Some com prefers-reduced-motion.
      */}
      <SolutionSection
        id="stack"
        background="dark"
        title="Zapbox + CRM + automação"
        subtitle={<p>É onde a operação começa a ganhar escala.</p>}
      >
        <FlowDiagram
          surface="dark"
          animated
          nodes={[
            { label: "WhatsApp" },
            { label: "Zapbox" },
            { label: "CRM" },
            { label: "Automações", tone: "accent" },
            { label: "Equipe" },
          ]}
        />

        <ScrollReveal className="mx-auto mt-14 max-w-[44rem] text-center">
          <p className="text-primary-200 text-lg">
            Conversas viram dados. Dados viram ações. Ações deixam de depender de memória.
          </p>
        </ScrollReveal>
      </SolutionSection>

      <EvolutionBlock activeStep="automatize" />

      <SolutionFinalCTA
        title="Qual tarefa sua equipe repete todos os dias?"
        cta={{ label: "Mapear minhas automações", sourceCta: "automacoes-cta-final" }}
      >
        <p>Provavelmente esse é um bom lugar para começar.</p>
      </SolutionFinalCTA>
    </>
  );
}
