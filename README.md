# Zapbox — Site Oficial

Site institucional e de conversão da [Zapbox](https://zapbox.com.br),
plataforma de atendimento e vendas pelo WhatsApp.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- Supabase (persistência de leads)
- Resend (notificações internas)
- Vercel (deploy)

## Requisitos

- Node.js 20+
- pnpm 9+

## Setup local

1. Clone o repositório
2. Instale dependências: `pnpm install`
3. Copie `.env.example` para `.env.local` e preencha as variáveis
4. Rode o dev server: `pnpm dev`
5. Acesse http://localhost:3000

## Estrutura

    src/
    ├── app/         # Rotas e páginas (App Router)
    ├── components/  # Componentes React
    ├── lib/         # Utilitários, validações, clients
    └── styles/      # CSS global e tokens

## Deploy

Deploy automático via Vercel ao fazer push na branch main.

---

**Zapbox by RC2 Soluções**
