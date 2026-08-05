-- Run this in the Supabase SQL editor (Project → SQL Editor) once per project.
create table if not exists orders (
  order_id text primary key,
  slug text not null,
  course_title text not null,
  amount integer not null,
  customer_name text,
  customer_email text not null,
  customer_phone text,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed')),
  access_token text unique,
  access_expires_at timestamptz,
  drive_access_revoked boolean not null default false,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create index if not exists orders_access_token_idx on orders (access_token);
create index if not exists orders_expiry_revoke_idx
  on orders (access_expires_at)
  where status = 'paid' and drive_access_revoked = false;

create table if not exists access_logs (
  id uuid primary key default gen_random_uuid(),
  order_id text not null references orders (order_id),
  accessed_at timestamptz not null default now(),
  ip_address text,
  user_agent text
);

create index if not exists access_logs_order_id_idx on access_logs (order_id);

create table if not exists failed_grants (
  id uuid primary key default gen_random_uuid(),
  order_id text not null references orders (order_id),
  customer_email text not null,
  drive_file_id text not null,
  action text not null check (action in ('grant', 'revoke')),
  error_message text,
  resolved boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists failed_grants_order_id_idx on failed_grants (order_id);
create index if not exists failed_grants_unresolved_idx on failed_grants (resolved) where resolved = false;

-- RLS stays enabled with no policies: only the service role key (used
-- server-side in app/lib/supabase.ts) can read/write these tables.
alter table orders enable row level security;
alter table access_logs enable row level security;
alter table failed_grants enable row level security;
