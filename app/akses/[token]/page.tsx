import Link from 'next/link';
import { headers } from 'next/headers';
import StickyHeader from '../../components/StickyHeader';
import Footer from '../../components/Footer';
import { getOrderByAccessToken, isAccessExpired, logAccess } from '../../lib/orders';
import { getCourseBySlug } from '../../lib/courses';

export const dynamic = 'force-dynamic';

const WHATSAPP_SUPPORT_HREF = `https://wa.me/6285211436032?text=${encodeURIComponent(
  'Halo, saya butuh bantuan terkait akses kelas e-course saya.'
)}`;

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  if (local.length <= 2) return `${local[0] ?? ''}**@${domain}`;
  return `${local.slice(0, 2)}${'*'.repeat(Math.max(local.length - 2, 2))}@${domain}`;
}

export default async function AksesPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  let course = null;
  let isExpired = false;
  let maskedEmail: string | null = null;

  try {
    const order = await getOrderByAccessToken(token);
    if (order && order.status === 'paid') {
      maskedEmail = maskEmail(order.customerEmail);
      isExpired = isAccessExpired(order);
      if (!isExpired) {
        course = getCourseBySlug(order.slug) ?? null;
      }

      // Fire-and-forget: an access-log failure shouldn't break the page for the buyer.
      try {
        const headersList = await headers();
        const ipAddress = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;
        const userAgent = headersList.get('user-agent');
        await logAccess(order.orderId, ipAddress, userAgent);
      } catch (logErr) {
        console.error('Gagal mencatat log akses:', logErr);
      }
    }
  } catch (err) {
    console.error('Gagal mengambil data akses:', err);
  }

  return (
    <>
      <StickyHeader />
      <main className="bg-white min-h-[70vh]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          {course ? (
            <>
              <span className="text-6xl mb-6 block">{course.icon}</span>
              <h1 className="text-2xl md:text-3xl font-bold text-[#0A1E3F] mb-4">{course.title}</h1>
              <p className="text-[#6B7280] mb-4">
                Terima kasih telah membeli kelas ini. Klik tombol di bawah untuk mulai belajar.
              </p>
              {maskedEmail && (
                <p className="text-xs text-[#6B7280] mb-6">
                  Akses ini terdaftar untuk: <strong>{maskedEmail}</strong>. Materi untuk penggunaan
                  pribadi, mohon tidak disebarluaskan.
                </p>
              )}
              <a
                href={course.videoAccessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#F5821F] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#F5821F]/90 hover:-translate-y-0.5 transition-all shadow-md"
              >
                Akses Materi Kelas
              </a>
            </>
          ) : isExpired ? (
            <>
              <h1 className="text-2xl md:text-3xl font-bold text-[#0A1E3F] mb-4">Akses Anda Sudah Kedaluwarsa</h1>
              <p className="text-[#6B7280] mb-8">
                Akses kelas ini sudah melewati batas waktu berlaku. Hubungi admin kami untuk bantuan
                lebih lanjut.
              </p>
              <Link
                href={WHATSAPP_SUPPORT_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#0A1E3F] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0A1E3F]/90 transition-all shadow-md"
              >
                Hubungi Admin via WhatsApp
              </Link>
            </>
          ) : (
            <>
              <h1 className="text-2xl md:text-3xl font-bold text-[#0A1E3F] mb-4">Link Akses Tidak Ditemukan</h1>
              <p className="text-[#6B7280] mb-8">
                Kami tidak dapat menemukan akses kelas untuk tautan ini, atau pembayaran Anda belum
                kami konfirmasi. Jika Anda merasa sudah membayar, mohon tunggu beberapa menit atau
                hubungi tim kami untuk dibantu.
              </p>
              <Link
                href={WHATSAPP_SUPPORT_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#0A1E3F] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0A1E3F]/90 transition-all shadow-md"
              >
                Hubungi Admin via WhatsApp
              </Link>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
