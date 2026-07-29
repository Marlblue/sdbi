import Link from 'next/link';
import StickyHeader from '../../components/StickyHeader';
import Footer from '../../components/Footer';
import { getOrderByAccessToken } from '../../lib/orders';
import { getCourseBySlug } from '../../lib/courses';

export const dynamic = 'force-dynamic';

const WHATSAPP_SUPPORT_HREF = `https://wa.me/6285211436032?text=${encodeURIComponent(
  'Halo, saya butuh bantuan terkait akses kelas e-course saya.'
)}`;

export default async function AksesPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  let course = null;
  try {
    const order = await getOrderByAccessToken(token);
    if (order && order.status === 'paid') {
      course = getCourseBySlug(order.slug) ?? null;
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
              <p className="text-[#6B7280] mb-8">
                Terima kasih telah membeli kelas ini. Klik tombol di bawah untuk mulai belajar.
              </p>
              <a
                href={course.videoAccessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#F5821F] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#F5821F]/90 hover:-translate-y-0.5 transition-all shadow-md"
              >
                Akses Materi Kelas
              </a>
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
