CREATE TABLE public.collection_centers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text,
  address text,
  city text NOT NULL DEFAULT 'Gurugram',
  pincode text,
  phone text,
  alt_phone text,
  email text,
  timings text,
  map_url text,
  home_collection boolean NOT NULL DEFAULT true,
  notes text,
  sort_order integer NOT NULL DEFAULT 0,
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.collection_centers TO service_role;

ALTER TABLE public.collection_centers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages collection centers"
ON public.collection_centers FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE TRIGGER collection_centers_updated
BEFORE UPDATE ON public.collection_centers
FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();