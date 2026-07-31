-- Run manually, once, in the Supabase SQL Editor for an existing project.
-- schema.sql uses `create table if not exists`, so it won't retroactively
-- add columns to an `orders` table that already exists.

alter table orders add column if not exists access_expires_at timestamptz;

create table if not exists access_logs (
  id uuid primary key default gen_random_uuid(),
  order_id text not null references orders (order_id),
  accessed_at timestamptz not null default now(),
  ip_address text,
  user_agent text
);

create index if not exists access_logs_order_id_idx on access_logs (order_id);

alter table access_logs enable row level security;
