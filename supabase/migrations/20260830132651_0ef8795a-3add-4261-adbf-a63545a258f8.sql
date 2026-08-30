-- ============ CATALOG ============
CREATE TABLE public.lab_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  category text NOT NULL DEFAULT 'Pathology',
  department text,
  sub text,
  sample_type text,
  price numeric NOT NULL DEFAULT 0,
  mrp numeric,
  fasting_required boolean NOT NULL DEFAULT false,
  turnaround text,
  parameters text[] NOT NULL DEFAULT '{}',
  description text,
  prep_instructions text,
  home_collection boolean NOT NULL DEFAULT true,
  image_url text,
  status text NOT NULL DEFAULT 'live',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.lab_tests TO service_role;
ALTER TABLE public.lab_tests ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER lab_tests_updated BEFORE UPDATE ON public.lab_tests FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- ============ CUSTOMERS ============
CREATE TABLE public.customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  phone text NOT NULL UNIQUE,
  email text,
  city text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.customers TO service_role;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER customers_updated BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- ============ ORDERS ============
CREATE SEQUENCE IF NOT EXISTS public.test_order_no_seq START 1001;

CREATE TABLE public.test_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_no text NOT NULL UNIQUE DEFAULT ('AD-' || nextval('public.test_order_no_seq')::text),
  customer_id uuid REFERENCES public.customers(id) ON DELETE SET NULL,
  customer_name text,
  customer_phone text,
  customer_email text,
  collection_type text NOT NULL DEFAULT 'home_collection',
  address text,
  pincode text,
  scheduled_at timestamptz,
  subtotal numeric NOT NULL DEFAULT 0,
  discount numeric NOT NULL DEFAULT 0,
  total numeric NOT NULL DEFAULT 0,
  promo_code text,
  payment_method text NOT NULL DEFAULT 'online',
  payment_status text NOT NULL DEFAULT 'pending',
  status text NOT NULL DEFAULT 'pending',
  notes text,
  paid_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.test_orders TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.test_order_no_seq TO service_role;
ALTER TABLE public.test_orders ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER test_orders_updated BEFORE UPDATE ON public.test_orders FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();
CREATE INDEX test_orders_created_idx ON public.test_orders (created_at DESC);
CREATE INDEX test_orders_status_idx ON public.test_orders (status);

CREATE TABLE public.test_order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.test_orders(id) ON DELETE CASCADE,
  test_id uuid REFERENCES public.lab_tests(id) ON DELETE SET NULL,
  test_name text NOT NULL,
  test_slug text,
  qty integer NOT NULL DEFAULT 1,
  price numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.test_order_items TO service_role;
ALTER TABLE public.test_order_items ENABLE ROW LEVEL SECURITY;
CREATE INDEX test_order_items_order_idx ON public.test_order_items (order_id);

-- ============ ABANDONED CARTS ============
CREATE TABLE public.abandoned_carts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text,
  customer_phone text,
  customer_email text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal numeric NOT NULL DEFAULT 0,
  recovered boolean NOT NULL DEFAULT false,
  source text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.abandoned_carts TO service_role;
ALTER TABLE public.abandoned_carts ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER abandoned_carts_updated BEFORE UPDATE ON public.abandoned_carts FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- ============ PAYMENTS ============
CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES public.test_orders(id) ON DELETE SET NULL,
  order_no text,
  customer_name text,
  customer_phone text,
  provider text NOT NULL DEFAULT 'manual',
  method text,
  reference text,
  amount numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'INR',
  status text NOT NULL DEFAULT 'created',
  paid_at timestamptz,
  raw jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER payments_updated BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- ============ PROMO CODES ============
CREATE TABLE public.promo_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  description text,
  discount_type text NOT NULL DEFAULT 'percent',
  discount_value numeric NOT NULL DEFAULT 0,
  min_order numeric NOT NULL DEFAULT 0,
  max_redemptions integer,
  times_used integer NOT NULL DEFAULT 0,
  starts_at timestamptz,
  ends_at timestamptz,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.promo_codes TO service_role;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER promo_codes_updated BEFORE UPDATE ON public.promo_codes FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- ============ LOYALTY ============
CREATE TABLE public.loyalty_settings (
  id boolean PRIMARY KEY DEFAULT true CHECK (id),
  earn_percent numeric NOT NULL DEFAULT 5,
  point_to_rupee numeric NOT NULL DEFAULT 1,
  max_redeem_percent numeric NOT NULL DEFAULT 20,
  min_order_amount numeric NOT NULL DEFAULT 500,
  expiry_days integer NOT NULL DEFAULT 365,
  max_earn_per_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.loyalty_settings TO service_role;
ALTER TABLE public.loyalty_settings ENABLE ROW LEVEL SECURITY;
INSERT INTO public.loyalty_settings (id) VALUES (true);

CREATE TABLE public.loyalty_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES public.customers(id) ON DELETE CASCADE,
  phone text NOT NULL UNIQUE,
  name text,
  points_balance integer NOT NULL DEFAULT 0,
  lifetime_points integer NOT NULL DEFAULT 0,
  tier text NOT NULL DEFAULT 'Silver',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.loyalty_members TO service_role;
ALTER TABLE public.loyalty_members ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER loyalty_members_updated BEFORE UPDATE ON public.loyalty_members FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE TABLE public.loyalty_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  kind text NOT NULL DEFAULT 'percent',
  value numeric NOT NULL DEFAULT 0,
  audience text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.loyalty_campaigns TO service_role;
ALTER TABLE public.loyalty_campaigns ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER loyalty_campaigns_updated BEFORE UPDATE ON public.loyalty_campaigns FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- ============ ADMIN LOGIN ============
-- sha256('111111')
INSERT INTO public.seo_admins (login_id, password_hash)
VALUES ('8373914073', 'bcb15f821479b4d5772bd0ca866c00ad5f926e3580720659cc80d39c9d09802a')
ON CONFLICT DO NOTHING;