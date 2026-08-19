-- Tabela de leads capturados pelo site
CREATE TABLE IF NOT EXISTS public.leads (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    timestamptz NOT NULL DEFAULT now(),
  name          text NOT NULL,
  phone         text NOT NULL,
  email         text,
  company       text,
  plan_interest text,
  source_page   text,
  source_cta    text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_content   text,
  utm_term      text,
  referrer      text,
  status        text NOT NULL DEFAULT 'new',
  ip_hash       text,
  consent_lgpd  boolean NOT NULL DEFAULT false
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_plan_interest ON public.leads (plan_interest);

-- RLS: bloquear todo acesso público
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Nenhuma policy para anon ou authenticated — apenas service_role acessa
-- Service role bypassa RLS por padrão no Supabase

-- Comentário na tabela
COMMENT ON TABLE public.leads IS 'Leads capturados pelo site da Zapbox';
