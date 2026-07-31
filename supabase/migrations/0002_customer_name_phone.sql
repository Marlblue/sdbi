-- Run manually, once, in the Supabase SQL Editor for an existing project.
-- Nullable because existing rows predate name/phone collection; the app
-- always sends both for new orders going forward.

alter table orders add column if not exists customer_name text;
alter table orders add column if not exists customer_phone text;
