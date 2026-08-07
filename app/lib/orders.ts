import { getSupabaseAdmin } from './supabase';

export type OrderStatus = 'pending' | 'paid' | 'failed';

export interface Order {
  orderId: string;
  slug: string;
  courseTitle: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: OrderStatus;
  accessToken: string | null;
  accessExpiresAt: string | null;
  driveAccessRevoked: boolean;
  createdAt: string;
  paidAt: string | null;
}

interface OrderRow {
  order_id: string;
  slug: string;
  course_title: string;
  amount: number;
  customer_name: string | null;
  customer_email: string;
  customer_phone: string | null;
  status: OrderStatus;
  access_token: string | null;
  access_expires_at: string | null;
  drive_access_revoked: boolean;
  created_at: string;
  paid_at: string | null;
}

function fromRow(row: OrderRow): Order {
  return {
    orderId: row.order_id,
    slug: row.slug,
    courseTitle: row.course_title,
    amount: row.amount,
    customerName: row.customer_name ?? '',
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone ?? '',
    status: row.status,
    accessToken: row.access_token,
    accessExpiresAt: row.access_expires_at,
    driveAccessRevoked: row.drive_access_revoked,
    createdAt: row.created_at,
    paidAt: row.paid_at,
  };
}

export async function createOrder(input: {
  orderId: string;
  slug: string;
  courseTitle: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('orders').insert({
    order_id: input.orderId,
    slug: input.slug,
    course_title: input.courseTitle,
    amount: input.amount,
    customer_name: input.customerName,
    customer_email: input.customerEmail,
    customer_phone: input.customerPhone,
    status: 'pending',
  });
  if (error) throw new Error(`Gagal menyimpan order: ${error.message}`);
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('orders').update({ status }).eq('order_id', orderId);
  if (error) throw new Error(`Gagal update status order: ${error.message}`);
}

/**
 * Marks an order paid, but only if it isn't already — the `.neq('status', 'paid')`
 * makes this atomic at the DB row level, so two near-simultaneous Midtrans retries
 * can't both flip the order and both trigger the paid-order side effects (email/WhatsApp).
 * Returns true only for the call that actually performed the transition.
 */
export async function markOrderPaid(orderId: string, accessToken: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const paidAt = new Date();
  const accessExpiresAt = new Date(paidAt);
  accessExpiresAt.setFullYear(accessExpiresAt.getFullYear() + 1);

  const { data, error } = await supabase
    .from('orders')
    .update({
      status: 'paid',
      paid_at: paidAt.toISOString(),
      access_token: accessToken,
      access_expires_at: accessExpiresAt.toISOString(),
    })
    .eq('order_id', orderId)
    .neq('status', 'paid')
    .select('order_id');
  if (error) throw new Error(`Gagal menandai order lunas: ${error.message}`);
  return (data?.length ?? 0) > 0;
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('orders').select('*').eq('order_id', orderId).maybeSingle();
  if (error) throw new Error(`Gagal mengambil order: ${error.message}`);
  return data ? fromRow(data as OrderRow) : null;
}

export async function getOrderByAccessToken(token: string): Promise<Order | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('orders').select('*').eq('access_token', token).maybeSingle();
  if (error) throw new Error(`Gagal mengambil order: ${error.message}`);
  return data ? fromRow(data as OrderRow) : null;
}

export function isAccessExpired(order: Order): boolean {
  if (!order.accessExpiresAt) return false;
  return new Date(order.accessExpiresAt).getTime() < Date.now();
}

export async function markDriveAccessRevoked(orderId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from('orders')
    .update({ drive_access_revoked: true })
    .eq('order_id', orderId);
  if (error) throw new Error(`Gagal menandai akses Drive dicabut: ${error.message}`);
}

/** Paid orders whose access window has passed but haven't had Drive access revoked yet. */
export async function getExpiredPaidOrdersPendingRevoke(): Promise<Order[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('status', 'paid')
    .eq('drive_access_revoked', false)
    .not('access_expires_at', 'is', null)
    .lt('access_expires_at', new Date().toISOString());
  if (error) throw new Error(`Gagal mengambil order yang kedaluwarsa: ${error.message}`);
  return (data ?? []).map((row) => fromRow(row as OrderRow));
}

export async function recordFailedGrant(input: {
  orderId: string;
  customerEmail: string;
  driveFileId: string;
  action: 'grant' | 'revoke';
  errorMessage: string;
}): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('failed_grants').insert({
    order_id: input.orderId,
    customer_email: input.customerEmail,
    drive_file_id: input.driveFileId,
    action: input.action,
    error_message: input.errorMessage,
  });
  if (error) throw new Error(`Gagal mencatat failed_grants: ${error.message}`);
}

export async function logAccess(
  orderId: string,
  ipAddress: string | null,
  userAgent: string | null
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('access_logs').insert({
    order_id: orderId,
    ip_address: ipAddress,
    user_agent: userAgent,
  });
  if (error) throw new Error(`Gagal mencatat log akses: ${error.message}`);
}
