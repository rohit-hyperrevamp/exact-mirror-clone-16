ALTER TABLE public.test_orders
  ADD COLUMN IF NOT EXISTS points_used integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS points_value numeric NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS public.loyalty_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id uuid REFERENCES public.loyalty_members(id) ON DELETE SET NULL,
  customer_id uuid REFERENCES public.customers(id) ON DELETE SET NULL,
  order_id uuid REFERENCES public.test_orders(id) ON DELETE SET NULL,
  order_no text,
  kind text NOT NULL CHECK (kind IN ('earn','redeem','adjust','expire')),
  points integer NOT NULL,
  value_rupees numeric NOT NULL DEFAULT 0,
  balance_after integer,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.loyalty_transactions TO service_role;

ALTER TABLE public.loyalty_transactions ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS loyalty_transactions_customer_idx ON public.loyalty_transactions (customer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS loyalty_transactions_order_idx ON public.loyalty_transactions (order_id);