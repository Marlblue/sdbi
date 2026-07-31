-- Run this in the Supabase SQL editor (Project → SQL Editor) once per project.
create table if not exists orders (
  order_id text primary key,
  slug text not null,
  course_title text not null,
  amount integer not null,
  customer_email text not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed')),
  access_token text unique,
  access_expires_at timestamptz,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create index if not exists orders_access_token_idx on orders (access_token);

create table if not exists access_logs (
  id uuid primary key default gen_random_uuid(),
  order_id text not null references orders (order_id),
  accessed_at timestamptz not null default now(),
  ip_address text,
  user_agent text
);

create index if not exists access_logs_order_id_idx on access_logs (order_id);

-- RLS stays enabled with no policies: only the service role key (used
-- server-side in app/lib/supabase.ts) can read/write these tables.
alter table orders enable row level security;
alter table access_logs enable row level security;
