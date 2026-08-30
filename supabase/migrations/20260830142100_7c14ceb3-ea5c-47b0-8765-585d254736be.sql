ALTER TABLE public.collection_centers
  ADD COLUMN IF NOT EXISTS latitude numeric,
  ADD COLUMN IF NOT EXISTS longitude numeric;

ALTER TABLE public.test_orders
  ADD COLUMN IF NOT EXISTS center_id uuid REFERENCES public.collection_centers(id),
  ADD COLUMN IF NOT EXISTS center_name text;

GRANT SELECT ON public.collection_centers TO anon, authenticated;

DROP POLICY IF EXISTS "Public can read enabled collection centers" ON public.collection_centers;
CREATE POLICY "Public can read enabled collection centers"
ON public.collection_centers
FOR SELECT
TO anon, authenticated
USING (enabled = true);