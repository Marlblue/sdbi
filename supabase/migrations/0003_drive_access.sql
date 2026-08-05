-- Run manually, once, in the Supabase SQL Editor for an existing project.
-- Tracks whether the per-email Google Drive grant for an order has been
-- revoked yet (see app/api/cron/revoke-expired/route.ts), and records grant
-- / revoke calls to the Drive API that failed so they can be retried manually.

alter table orders add column if not exists drive_access_revoked boolean not null default false;

create index if not exists orders_expiry_revoke_idx
  on orders (access_expires_at)
  where status = 'paid' and drive_access_revoked = false;

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

alter table failed_grants enable row level security;
