CREATE TABLE IF NOT EXISTS public.form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type TEXT NOT NULL,
  name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  dob DATE,
  subject TEXT,
  message TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  email_delivery_status TEXT NOT NULL DEFAULT 'pending',
  email_delivery_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at
  ON public.form_submissions (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_form_submissions_form_type
  ON public.form_submissions (form_type);