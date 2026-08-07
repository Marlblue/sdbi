import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { getOrderById, updateOrderStatus, markOrderPaid, recordFailedGrant } from '../../../lib/orders';
import { sendCourseAccessEmail, sendDriveGrantFailureAlert } from '../../../lib/email';
import { getCourseBySlug } from '../../../lib/courses';
import { grantDriveAccess } from '../../../lib/googleDrive';
import { sendFonnteMessage } from '../../../lib/fonnte';

interface MidtransNotification {
  order_id?: unknown;
  status_code?: unknown;
  gross_amount?: unknown;
  signature_key?: unknown;
  transaction_status?: unknown;
  fraud_status?: unknown;
}

function isValidSignature(payload: MidtransNotification, serverKey: string): boolean {
  const { order_id, status_code, gross_amount, signature_key } = payload;
  if (
    typeof order_id !== 'string' ||
    typeof status_code !== 'string' ||
    typeof gross_amount !== 'string' ||
    typeof signature_key !== 'string' ||
    !/^[0-9a-f]+$/i.test(signature_key)
  ) {
    return false;
  }

  const expected = crypto
    .createHash('sha512')
    .update(order_id + status_code + gross_amount + serverKey)
    .digest('hex');

  const expectedBuf = Buffer.from(expected, 'hex');
  const actualBuf = Buffer.from(signature_key, 'hex');
  if (expectedBuf.length !== actualBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, actualBuf);
}

// Midtrans server-to-server webhook. No cookies/session involved — trust is
// established purely via the signature check below.
export async function POST(request: NextRequest) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) {
    console.error('Midtrans webhook: MIDTRANS_SERVER_KEY belum dikonfigurasi.');
    return NextResponse.json({ received: true }, { status: 200 });
  }

  let payload: MidtransNotification;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
  }

  if (!isValidSignature(payload, serverKey)) {
    console.warn('Midtrans webhook: signature tidak valid, notifikasi ditolak.', payload.order_id);
    return NextResponse.json({ error: 'Signature tidak valid.' }, { status: 401 });
  }

  const orderId = payload.order_id as string;
  const transactionStatus = typeof payload.transaction_status === 'string' ? payload.transaction_status : '';
  const fraudStatus = typeof payload.fraud_status === 'string' ? payload.fraud_status : '';

  try {
    const order = await getOrderById(orderId);
    if (!order) {
      console.error(`Midtrans webhook: order ${orderId} tidak ditemukan di storage.`);
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // Midtrans may resend the same notification; don't re-mark paid / re-send email.
    if (order.status === 'paid') {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const isPaid = transactionStatus === 'settlement' || (transactionStatus === 'capture' && fraudStatus === 'accept');
    const isFailed =
      transactionStatus === 'deny' ||
      transactionStatus === 'cancel' ||
      transactionStatus === 'expire' ||
      (transactionStatus === 'capture' && fraudStatus === 'deny');

    if (isPaid) {
      const accessToken = crypto.randomBytes(24).toString('hex');
      const didTransition = await markOrderPaid(orderId, accessToken);
      if (!didTransition) {
        // Another concurrent notification already flipped this order to paid
        // (Midtrans retries the same event) — side effects already ran once.
        return NextResponse.json({ received: true }, { status: 200 });
      }
      await sendCourseAccessEmail({
        to: order.customerEmail,
        courseTitle: order.courseTitle,
        accessToken,
      });

      sendFonnteMessage(
        `*Order E-Course Lunas*\n\n` +
          `Kelas: ${order.courseTitle}\n` +
          `Pembeli: ${order.customerName || '-'}\n` +
          `Email: ${order.customerEmail}\n` +
          `WhatsApp: ${order.customerPhone || '-'}\n` +
          `Order ID: ${orderId}\n` +
          `Nominal: Rp ${order.amount.toLocaleString('id-ID')}`
      ).catch((err) => console.error(`Gagal mengirim notifikasi Fonnte untuk order ${orderId}:`, err));

      // Drive access is best-effort here: a failure must not turn into a
      // non-200 response, or Midtrans will keep retrying this notification
      // (and the buyer already has status 'paid' + their access-link email).
      // Failures are logged, persisted to `failed_grants` for manual
      // follow-up, and best-effort alerted to the admin inbox.
      const course = getCourseBySlug(order.slug);
      if (course) {
        try {
          await grantDriveAccess(course.driveFileId, order.customerEmail);
        } catch (grantErr) {
          const errorMessage = grantErr instanceof Error ? grantErr.message : String(grantErr);
          console.error(`Gagal memberi akses Drive untuk order ${orderId}:`, grantErr);
          await recordFailedGrant({
            orderId,
            customerEmail: order.customerEmail,
            driveFileId: course.driveFileId,
            action: 'grant',
            errorMessage,
          }).catch((logErr) => console.error('Gagal mencatat failed_grants:', logErr));
          await sendDriveGrantFailureAlert({
            orderId,
            customerEmail: order.customerEmail,
            courseTitle: order.courseTitle,
            action: 'grant',
            errorMessage,
          }).catch((alertErr) => console.error('Gagal mengirim alert admin:', alertErr));
        }
      } else {
        console.error(`Midtrans webhook: course untuk slug ${order.slug} tidak ditemukan, akses Drive dilewati.`);
      }
    } else if (isFailed) {
      await updateOrderStatus(orderId, 'failed');
    }
    // Otherwise (pending / capture+challenge) — leave status as "pending".
  } catch (err) {
    console.error('Midtrans webhook processing error:', err);
  }

  // Always 200 on our own errors so Midtrans doesn't hammer retries; the
  // error above is logged for manual follow-up.
  return NextResponse.json({ received: true }, { status: 200 });
}
