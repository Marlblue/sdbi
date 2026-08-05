import { Resend } from 'resend';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sekolahdigitalbisnis.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'SDBI E-Course <onboarding@resend.dev>';
const WHATSAPP_SUPPORT_URL = 'https://wa.me/6285211436032';

export async function sendCourseAccessEmail({
  to,
  courseTitle,
  accessToken,
}: {
  to: string;
  courseTitle: string;
  accessToken: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY belum diset — email akses tidak terkirim.');
    return;
  }

  const accessUrl = `${SITE_URL}/akses/${accessToken}`;
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Akses Kelas Anda: ${courseTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #1f2937;">
        <h2 style="color:#0A1E3F;">Pembayaran Dikonfirmasi</h2>
        <p>Terima kasih telah membeli kelas <strong>${courseTitle}</strong> di Sekolah Digital Bisnis Indonesia (SDBI).</p>
        <p>Klik tombol di bawah untuk mengakses materi kelas Anda:</p>
        <p style="text-align:center; margin: 32px 0;">
          <a href="${accessUrl}" style="background:#F5821F; color:#fff; text-decoration:none; padding:14px 28px; border-radius:8px; font-weight:bold; display:inline-block;">
            Akses Kelas Sekarang
          </a>
        </p>
        <p style="font-size:12px; color:#6B7280;">Jika tombol tidak berfungsi, salin tautan berikut ke browser Anda:<br />${accessUrl}</p>
        <hr style="border:none; border-top:1px solid #eee; margin:24px 0;" />
        <p style="font-size:13px; color:#6B7280;">Ada kendala mengakses kelas? Hubungi kami via WhatsApp: <a href="${WHATSAPP_SUPPORT_URL}">${WHATSAPP_SUPPORT_URL}</a></p>
      </div>
    `,
  });

  if (error) {
    console.error('Gagal mengirim email akses via Resend:', error);
  }
}

/**
 * Best-effort admin alert when a Drive grant/revoke call fails. The
 * authoritative record is always the `failed_grants` table (see
 * app/lib/orders.ts) — this email is just a faster heads-up and is silently
 * skipped if ADMIN_NOTIFICATION_EMAIL isn't configured.
 */
export async function sendDriveGrantFailureAlert({
  orderId,
  customerEmail,
  courseTitle,
  action,
  errorMessage,
}: {
  orderId: string;
  customerEmail: string;
  courseTitle: string;
  action: 'grant' | 'revoke';
  errorMessage: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (!apiKey || !adminEmail) return;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: adminEmail,
    subject: `[Aksi Manual Diperlukan] Gagal ${action === 'grant' ? 'memberi' : 'mencabut'} akses Drive — ${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #1f2937;">
        <h2 style="color:#0A1E3F;">Gagal ${action === 'grant' ? 'Memberi' : 'Mencabut'} Akses Google Drive</h2>
        <p>Order: <strong>${orderId}</strong></p>
        <p>Kelas: <strong>${courseTitle}</strong></p>
        <p>Email pembeli: <strong>${customerEmail}</strong></p>
        <p>Error: <code>${errorMessage}</code></p>
        <p style="font-size:13px; color:#6B7280;">Detail tercatat di tabel <code>failed_grants</code> pada Supabase untuk diproses manual.</p>
      </div>
    `,
  });

  if (error) {
    console.error('Gagal mengirim email alert admin via Resend:', error);
  }
}
