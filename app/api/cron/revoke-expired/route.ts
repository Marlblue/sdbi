import { NextRequest, NextResponse } from 'next/server';
import { getCourseBySlug } from '../../../lib/courses';
import { getExpiredPaidOrdersPendingRevoke, markDriveAccessRevoked, recordFailedGrant } from '../../../lib/orders';
import { revokeDriveAccess } from '../../../lib/googleDrive';
import { sendDriveGrantFailureAlert } from '../../../lib/email';

export const dynamic = 'force-dynamic';

// Scheduled daily by Vercel Cron (see vercel.json). When CRON_SECRET is set
// as a project env var, Vercel automatically sends it as a Bearer token on
// cron-triggered requests, so this also rejects manual/unauthenticated hits.
export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  const orders = await getExpiredPaidOrdersPendingRevoke();

  let revoked = 0;
  let failed = 0;

  for (const order of orders) {
    const course = getCourseBySlug(order.slug);
    if (!course) {
      console.error(`Cron revoke: course untuk slug ${order.slug} tidak ditemukan (order ${order.orderId}).`);
      continue;
    }

    try {
      await revokeDriveAccess(course.driveFileId, order.customerEmail);
      await markDriveAccessRevoked(order.orderId);
      revoked++;
    } catch (err) {
      failed++;
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error(`Cron revoke: gagal mencabut akses order ${order.orderId}:`, err);
      await recordFailedGrant({
        orderId: order.orderId,
        customerEmail: order.customerEmail,
        driveFileId: course.driveFileId,
        action: 'revoke',
        errorMessage,
      }).catch((logErr) => console.error('Gagal mencatat failed_grants:', logErr));
      await sendDriveGrantFailureAlert({
        orderId: order.orderId,
        customerEmail: order.customerEmail,
        courseTitle: order.courseTitle,
        action: 'revoke',
        errorMessage,
      }).catch((alertErr) => console.error('Gagal mengirim alert admin:', alertErr));
    }
  }

  return NextResponse.json({ processed: orders.length, revoked, failed });
}
