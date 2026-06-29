-- ============================================================
-- JND Smart Computers — Database Schema
-- Run this in Supabase SQL Editor (Project > SQL Editor > New query)
-- ============================================================

-- ---------- PRODUCTS ----------
-- Powers /products listing + admin product manager.
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category text not null check (category in (
    'laptop_new', 'laptop_used', 'desktop', 'pc_components',
    'cctv', 'accessory', 'other'
  )),
  brand text,
  description text,
  price numeric(10,2),
  compare_at_price numeric(10,2), -- for "was ₹X, now ₹Y" strike-through
  condition text check (condition in ('new', 'refurbished', 'used')) default 'new',
  stock_quantity integer not null default 0,
  is_published boolean not null default false, -- admin toggles visibility
  images text[] default '{}', -- array of storage URLs
  specs jsonb default '{}', -- flexible: { "ram": "16GB", "cpu": "i5 11th gen" }
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_products_category on products(category);
create index if not exists idx_products_published on products(is_published);

-- ---------- REPAIR ORDERS ----------
-- Created when a customer drops off a device for pick & drop / repair service.
create table if not exists repair_orders (
  id uuid primary key default gen_random_uuid(),
  tracking_code text not null unique, -- short human-friendly code, e.g. JND-7F3K9
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  device_type text not null, -- "Laptop", "Desktop", "CCTV", etc.
  device_brand text,
  device_model text,
  issue_description text not null,
  status text not null default 'received' check (status in (
    'received', 'diagnosing', 'awaiting_approval', 'in_repair',
    'awaiting_parts', 'ready_for_pickup', 'out_for_delivery',
    'completed', 'cancelled'
  )),
  estimated_cost numeric(10,2),
  final_cost numeric(10,2),
  pickup_required boolean default false,
  pickup_address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_repair_orders_tracking_code on repair_orders(tracking_code);
create index if not exists idx_repair_orders_phone on repair_orders(customer_phone);

-- Timeline of status changes — this is what powers the tracking page's
-- "history" view so a customer can see every step, not just current status.
create table if not exists repair_status_updates (
  id uuid primary key default gen_random_uuid(),
  repair_order_id uuid not null references repair_orders(id) on delete cascade,
  status text not null,
  note text, -- e.g. "Screen replacement part ordered, ETA 3 days"
  created_at timestamptz not null default now()
);

create index if not exists idx_status_updates_order on repair_status_updates(repair_order_id);

-- ---------- INQUIRIES ----------
-- General contact / "ask us anything" submissions from the site.
create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  subject text,
  message text not null,
  source_page text, -- which page the inquiry came from
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

create index if not exists idx_inquiries_status on inquiries(status);

-- ---------- QUOTATION REQUESTS ----------
-- Generic price-estimate requests (PC builds, used laptops, CCTV, accessories).
create table if not exists quotation_requests (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  category text not null check (category in (
    'pc_build', 'used_laptop', 'new_laptop', 'cctv', 'accessory', 'other'
  )),
  budget_range text, -- e.g. "30000-50000"
  requirements text not null, -- free text: what they want / use case
  status text not null default 'new' check (status in ('new', 'quoted', 'closed')),
  quoted_amount numeric(10,2),
  created_at timestamptz not null default now()
);

create index if not exists idx_quotations_status on quotation_requests(status);

-- ============================================================
-- Row Level Security
-- Public users can: create repair orders, inquiries, quotation requests,
-- and read products + their own repair order status (via tracking code).
-- Only admins (service role / authenticated admin user) can write to products
-- or read the full inquiry/quotation/order lists.
-- ============================================================

alter table products enable row level security;
alter table repair_orders enable row level security;
alter table repair_status_updates enable row level security;
alter table inquiries enable row level security;
alter table quotation_requests enable row level security;

-- Anyone can view published products
create policy "public can view published products"
  on products for select
  using (is_published = true);

-- Anyone can submit a repair order (the pick & drop intake form)
create policy "public can create repair orders"
  on repair_orders for insert
  with check (true);

-- Lookup by tracking code is done via a server-side route using the service
-- role key (see /src/app/track), so no public select policy is needed here —
-- this keeps customer phone numbers/addresses from being publicly queryable.

create policy "public can create inquiries"
  on inquiries for insert
  with check (true);

create policy "public can create quotation requests"
  on quotation_requests for insert
  with check (true);

-- Admin (authenticated) full access — relies on Supabase auth.
-- Replace 'authenticated' check with a stricter role check if you add
-- multiple staff accounts later.
create policy "admins manage products"
  on products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "admins manage repair orders"
  on repair_orders for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "admins manage status updates"
  on repair_status_updates for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "admins manage inquiries"
  on inquiries for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "admins manage quotations"
  on quotation_requests for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- Helper: generate a short tracking code like JND-7F3K9
-- ============================================================
create or replace function generate_tracking_code()
returns text as $$
declare
  chars text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; -- no 0/O/1/I to avoid confusion
  code text := 'JND-';
begin
  for i in 1..5 loop
    code := code || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  end loop;
  return code;
end;
$$ language plpgsql;
