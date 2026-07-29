-- Run this in the Supabase SQL editor (Project → SQL Editor) once per project.
create table if not exists orders (
  order_id text primary key,
  slug text not null,
  course_title text not null,
  amount integer not null,
  customer_email text not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed')),
  access_token text unique,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create index if not exists orders_access_token_idx on orders (access_token);

-- RLS stays enabled with no policies: only the service role key (used
-- server-side in app/lib/supabase.ts) can read/write this table.
alter table orders enable row level security;
