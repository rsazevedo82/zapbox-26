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
 * Página /integracoes.
 *
 * Copy: `geral/Copy das páginas de soluções Zapbox.md`, seção "4. /integracoes".
 * Textos literais; nenhuma ferramenta da arquitetura é citada, conforme a
 * "Diretriz geral de comunicação" do documento.
 */

export const metadata: Metadata = {
  title: "Integrações WhatsApp, CRM e ERP",
  description:
    "Conecte Zapbox, CRM, ERP, e-commerce, formulários e sistemas próprios para reduzir retrabalho e manter informações sincronizadas.",
  alternates: { canonical: "/integracoes" },
};

const CONSEQUENCIAS = [
  "retrabalho;",
  "erros;",
  "informações desatualizadas;",
  "atraso;",
  "falta de contexto;",
  "dados duplicados.",
];

const O_QUE_CONECTAMOS = [
  { title: "CRM", description: "Leads, contatos, oportunidades e atividades." },
  {
    title: "ERP",
    description: "Pedidos, clientes, produtos e processos internos, conforme disponibilidade técnica.",
  },
  { title: "E-commerce", description: "Pedidos, eventos e informações comerciais." },
  { title: "Formulários", description: "Leads que entram por landing pages e campanhas." },
  { title: "Bancos de dados", description: "Informações necessárias à operação." },
  { title: "Sistemas próprios", description: "APIs e sistemas internos podem ser avaliados para integração." },
];

const ANALISE = [
  "se existe API;",
  "se existe documentação;",
  "como funciona autenticação;",
  "quais dados podem ser acessados;",
  "limites técnicos;",
  "eventos disponíveis;",
  "direção da sincronização;",
  "criticidade da operação.",
];

