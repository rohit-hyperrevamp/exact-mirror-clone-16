CREATE TABLE public.booking_settings (
  id boolean PRIMARY KEY DEFAULT true,
  no_refund_hours integer NOT NULL DEFAULT 24,
  partial_refund_hours integer NOT NULL DEFAULT 72,
  partial_refund_percent numeric NOT NULL DEFAULT 50,
  full_refund_percent numeric NOT NULL DEFAULT 100,
  reschedule_allowed boolean NOT NULL DEFAULT true,
  reschedule_min_hours integer NOT NULL DEFAULT 24,
  policy_text text NOT NULL DEFAULT 'Cancellations made within 24 hours of the scheduled appointment are non-refundable. Cancellations made 72 hours or more before the appointment are eligible for a 50% refund. Rescheduling to a future date is free of charge.',
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT booking_settings_single_row CHECK (id)
);

GRANT ALL ON public.booking_settings TO service_role;

ALTER TABLE public.booking_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages booking settings"
  ON public.booking_settings FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE TRIGGER booking_settings_updated
  BEFORE UPDATE ON public.booking_settings
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

INSERT INTO public.booking_settings (id) VALUES (true) ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.test_orders
  ADD COLUMN IF NOT EXISTS cancelled_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS cancel_reason text,
  ADD COLUMN IF NOT EXISTS refund_percent numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS refund_amount numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS reschedule_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS rescheduled_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS booked_online boolean NOT NULL DEFAULT false;