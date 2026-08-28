CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;

CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL DEFAULT 'General',
  h1 text,
  meta_title text,
  meta_description text,
  primary_keyword text,
  secondary_keywords text[] NOT NULL DEFAULT '{}',
  excerpt text,
  content text NOT NULL DEFAULT '',
  featured_image text,
  author text NOT NULL DEFAULT 'Aarvak Diagnostics',
  read_minutes integer NOT NULL DEFAULT 5,
  tags text[] NOT NULL DEFAULT '{}',
  scheduled_date date,
  scheduled_time time NOT NULL DEFAULT '00:00',
  timezone text NOT NULL DEFAULT 'Asia/Kolkata',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','scheduled','published','failed')),
  needs_review boolean NOT NULL DEFAULT false,
  last_error text,
  published_at timestamptz,
  source text NOT NULL DEFAULT 'calendar-pdf',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX blog_posts_status_idx ON public.blog_posts (status, scheduled_date);
CREATE INDEX blog_posts_published_idx ON public.blog_posts (published_at DESC);

GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts only"
ON public.blog_posts FOR SELECT TO anon, authenticated
USING (status = 'published' AND published_at IS NOT NULL AND published_at <= now());

CREATE TRIGGER blog_posts_updated BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE TABLE public.blog_settings (
  id boolean PRIMARY KEY DEFAULT true CHECK (id),
  default_publish_time time NOT NULL DEFAULT '00:00',
  timezone text NOT NULL DEFAULT 'Asia/Kolkata',
  auto_publish_enabled boolean NOT NULL DEFAULT true,
  overdue_grace_days integer NOT NULL DEFAULT 3,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.blog_settings TO service_role;
ALTER TABLE public.blog_settings ENABLE ROW LEVEL SECURITY;
INSERT INTO public.blog_settings (id) VALUES (true);

CREATE TABLE public.blog_publish_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES public.blog_posts(id) ON DELETE SET NULL,
  slug text,
  action text NOT NULL,
  ok boolean NOT NULL DEFAULT true,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.blog_publish_log TO service_role;
ALTER TABLE public.blog_publish_log ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.blog_scheduled_at(p_date date, p_time time, p_tz text)
RETURNS timestamptz
LANGUAGE sql IMMUTABLE
SET search_path = public
AS $$
  SELECT ((p_date::text || ' ' || p_time::text)::timestamp) AT TIME ZONE COALESCE(NULLIF(p_tz,''), 'Asia/Kolkata');
$$;

CREATE OR REPLACE FUNCTION public.publish_due_blog_posts()
RETURNS TABLE(published_count integer, flagged_count integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  s public.blog_settings;
  pub integer := 0;
  flg integer := 0;
BEGIN
  IF NOT pg_try_advisory_xact_lock(hashtext('publish_due_blog_posts')) THEN
    RETURN QUERY SELECT 0, 0;
    RETURN;
  END IF;

  SELECT * INTO s FROM public.blog_settings WHERE id LIMIT 1;
  IF s IS NULL OR NOT s.auto_publish_enabled THEN
    RETURN QUERY SELECT 0, 0;
    RETURN;
  END IF;

  WITH overdue AS (
    UPDATE public.blog_posts b
    SET status = 'failed', needs_review = true,
        last_error = 'Overdue: scheduled time passed more than ' || s.overdue_grace_days || ' day(s) ago. Needs admin review before publishing.'
    WHERE b.status = 'scheduled'
      AND b.scheduled_date IS NOT NULL
      AND public.blog_scheduled_at(b.scheduled_date, b.scheduled_time, b.timezone)
          < now() - make_interval(days => s.overdue_grace_days)
    RETURNING b.id, b.slug
  )
  INSERT INTO public.blog_publish_log (post_id, slug, action, ok, message)
  SELECT id, slug, 'flag_overdue', false, 'Flagged for admin review (overdue)' FROM overdue;
  GET DIAGNOSTICS flg = ROW_COUNT;

  WITH due AS (
    SELECT b.id FROM public.blog_posts b
    WHERE b.status = 'scheduled'
      AND b.scheduled_date IS NOT NULL
      AND public.blog_scheduled_at(b.scheduled_date, b.scheduled_time, b.timezone) <= now()
    ORDER BY b.scheduled_date
    LIMIT 25
  ), done AS (
    UPDATE public.blog_posts b
    SET status = 'published', published_at = now(), needs_review = false, last_error = NULL
    WHERE b.id IN (SELECT id FROM due) AND b.status = 'scheduled'
    RETURNING b.id, b.slug
  )
  INSERT INTO public.blog_publish_log (post_id, slug, action, ok, message)
  SELECT id, slug, 'publish', true, 'Auto-published by scheduler' FROM done;
  GET DIAGNOSTICS pub = ROW_COUNT;

  RETURN QUERY SELECT pub, flg;
END;
$$;

SELECT cron.schedule(
  'publish-due-blog-posts',
  '*/5 * * * *',
  $$SELECT public.publish_due_blog_posts();$$
);