export default function IntegracoesPage() {
  return (
    <>
      <SolutionHero
        eyebrow="Zapbox Integrações"
        headline="Seus sistemas deveriam conversar entre si. Não usar pessoas como ponte."
        cta={{ label: "Quero integrar minha operação", sourceCta: "integracoes-hero" }}
      >
        <p>
          O <strong className="font-semibold text-white">Zapbox Integrações</strong> conecta sua
          operação de atendimento e vendas aos sistemas que sua empresa já utiliza.
        </p>
        <p>
          CRM, ERP, e-commerce, formulários, bancos de dados e sistemas próprios podem trocar
          informações sem depender de copiar e colar manualmente.
        </p>
      </SolutionHero>

      {/* 2 — Problema */}
      <SolutionSection
        id="problema"
        background="white"
        title="Quantas vezes a mesma informação é digitada na sua empresa?"
      >
        <SolutionList
          items={[
            "O cliente informa o telefone no WhatsApp.",
            "O atendente copia para o CRM.",
            "O vendedor copia para uma planilha.",
            "Depois alguém digita no ERP.",
          ]}
        />

        <ScrollReveal className="mx-auto mt-10 max-w-[44rem] text-center">
          <p className="text-base text-neutral-600">
            Quando os sistemas não conversam, sua equipe vira a integração. Isso gera:
          </p>
        </ScrollReveal>

        <div className="mt-6">
          <SolutionList items={CONSEQUENCIAS} />
        </div>
      </SolutionSection>

      {/* 3 — Fluxos de integração */}
      <SolutionSection
        id="fluxos"
        background="muted"
        title="Integração é fazer a informação chegar onde precisa"
        subtitle={<p>Exemplo:</p>}
      >
        <FlowDiagram
          nodes={[
            { label: "Cliente" },
            { label: "WhatsApp" },
            { label: "Zapbox" },
            { label: "CRM" },
            { label: "ERP", tone: "accent" },
          ]}
        />

        <ScrollReveal className="mx-auto mt-14 max-w-[44rem] text-center">
          <p className="text-base text-neutral-600">Ou:</p>
        </ScrollReveal>

        <div className="mt-8">
          <FlowDiagram
            nodes={[
              { label: "Formulário" },
              { label: "CRM" },
              { label: "Zapbox" },
              { label: "Vendedor", tone: "accent" },
            ]}
          />
        </div>

        <ScrollReveal className="mx-auto mt-14 max-w-[44rem] text-center">
          <p className="text-base text-neutral-600">Ou ainda:</p>
        </ScrollReveal>

        <div className="mt-8">
          <FlowDiagram
            nodes={[
              { label: "ERP" },
              { label: "Automação" },
              { label: "Zapbox" },
              { label: "Cliente", tone: "accent" },
            ]}
          />
        </div>

        <ScrollReveal className="mx-auto mt-10 max-w-[44rem] text-center">
          <p className="text-base text-neutral-600">O desenho depende da operação.</p>
        </ScrollReveal>
      </SolutionSection>

      {/* 4 — O que podemos conectar */}
      <SolutionSection id="conectar" background="white" title="O que podemos conectar">
        <SolutionCards items={O_QUE_CONECTAMOS} columns={3} />
      </SolutionSection>

      {/* 5 — Análise antes de integrar */}
      <SolutionSection
        id="analise"
        background="dark"
        title="Não vendemos integração “no escuro”"
        subtitle={<p>Antes de dizer que um sistema pode ser integrado, analisamos:</p>}
      >
        <SolutionList items={ANALISE} dark />

        <ScrollReveal className="mt-10 text-center">
          <p className="text-primary-200 text-base">
            Por isso integrações são avaliadas caso a caso.
          </p>
        </ScrollReveal>
      </SolutionSection>

      {/* 6 — Menos telas, mais contexto */}
      <SolutionSection id="contexto" background="white" title="Menos telas. Mais contexto.">
        <ScrollReveal className="mx-auto flex max-w-[44rem] flex-col gap-4 text-center">
          <p className="text-base text-neutral-600 sm:text-lg">
            Uma boa integração não significa necessariamente colocar tudo em um único sistema.
          </p>
          <p className="text-base text-neutral-600 sm:text-lg">
            Significa fazer com que cada ferramenta tenha a informação que precisa no momento
            certo.
          </p>
          <p className="text-base text-neutral-600 sm:text-lg">
            O vendedor não precisa abrir cinco telas para descobrir o contexto de uma
            oportunidade.
          </p>
          <p className="text-base text-neutral-600 sm:text-lg">
            O atendente não precisa perguntar novamente algo que a empresa já sabe.
          </p>
          <p className="text-base text-neutral-600 sm:text-lg">
            O gestor não precisa montar uma planilha para unir dados de diferentes lugares.
          </p>
        </ScrollReveal>
      </SolutionSection>

      {/* 7 — Zapbox + integração + automação */}
      <SolutionSection
        id="stack"
        background="muted"
        title="Zapbox + integração + automação"
        subtitle={
          <>
            <p>Integração conecta.</p>
            <p>Automação decide o que fazer com o evento.</p>
            <p>Exemplo:</p>
          </>
        }
      >
        <FlowDiagram
          nodes={[
            { label: "ERP informa", lines: ["pedido faturado"] },
            { label: "Automação" },
            { label: "Zapbox" },
            { label: "Cliente recebe atualização", tone: "accent" },
          ]}
        />

        <ScrollReveal className="mx-auto mt-14 max-w-[44rem] text-center">
          <p className="text-base text-neutral-600">Ou:</p>
        </ScrollReveal>

        <div className="mt-8">
          <FlowDiagram
            nodes={[
              { label: "Zapbox", lines: ["novo lead"] },
              { label: "Automação" },
              { label: "CRM" },
              { label: "Oportunidade criada", tone: "accent" },
            ]}
          />
        </div>
      </SolutionSection>

      {/* 8 — Não precisa trocar tudo */}
      <SolutionSection
        id="nao-precisa-trocar-tudo"
        background="white"
        title="Sua empresa não precisa trocar tudo"
        subtitle={
          <>
            <p>
              Um dos maiores benefícios de uma boa arquitetura é aproveitar sistemas que já
              funcionam.
            </p>
            <p>
              O Zapbox pode entrar como nova camada de atendimento e vendas sem exigir que toda a
              empresa substitua sua tecnologia de uma vez.
            </p>
          </>
        }
      >
        <SolutionHighlight>
          Integramos o que faz sentido. Evoluímos o que precisa evoluir.
        </SolutionHighlight>
      </SolutionSection>

      <EvolutionBlock activeStep="integre" />

      <SolutionFinalCTA
        title="Tem um sistema que hoje não conversa com seu atendimento?"
        cta={{ label: "Quero integrar minha operação", sourceCta: "integracoes-cta-final" }}
      >
        <p>Conte pra gente qual é.</p>
      </SolutionFinalCTA>
    </>
  );
}
