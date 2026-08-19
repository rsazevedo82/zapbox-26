# Zapbox — Regras do Projeto

Este arquivo é lido automaticamente pelo Claude Code. Siga estas regras
em toda interação com este projeto.

## O que é o projeto

Site oficial da Zapbox — plataforma SaaS B2B de atendimento e vendas pelo
WhatsApp. Operado pela RC2 Soluções. O site é uma landing page institucional
e de conversão, não um app.

## Stack

- Next.js 15 (App Router, TypeScript)
- Tailwind CSS 4 (CSS-first config em src/styles/globals.css)
- Zod 4 (validação — atenção: API difere do Zod 3)
- Supabase (persistência de leads — client server-only)
- Resend (notificação interna de leads — server-only)
- GTM + GA4 (carregado somente após consentimento de cookies)
- pnpm (package manager — NÃO use npm ou yarn)
- Deploy: Vercel

## Estrutura

```
src/
├── app/           # App Router (rotas e páginas)
│   └── api/       # Route Handlers (server-side)
├── components/
│   ├── ui/        # Primitivos reutilizáveis (Button, Input, etc.)
│   ├── layout/    # Header, Footer, CookieConsent, GTM
│   └── sections/  # Seções da homepage (Hero, Pricing, FAQ, etc.)
├── lib/           # Utilitários, clients, validações, constantes
├── styles/        # globals.css com tokens de design
└── types/         # Declarações de tipo (gtm.d.ts, etc.)
```

## Arquivos de referência (fonte de verdade)

Os documentos em `geral/` contêm copy, posicionamento, planos, preços,
funcionalidades e estrutura do site:

- `geral/zapbox-copy-site.md` — copy oficial de todas as seções
- `geral/Zapbox_Conceito_Homepage_Arquitetura_Site.md` — arquitetura da homepage
- `geral/zapbox-software.md` — detalhes do produto e planos
- `geral/Zapbox_Tabela_de_Precos.md` — preços e limites
- `geral/Zapbox_Catalogo_Servicos_Unit_Economics.md` — serviços complementares
- `geral/Zapbox_Pitches_Comerciais.md` — pitches e posicionamento

SEMPRE leia esses arquivos antes de implementar copy, seções ou funcionalidades.

Nota: `geral/` NÃO é rastreado pelo Git. É material de origem local, não
faz parte do build e não deve ser importado por código de `src/`.

## Restrição crítica: SEM SELF-SERVICE

O site NÃO tem checkout, contratação automática, criação de conta,
login, área de cliente, teste grátis ou onboarding automático.

O fluxo de conversão é:
visitante → CTA → formulário de lead → persistência no Supabase →
redirecionamento para WhatsApp → atendimento comercial humano.

- Botão "Entrar" NÃO EXISTE.
- NÃO use textos como "teste grátis", "crie sua conta", "comece a usar agora",
  "ative seu plano" ou qualquer frase que implique autoatendimento.
- CTAs de conversão usam: "Começar agora" (abre formulário de lead),
  "Falar com especialista" (WhatsApp direto).

## Regras de copy

- Use APENAS copy documentada nos arquivos de `geral/`.
- NÃO invente funcionalidades, métricas, clientes, depoimentos, cases,
  integrações, certificações ou números.
- NÃO reescreva headlines ou textos importantes sem documentar o ajuste.
- Se algum texto conflitar com a restrição de self-service, ajuste o MÍNIMO
  necessário e documente.

## Design tokens

Estão em `src/styles/globals.css` dentro do bloco @theme.

Cores da marca:
- Primary (azul escuro): #002136 (ancorado em primary-950)
- Accent (verde): #00995F (ancorado em accent-600)
- Branco: #FFFFFF

Escalas derivadas disponíveis: `primary-50..950`, `accent-50..950`, neutros com
viés azulado (`neutral-50..950`), funcionais (`success`, `error`, `warning`) e
surfaces (`surface`, `surface-muted`, `surface-subtle`, `surface-inverted`).

Fonte: Inter (via next/font, variável --font-inter)

Container: utility `.container` — max-width 80rem (1280px), padding responsivo
1rem/1.5rem/2rem. No Tailwind 4 o container não vem do config: use a utility
já definida em globals.css.

NÃO crie novos tokens de cor. NÃO troque a fonte. NÃO altere a escala
tipográfica. Use os tokens existentes.

## Componentes

- Use cn() de `src/lib/utils.ts` para merge de classes.
- Priorize Server Components. Use "use client" apenas quando necessário
  (interatividade, hooks, event handlers).
- Supabase e Resend: APENAS server-side. Nunca importe em client components.
  Ambos os módulos têm `import "server-only"` — importá-los no client quebra
  o build, por design.
- Button está em `src/components/ui/Button.tsx` (quando existir).

## Dados e constantes

- `src/lib/constants.ts` é a fonte de verdade para SITE_CONFIG e PLANS.
- PLANS: `essencial` R$ 149 · `time` R$ 319 (destaque) · `operacao` R$ 499.
  NÃO altere valores, nomes ou limites sem instrução explícita.
- SITE_CONFIG tem placeholders vazios ainda não definidos: `whatsappNumber`,
  `contactEmail`, `socialLinks.instagram`, `socialLinks.linkedin`.
  NÃO invente esses valores. Se uma tarefa depender deles, sinalize.

## Padrões de qualidade

Antes de finalizar qualquer tarefa, execute:
1. `pnpm build` — deve passar sem erros
2. `pnpm lint` — deve passar sem erros
3. `pnpm tsc --noEmit` — deve passar sem erros

Considere sempre:
- Responsividade (375px a 1920px)
- Acessibilidade (HTML semântico, contraste AA, focus visible, aria-labels)
- Performance (next/image, sem libs pesadas, CSS transitions)
- SEO (semântica, headings, metadata)

## Segurança

- Secrets NUNCA em código — apenas variáveis de ambiente
- SUPABASE_SERVICE_ROLE_KEY: server-only, jamais no client
- Não expor informações sensíveis em URLs de WhatsApp
- Sanitizar inputs do formulário

## O que NÃO fazer

- NÃO instale dependências sem instrução explícita
- NÃO faça refatorações amplas fora do escopo da tarefa
- NÃO altere arquivos não relacionados à tarefa
- NÃO crie abstrações prematuras
- NÃO use imagens de referência de terceiros como assets finais
  (as imagens em `geral/` de Chatwoot, n8n, Typebot etc. são referência,
  não assets para publicação — exceto `chatwoot-painel.webp` que pode ser
  usado temporariamente como screenshot do produto).
  Os arquivos de marca da própria Zapbox em `geral/` (`zapbox-logo.svg`,
  `zapbox-icone.svg`, `zapbox-logo-texto.png`, `logo-zapbox-footer.svg`)
  SÃO assets legítimos e podem ser usados.
- NÃO adicione banner de "em construção", "coming soon" ou similar
- NÃO invente requisitos que não foram solicitados

## Skills instaladas

O projeto tem 43 skills em `.claude/skills/` (escopo local), incluindo oito
que disputam decisões de design visual (`frontend-design`, `ui-design`,
`anti-ui-slop`, `impeccable`, `ui-ux-pro-max`, `high-end-visual-design`,
`design-taste-frontend`, `huashu-design`).

Elas trazem regras próprias e conflitantes entre si sobre fontes, espaçamento,
sombras e grids. NÃO deixe uma skill de design sobrescrever os tokens deste
projeto: os design tokens de `globals.css` e a copy de `geral/` têm precedência
sobre qualquer recomendação de skill. Use skills de design apenas quando
invocadas explicitamente.
