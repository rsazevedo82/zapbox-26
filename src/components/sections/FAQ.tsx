"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * Seção 14 — FAQ.
 *
 * Copy: `geral/zapbox-copy-site.md`, "SEÇÃO 14 — FAQ".
 *
 * O documento traz 10 perguntas. A décima ("Posso cancelar quando quiser?")
 * tem como resposta o marcador [VALIDAR POLÍTICA COMERCIAL] e foi OMITIDA —
 * restam 9. Ajuste de self-service na pergunta sobre implantação, ver comentário.
 *
 * Client component: o acordeão precisa de estado.
 */

type FaqItem = { question: string; answer: string };

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Preciso trocar meu número de WhatsApp?",
    answer:
      "Não. A Zapbox organiza o atendimento a partir do número que sua empresa já usa. Seus clientes continuam encontrando você da mesma forma.",
  },
  {
    question: "Várias pessoas podem usar o mesmo WhatsApp?",
    answer:
      "Sim. Cada atendente tem seu próprio usuário dentro do mesmo número, dentro dos limites do plano contratado.",
  },
  {
    question: "Funciona no celular?",
    answer:
      "Sim. A operação acompanha sua equipe no computador e no aplicativo, com a mesma experiência de atendimento.",
  },
  {
    question: "Vocês ajudam na implantação?",
    // Documento: "Os planos de software têm onboarding padronizado, para você
    // configurar e começar sozinho." A expressão "começar sozinho" descreve
    // onboarding self-service, que não existe — a contratação e a implantação
    // passam pelo time comercial. Restante da resposta preservado.
    answer:
      "Sim. Os planos de software têm onboarding padronizado, conduzido pelo nosso time. Para operações que precisam de um acompanhamento mais próximo, existe o atendimento gerenciado — fale com um especialista para entender qual formato se encaixa melhor.",
  },
  {
    question: "O Zapbox possui CRM?",
    answer:
      "O CRM não faz parte dos planos de software. Ele está disponível como solução avançada — CRM & Vendas — para empresas que já organizaram o atendimento e querem estruturar o processo comercial.",
  },
  {
    question: "É possível automatizar meu atendimento?",
    answer: "Sim, através da solução de Automações, disponível como camada adicional à operação.",
  },
  {
    question: "Existe inteligência artificial?",
    answer:
      "Sim. O Sales AI adiciona IA à operação de atendimento e vendas, como solução adicional — não faz parte dos planos de software.",
  },
  {
    question: "Posso integrar com meu ERP ou CRM?",
    answer:
      "Sim, mediante análise da sua operação e dos sistemas envolvidos. Fale com um especialista para mapear a integração.",
  },
  {
    question: "Quanto custa uma automação ou integração?",
    answer:
      "O investimento varia conforme volume, sistemas envolvidos e complexidade. Não trabalhamos com um valor fechado para todos os casos — um especialista faz o diagnóstico e apresenta um orçamento específico para sua operação.",
  },
];

export function FAQ() {
  // Todas fechadas no lançamento; apenas uma aberta por vez.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      aria-labelledby="faq-titulo"
      className="surface-noise surface-glow bg-surface-muted relative py-20 lg:py-28"
    >
      <div className="container">
        <ScrollReveal className="mx-auto max-w-[46rem] text-center">
          <h2
            id="faq-titulo"
            className="text-primary-950 font-display text-3xl leading-[1.12] font-bold tracking-tight sm:text-4xl"
          >
            Perguntas frequentes
          </h2>
        </ScrollReveal>

        <ul className="card-surface mx-auto mt-12 max-w-[46rem] divide-y divide-neutral-200/80 overflow-hidden rounded-2xl px-5 sm:px-7">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-painel-${index}`;
            const buttonId = `faq-pergunta-${index}`;

            return (
              <li key={item.question}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className={cn(
                      "flex w-full items-start justify-between gap-4 rounded-lg px-2 py-5 -mx-2",
                      "text-primary-950 text-base font-semibold sm:text-lg",
                      "hover:text-accent-700 hover:bg-accent-50/50 ease-fluid transition-colors duration-200",
                      "focus-visible:outline-accent-500 focus-visible:outline-2 focus-visible:outline-offset-2"
                    )}
                  >
                    <span>{item.question}</span>
                    <ChevronIcon open={isOpen} />
                  </button>
                </h3>

                {/* grid-rows 0fr -> 1fr anima altura sem precisar medir o conteúdo. */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  // Sem `hidden`: ele cortaria a animação. O painel fechado tem
                  // altura zero e nenhum elemento focável, e sai da árvore de
                  // acessibilidade por aria-hidden.
                  aria-hidden={!isOpen}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-200 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-base text-neutral-600">{item.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(
        "text-accent-600 ease-fluid mt-1 shrink-0 transition-transform duration-300",
        open && "rotate-180"
      )}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
