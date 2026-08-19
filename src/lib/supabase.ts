// SERVER-ONLY — não importe em client components
import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase com service role.
 *
 * A service role bypassa RLS, portanto este módulo é de uso EXCLUSIVO em
 * Route Handlers, Server Components e Server Actions. O `import "server-only"`
 * acima faz o build falhar caso algum client component tente importá-lo.
 *
 * As variáveis são lidas em tempo de execução (não no top-level) para que a
 * ausência delas não quebre o build — apenas a chamada em runtime.
 */
let cachedClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error("Variável de ambiente NEXT_PUBLIC_SUPABASE_URL não configurada.");
  }
  if (!serviceRoleKey) {
    throw new Error("Variável de ambiente SUPABASE_SERVICE_ROLE_KEY não configurada.");
  }

  cachedClient = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return cachedClient;
}

/** Indica se o Supabase está configurado, sem lançar erro. */
export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
