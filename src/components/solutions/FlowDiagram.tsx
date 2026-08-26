import { cn } from "@/lib/utils";

/**
 * Fluxos das páginas de solução, renderizados como interface — não como bloco
 * de código. O documento de copy descreve esses fluxos em texto com setas; aqui
 * eles viram blocos conectados.
 *
 * Orientação: fluxos lineares curtos (até 5 blocos, sem ramificação) ficam
 * horizontais no desktop; qualquer fluxo com ramificação fica vertical, porque
 * a bifurcação precisa de espaço lateral para as duas saídas.
 */

export type FlowNode = {
  label: string;
  /** Linhas de detalhe dentro do bloco (ex.: valor, etapa, responsável). */
  lines?: string[];
  tone?: "default" | "accent" | "muted";
};

export type FlowBranch = {
  question?: string;
  options: {
    label: string;
    nodes?: FlowNode[];
    tone?: "accent" | "muted" | "default";
  }[];
};

type FlowDiagramProps = {
  nodes: FlowNode[];
  branch?: FlowBranch;
  /** "dark" para seções sobre primary-950. */
  surface?: "light" | "dark";
  className?: string;
};

export function FlowDiagram({ nodes, branch, surface = "light", className }: FlowDiagramProps) {
  const horizontal = !branch && nodes.length <= 5;

  return (
    <div
      className={cn("mx-auto w-full max-w-4xl", className)}
      role="group"
      aria-label="Diagrama de fluxo"
    >
      <ol
        className={cn(
          // Empilhado: largura contida, para o bloco não virar uma faixa.
          "mx-auto flex max-w-sm flex-col items-stretch gap-0",
          horizontal && "lg:max-w-none lg:flex-row lg:items-center lg:justify-center"
        )}
      >
        {nodes.map((node, i) => (
          <li
            key={node.label}
            className={cn("flex flex-col items-center", horizontal && "lg:flex-1 lg:flex-row")}
          >
            <Block node={node} surface={surface} />
            {i < nodes.length - 1 && <Connector horizontal={horizontal} surface={surface} />}
          </li>
        ))}
      </ol>

      {branch && <Branch branch={branch} surface={surface} />}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Block({ node, surface }: { node: FlowNode; surface: "light" | "dark" }) {
  const dark = surface === "dark";
  const tone = node.tone ?? "default";

  return (
    <div
      className={cn(
        "w-full min-w-0 rounded-xl px-5 py-4 text-center",
        dark ? "glass-panel" : "card-surface ring-0",
        tone === "accent" &&
          (dark
            ? "border-accent-500/40 bg-accent-500/12"
            : "from-accent-50 to-accent-100/70 outline-accent-600/35 bg-gradient-to-b outline-2"),
        tone === "muted" && "opacity-70"
      )}
    >
      <p
        className={cn(
          "text-sm font-semibold tracking-[0.08em] uppercase",
          dark ? "text-white" : "text-primary-950",
          tone === "accent" && !dark && "text-accent-800",
          tone === "accent" && dark && "text-accent-200"
        )}
      >
        {node.label}
      </p>

      {node.lines && node.lines.length > 0 && (
        <ul className="mt-2 flex flex-col gap-0.5">
          {node.lines.map((line) => (
            <li
              key={line}
              className={cn("text-sm", dark ? "text-primary-200" : "text-neutral-600")}
            >
              {line}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Traço com degradê + ponta, no lugar de uma seta de texto. */
function Connector({ horizontal, surface }: { horizontal: boolean; surface: "light" | "dark" }) {
  const cor = surface === "dark" ? "bg-accent-400/50" : "bg-accent-600/40";
  const ponta = surface === "dark" ? "border-t-accent-400/70" : "border-t-accent-600/60";

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center",
        horizontal ? "h-6 w-full lg:h-full lg:w-8" : "h-6 w-full"
      )}
    >
      <span className={cn("relative", cor, horizontal ? "h-4 w-px lg:h-px lg:w-full" : "h-4 w-px")}>
        <span
          className={cn(
            "absolute h-0 w-0 border-x-4 border-t-[6px] border-x-transparent",
            ponta,
            horizontal
              ? "-bottom-1 left-1/2 -translate-x-1/2 lg:top-1/2 lg:-right-1 lg:bottom-auto lg:left-auto lg:-translate-y-1/2 lg:-rotate-90"
              : "-bottom-1 left-1/2 -translate-x-1/2"
          )}
        />
      </span>
    </span>
  );
}

/** Bifurcação: uma pergunta e duas ou mais saídas lado a lado. */
function Branch({ branch, surface }: { branch: FlowBranch; surface: "light" | "dark" }) {
  const dark = surface === "dark";
  // Com uma única saída não há bifurcação: a forquilha de dois braços deixaria
  // um traço morrendo no vazio. Nesse caso o fluxo segue reto.
  const unicaSaida = branch.options.length === 1;

  return (
    <div className="flex flex-col items-center">
      <Connector horizontal={false} surface={surface} />

      {branch.question && (
        <p
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium",
            dark
              ? "glass-panel text-primary-100"
              : "bg-surface-muted text-primary-900 ring-1 ring-neutral-200"
          )}
        >
          {branch.question}
        </p>
      )}

      {/*
        Forquilha: tronco curto que se abre em dois braços apontando para o
        centro de cada coluna. Só no tablet+ — empilhado, a linha reta basta.
      */}
      {unicaSaida ? (
        <Connector horizontal={false} surface={surface} />
      ) : (
        <>
          <span
            aria-hidden="true"
            className={cn("h-4 w-px", dark ? "bg-accent-400/50" : "bg-accent-600/40")}
          />
          <div aria-hidden="true" className="hidden h-5 w-full px-[25%] sm:flex">
            <span
              className={cn(
                "flex-1 rounded-tl-md border-t border-l",
                dark ? "border-accent-400/50" : "border-accent-600/40"
              )}
            />
            <span
              className={cn(
                "flex-1 rounded-tr-md border-t border-r",
                dark ? "border-accent-400/50" : "border-accent-600/40"
              )}
            />
          </div>
          <span
            aria-hidden="true"
            className={cn("h-4 w-px sm:hidden", dark ? "bg-accent-400/50" : "bg-accent-600/40")}
          />
        </>
      )}

      <ul className={cn("mt-4 grid w-full gap-4", !unicaSaida && "sm:grid-cols-2")}>
        {branch.options.map((option) => (
          <li key={option.label} className="mx-auto flex w-full max-w-sm flex-col items-center">
            <span
              className={cn(
                "mb-2 text-xs font-bold tracking-[0.14em] uppercase",
                option.tone === "muted"
                  ? dark
                    ? "text-primary-300"
                    : "text-neutral-500"
                  : dark
                    ? "text-accent-300"
                    : "text-accent-700"
              )}
            >
              {option.label}
            </span>

            {option.nodes?.map((node, i) => (
              <div key={node.label} className="flex w-full flex-col items-center">
                {i > 0 && <Connector horizontal={false} surface={surface} />}
                <Block node={node} surface={surface} />
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
