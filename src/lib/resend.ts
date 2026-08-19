// SERVER-ONLY — não importe em client components
import "server-only";

import { Resend } from "resend";

import type { LeadRecord } from "@/lib/validations";

/**
 * Notificações internas por e-mail (Resend).
 *
 * O remetente usa o domínio de testes do Resend enquanto não houver um domínio
 * verificado da Zapbox. Trocar `FROM_ADDRESS` assim que o DNS estiver pronto.
 */
const FROM_ADDRESS = "Zapbox Site <onboarding@resend.dev>";

export type SendResult = { sent: true } | { sent: false; error: string };

type ResendConfig = { client: Resend; to: string };

function getResendConfig(): ResendConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL;

  if (!apiKey || !to) {
    console.warn(
      "[resend] RESEND_API_KEY ou NOTIFICATION_EMAIL não configurados — notificação ignorada."
    );
    return null;
  }

  return { client: new Resend(apiKey), to };
}

/** Escapa texto do lead antes de interpolar no HTML do e-mail. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string | undefined | null): string {
  if (!value) return "";
  return `<tr>
      <td style="padding:6px 12px 6px 0;color:#52616e;font-size:14px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:6px 0;color:#1a232c;font-size:14px;font-weight:600;">${escapeHtml(value)}</td>
    </tr>`;
}

function leadTable(lead: LeadRecord): string {
  const utmRows = [
    row("utm_source", lead.utm_source),
    row("utm_medium", lead.utm_medium),
    row("utm_campaign", lead.utm_campaign),
    row("utm_content", lead.utm_content),
    row("utm_term", lead.utm_term),
  ].join("");

  return `<table style="border-collapse:collapse;width:100%;max-width:560px;">
      ${row("Nome", lead.name)}
      ${row("Telefone", lead.phone)}
      ${row("E-mail", lead.email)}
      ${row("Empresa", lead.company)}
      ${row("Plano de interesse", lead.plan_interest ?? "sem plano definido")}
      ${row("Página de origem", lead.source_page)}
      ${row("CTA de origem", lead.source_cta)}
      ${row("Referrer", lead.referrer)}
      ${utmRows}
      ${row("Recebido em", new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }))}
    </table>`;
}

function wrap(title: string, accent: string, body: string): string {
  return `<div style="font-family:Inter,Arial,sans-serif;background:#f7f9fa;padding:24px;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #dde4ea;">
        <div style="background:${accent};color:#ffffff;padding:16px 24px;font-size:16px;font-weight:600;">
          ${escapeHtml(title)}
        </div>
        <div style="padding:24px;">${body}</div>
      </div>
    </div>`;
}

/** Notificação padrão de novo lead salvo com sucesso. */
export async function sendLeadNotification(lead: LeadRecord): Promise<SendResult> {
  const config = getResendConfig();
  if (!config) return { sent: false, error: "not configured" };

  const planLabel = lead.plan_interest ?? "sem plano definido";

  try {
    const { error } = await config.client.emails.send({
      from: FROM_ADDRESS,
      to: config.to,
      subject: `Novo lead: ${lead.name} — ${planLabel}`,
      html: wrap("Novo lead pelo site", "#002136", leadTable(lead)),
    });

    if (error) {
      console.error("[resend] falha ao enviar notificação de lead:", error.message);
      return { sent: false, error: error.message };
    }

    return { sent: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "erro desconhecido";
    console.error("[resend] exceção ao enviar notificação de lead:", message);
    return { sent: false, error: message };
  }
}

/**
 * Fallback comercial: o Supabase falhou e o lead NÃO foi persistido.
 * O e-mail carrega todos os dados para recuperação manual.
 */
export async function sendEmergencyLeadEmail(
  lead: LeadRecord,
  originalError: string
): Promise<SendResult> {
  const config = getResendConfig();
  if (!config) return { sent: false, error: "not configured" };

  const body = `
    <p style="margin:0 0 16px;color:#a32020;font-size:14px;font-weight:600;">
      Este lead NÃO foi salvo no banco de dados. Registre manualmente.
    </p>
    ${leadTable(lead)}
    <p style="margin:20px 0 4px;color:#52616e;font-size:13px;">Erro retornado pelo Supabase:</p>
    <pre style="background:#f7f9fa;border:1px solid #dde4ea;border-radius:8px;padding:12px;font-size:12px;color:#3f4c58;white-space:pre-wrap;">${escapeHtml(originalError)}</pre>
  `;

  try {
    const { error } = await config.client.emails.send({
      from: FROM_ADDRESS,
      to: config.to,
      subject: `⚠️ LEAD NÃO SALVO — AÇÃO NECESSÁRIA: ${lead.name}`,
      html: wrap("Lead não persistido", "#a32020", body),
    });

    if (error) {
      console.error("[resend] falha ao enviar e-mail de emergência:", error.message);
      return { sent: false, error: error.message };
    }

    return { sent: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "erro desconhecido";
    console.error("[resend] exceção ao enviar e-mail de emergência:", message);
    return { sent: false, error: message };
  }
}
