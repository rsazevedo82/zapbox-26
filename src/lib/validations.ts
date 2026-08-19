import { z } from "zod";

/**
 * Schemas de validação do site.
 *
 * Zod instalado: 4.x. Diferenças relevantes em relação ao Zod 3:
 *  - `z.object()` continua sendo a API correta (`z.interface` não existe no 4 estável).
 *  - Validadores de formato são top-level: `z.email()` no lugar de `z.string().email()`.
 *  - Mensagens customizadas usam a chave `error` no lugar de `message`.
 *  - `z.infer<typeof schema>` continua funcionando.
 */

/** Remove tudo que não for dígito de um telefone digitado em qualquer formato. */
export function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Campos opcionais chegam do formulário como "" — normalizamos para `undefined`
 * ANTES da validação, para que a mensagem de erro do tipo interno seja
 * preservada (um `z.union` com `z.literal("")` descartaria a mensagem).
 */
const emptyToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

const optionalText = (max: number, label: string) =>
  z.preprocess(
    emptyToUndefined,
    z
      .string()
      .trim()
      .max(max, { error: `${label} deve ter no máximo ${max} caracteres` })
      .optional()
  );

export const PLAN_IDS = ["essencial", "time", "operacao"] as const;

export const leadFormSchema = z.object({
  name: z
    .string({ error: "Nome é obrigatório" })
    .trim()
    .min(2, { error: "Informe seu nome completo" })
    .max(100, { error: "Nome deve ter no máximo 100 caracteres" }),

  // Aceita "11999999999", "(11) 99999-9999", "+55 11 99999-9999" — normaliza para dígitos.
  phone: z
    .string({ error: "Telefone é obrigatório" })
    .trim()
    .transform(normalizePhone)
    .refine((digits) => digits.length >= 10 && digits.length <= 13, {
      error: "Telefone inválido. Informe DDD e número",
    }),

  email: z.preprocess(emptyToUndefined, z.email({ error: "E-mail inválido" }).optional()),

  company: optionalText(200, "Empresa"),

  plan_interest: z.preprocess(
    emptyToUndefined,
    z.enum(PLAN_IDS, { error: "Plano de interesse inválido" }).optional()
  ),

  source_page: optionalText(500, "Página de origem"),
  source_cta: optionalText(100, "CTA de origem"),

  utm_source: optionalText(200, "utm_source"),
  utm_medium: optionalText(200, "utm_medium"),
  utm_campaign: optionalText(200, "utm_campaign"),
  utm_content: optionalText(200, "utm_content"),
  utm_term: optionalText(200, "utm_term"),

  referrer: optionalText(500, "Referrer"),

  consent_lgpd: z.literal(true, {
    error: "É necessário aceitar a política de privacidade",
  }),

  // Campo armadilha: preenchido apenas por bots.
  honeypot: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

/** Payload persistido na tabela `leads` (sem o honeypot). */
export type LeadRecord = Omit<LeadFormData, "honeypot">;
