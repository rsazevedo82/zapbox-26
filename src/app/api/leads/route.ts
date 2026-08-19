import { createHash } from "node:crypto";

import { NextResponse } from "next/server";

import { sendEmergencyLeadEmail, sendLeadNotification } from "@/lib/resend";
import { getSupabaseAdmin } from "@/lib/supabase";
import { leadFormSchema, type LeadFormData, type LeadRecord } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const JSON_HEADERS = { "Content-Type": "application/json" } as const;

/* -------------------------------------------------------------------------- */
/* Rate limiting                                                              */
/* -------------------------------------------------------------------------- */

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hora

/**
 * Rate limiting in-memory. Reinicia a cada cold start no serverless — aceitável
 * para o volume inicial. Para algo mais robusto, migrar para Vercel KV/Upstash.
 */
const requestLog = new Map<string, number[]>();

function isRateLimited(ipHash: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;

  const recent = (requestLog.get(ipHash) ?? []).filter((ts) => ts > cutoff);

  if (recent.length >= RATE_LIMIT_MAX) {
    requestLog.set(ipHash, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(ipHash, recent);

  // Limpeza oportunista para o Map não crescer indefinidamente.
  if (requestLog.size > 5000) {
    for (const [key, timestamps] of requestLog) {
      if (timestamps.every((ts) => ts <= cutoff)) requestLog.delete(key);
    }
  }

  return false;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() ?? "unknown";
}

/** Hash do IP (SHA-256). Nunca armazenamos o IP em claro. */
function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: JSON_HEADERS });
}

function methodNotAllowed() {
  return NextResponse.json(
    { success: false, errors: ["Método não permitido."] },
    { status: 405, headers: { ...JSON_HEADERS, Allow: "POST" } }
  );
}

/** Dados do lead sem o honeypot — usado no insert, nos e-mails e nos logs. */
function toLeadRecord(data: LeadFormData): LeadRecord {
  const record: LeadFormData = { ...data };
  delete record.honeypot;
  return record;
}

/* -------------------------------------------------------------------------- */
/* POST /api/leads                                                            */
/* -------------------------------------------------------------------------- */

export async function POST(request: Request) {
  // 1. Body JSON
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ success: false, errors: ["Requisição inválida."] }, 400);
  }

  // 2. Validação
  const parsed = leadFormSchema.safeParse(payload);
  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => issue.message);
    return json({ success: false, errors }, 400);
  }

  // 3. Honeypot — resposta de sucesso falsa, sem persistir nada.
  if (parsed.data.honeypot && parsed.data.honeypot.trim() !== "") {
    return json({ success: true, persisted: true });
  }

  // 4. Rate limiting por IP
  const ipHash = hashIp(getClientIp(request));
  if (isRateLimited(ipHash)) {
    return json(
      { success: false, errors: ["Muitas tentativas. Tente novamente mais tarde."] },
      429
    );
  }

  const lead = toLeadRecord(parsed.data);

  // 5. Persistência
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("leads").insert({
      ...lead,
      ip_hash: ipHash,
      status: "new",
    });

    if (error) throw new Error(error.message);
  } catch (err) {
    const message = err instanceof Error ? err.message : "erro desconhecido";

    // 7. Log para recuperação manual (sem ip_hash) + e-mail de emergência.
    console.error("[api/leads] falha ao persistir lead:", message, JSON.stringify(lead));
    await sendEmergencyLeadEmail(lead, message);

    // O usuário não deve ser penalizado por uma falha de infraestrutura.
    return json({ success: true, persisted: false });
  }

  // 6. Notificação — falha aqui não derruba o request.
  const notification = await sendLeadNotification(lead);
  if (!notification.sent && notification.error !== "not configured") {
    console.error("[api/leads] notificação não enviada:", notification.error);
  }

  return json({ success: true, persisted: true });
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
