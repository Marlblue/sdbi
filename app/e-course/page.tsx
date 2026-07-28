import Link from "next/link";
import type { Metadata } from "next";
import StickyHeader from "../components/StickyHeader";
import Footer from "../components/Footer";
import AnimateOnScroll from "../components/AnimateOnScroll";
import CourseCatalog from "../components/CourseCatalog";
import { getAllCourses } from "../lib/courses";

export const metadata: Metadata = {
  title: "Katalog E-Course | Sekolah Digital Bisnis Indonesia (SDBI)",
  description:
    "Kuasai digital marketing dan tingkatkan skala bisnis Anda lewat kurikulum e-course terstruktur dari SDBI: Meta Ads, TikTok, Shopee, Copywriting, Google Ads, hingga YouTube Marketing.",
  openGraph: {
    title: "Katalog E-Course | Sekolah Digital Bisnis Indonesia (SDBI)",
    description:
      "Kurikulum e-course terstruktur untuk UMKM dan pemula: Meta Ads, TikTok, Shopee, Copywriting, Google Ads, dan YouTube Marketing.",
    url: "https://sekolahdigitalbisnis.com/e-course",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Katalog E-Course | Sekolah Digital Bisnis Indonesia (SDBI)",
    description:
      "Kurikulum e-course terstruktur untuk UMKM dan pemula: Meta Ads, TikTok, Shopee, Copywriting, Google Ads, dan YouTube Marketing.",
  },
};

export default function ECoursePage() {
  const courses = getAllCourses();

  return (
    <>
      <StickyHeader />
      <main className="bg-white">
        {/* Hero */}
        <div className="bg-[#0A1E3F] pt-16 pb-20 md:pt-20 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-xs text-gray-300 mb-8 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-[#F5821F] transition-colors">
                Beranda
              </Link>
              <span>/</span>
              <span className="text-white font-medium">E-Course</span>
            </nav>

            <AnimateOnScroll animation="fade-in-up" duration={700} className="text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-[#F5821F]/15 text-[#F5821F] text-xs font-semibold mb-5">
                Katalog E-Course 2026
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Kuasai Digital Marketing &amp; Tingkatkan{" "}
                <span className="text-[#F5821F]">Skala Bisnis Anda</span>
              </h1>
              <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base mb-8">
                Kurikulum terstruktur yang dirancang khusus untuk UMKM dan pemula di Indonesia. Belajar
                langsung dari praktisi berpengalaman.
              </p>

              <div className="flex flex-wrap justify-center gap-6 text-white text-sm font-medium">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#F5821F]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Sertifikat Resmi
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#F5821F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm0 0a4 4 0 014 4v2H5v-2a4 4 0 014-4h6z" />
                  </svg>
                  Komunitas Aktif
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#F5821F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Update Selamanya
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Catalog Grid */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CourseCatalog courses={courses} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0A1E3F] rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
              <div className="relative z-10 flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Masih Bingung Pilih Kelas?</h2>
                <p className="text-gray-300 mb-6 max-w-lg mx-auto md:mx-0 text-sm md:text-base">
                  Konsultasikan kebutuhan bisnis Anda dengan tim kurikulum kami secara gratis.
                </p>
                <Link
                  href="https://wa.me/6285211436032"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#F5821F] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#F5821F]/90 hover:-translate-y-0.5 transition-all duration-200 text-sm shadow-md"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Hubungi Admin via WhatsApp
                </Link>
              </div>

              <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5821F] opacity-10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl -ml-24 -mb-24" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
