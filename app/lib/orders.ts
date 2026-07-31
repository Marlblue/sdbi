import { getSupabaseAdmin } from './supabase';

export type OrderStatus = 'pending' | 'paid' | 'failed';

export interface Order {
  orderId: string;
  slug: string;
  courseTitle: string;
  amount: number;
  customerEmail: string;
  status: OrderStatus;
  accessToken: string | null;
  accessExpiresAt: string | null;
  createdAt: string;
  paidAt: string | null;
}

interface OrderRow {
  order_id: string;
  slug: string;
  course_title: string;
  amount: number;
  customer_email: string;
  status: OrderStatus;
  access_token: string | null;
  access_expires_at: string | null;
  created_at: string;
  paid_at: string | null;
}

function fromRow(row: OrderRow): Order {
  return {
    orderId: row.order_id,
    slug: row.slug,
    courseTitle: row.course_title,
    amount: row.amount,
    customerEmail: row.customer_email,
    status: row.status,
    accessToken: row.access_token,
    accessExpiresAt: row.access_expires_at,
    createdAt: row.created_at,
    paidAt: row.paid_at,
  };
}

export async function createOrder(input: {
  orderId: string;
  slug: string;
  courseTitle: string;
  amount: number;
  customerEmail: string;
}): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('orders').insert({
    order_id: input.orderId,
    slug: input.slug,
    course_title: input.courseTitle,
    amount: input.amount,
    customer_email: input.customerEmail,
    status: 'pending',
  });
  if (error) throw new Error(`Gagal menyimpan order: ${error.message}`);
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('orders').update({ status }).eq('order_id', orderId);
  if (error) throw new Error(`Gagal update status order: ${error.message}`);
}

export async function markOrderPaid(orderId: string, accessToken: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const paidAt = new Date();
  const accessExpiresAt = new Date(paidAt);
  accessExpiresAt.setFullYear(accessExpiresAt.getFullYear() + 1);

  const { error } = await supabase
    .from('orders')
    .update({
      status: 'paid',
      paid_at: paidAt.toISOString(),
      access_token: accessToken,
      access_expires_at: accessExpiresAt.toISOString(),
    })
    .eq('order_id', orderId);
  if (error) throw new Error(`Gagal menandai order lunas: ${error.message}`);
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
