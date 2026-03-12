CREATE POLICY "Service role can manage form submissions"
ON public.form_submissions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);