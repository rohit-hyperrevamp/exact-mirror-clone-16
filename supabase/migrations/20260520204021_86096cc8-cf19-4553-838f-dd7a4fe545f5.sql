
-- Helper trigger to maintain updated_at
CREATE OR REPLACE FUNCTION public.tg_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- 1) Admins (single login for the dashboard)
CREATE TABLE public.seo_admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  login_id text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.seo_admins ENABLE ROW LEVEL SECURITY;
-- (no policies = only service_role can read)

-- Seed the single admin (password "98765" — sha256)
-- sha256('98765') = 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
INSERT INTO public.seo_admins (login_id, password_hash)
VALUES ('8373914073', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');

-- 2) Tasks
CREATE TABLE public.seo_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scheduled_date date,
  week int DEFAULT 1,
  section text NOT NULL DEFAULT 'SEO',           -- SEO | AEO | GEO
  category text NOT NULL DEFAULT 'On-page',
  deliverable_type text,
  priority text NOT NULL DEFAULT 'medium',
  effort_minutes int NOT NULL DEFAULT 30,
  title text NOT NULL,
  description text,
  target_url text,
  target_keyword text,
  secondary_keywords text[],
  page_title text,
  meta_description text,
  content_brief text,
  status text NOT NULL DEFAULT 'todo',           -- todo | in_progress | done | blocked
  completed_at timestamptz,
  completed_by text,
  notes text,
  blog_slug text,
  verified_at timestamptz,
  verified_status text,
  verified_snapshot jsonb,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.seo_tasks ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER seo_tasks_updated BEFORE UPDATE ON public.seo_tasks
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();
CREATE INDEX idx_seo_tasks_sched ON public.seo_tasks(scheduled_date);
CREATE INDEX idx_seo_tasks_status ON public.seo_tasks(status);

-- 3) Blog posts pipeline
CREATE TABLE public.seo_blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  url text NOT NULL,
  title text NOT NULL,
  meta_description text,
  primary_keyword text,
  secondary_keywords text[],
  body_md text NOT NULL DEFAULT '',
  scheduled_date date,
  status text NOT NULL DEFAULT 'draft',   -- draft | in_review | approved | deployed
  client_notes text,
  internal_notes text,
  approved_at timestamptz,
  approved_by text,
  deployed_at timestamptz,
  read_minutes int,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.seo_blog_posts ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER seo_blog_posts_updated BEFORE UPDATE ON public.seo_blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- 4) Settings (single row, id=1)
CREATE TABLE public.seo_settings (
  id int PRIMARY KEY DEFAULT 1,
  blog_approval_required boolean NOT NULL DEFAULT true,
  auto_execute boolean NOT NULL DEFAULT false,
  last_auto_run_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT seo_settings_singleton CHECK (id = 1)
);
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
INSERT INTO public.seo_settings (id) VALUES (1);

-- 5) Google integration (single row per provider)
CREATE TABLE public.seo_integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL UNIQUE,            -- 'google'
  refresh_token text NOT NULL,
  access_token text,
  token_expires_at timestamptz,
  scope text,
  property_url text,                         -- e.g. https://www.aarvakdiagnostics.com/
  connected_at timestamptz NOT NULL DEFAULT now(),
  last_refreshed_at timestamptz,
  last_error text,
  connected_by_user_id text
);
ALTER TABLE public.seo_integrations ENABLE ROW LEVEL SECURITY;

-- 6) Indexing API log
CREATE TABLE public.seo_indexing_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  action text NOT NULL DEFAULT 'URL_UPDATED',
  source text,
  status text NOT NULL DEFAULT 'pending',
  http_status int,
  error text,
  pinged_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.seo_indexing_log ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_seo_indexing_pinged ON public.seo_indexing_log(pinged_at DESC);
