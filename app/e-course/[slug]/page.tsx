import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import StickyHeader from "../../components/StickyHeader";
import Footer from "../../components/Footer";
import AnimateOnScroll from "../../components/AnimateOnScroll";
import BuyCourseButton from "../../components/BuyCourseButton";
import {
  getAllCourses,
  getCourseBySlug,
  getRelatedCourses,
  formatRupiah,
  discountPercent,
} from "../../lib/courses";

export async function generateStaticParams() {
  return getAllCourses().map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};

  return {
    title: `${course.title} | E-Course SDBI`,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      url: `https://sekolahdigitalbisnis.com/e-course/${course.slug}`,
      type: "website",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description: course.description,
    },
  };
}

export default async function CourseDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const { slug } = await params;
  const { status } = await searchParams;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const related = getRelatedCourses(slug, 3);
  const totalVideos = course.modules.reduce((sum, m) => sum + m.videoCount, 0);
  const discount = discountPercent(course.price, course.originalPrice);
  const checkoutEnabled = process.env.NEXT_PUBLIC_CHECKOUT_ENABLED === "true";
  const whatsappHref = `https://wa.me/6285211436032?text=${encodeURIComponent(
    `Halo, saya tertarik dengan kelas "${course.title}"`
  )}`;

  const statusBanner =
    status === "berhasil" || status === "selesai"
      ? "Terima kasih! Kami sedang memverifikasi pembayaran Anda. Cek email Anda dalam beberapa menit untuk link akses kelas."
      : status === "pending"
      ? "Pembayaran Anda sedang diproses. Kami akan mengirim link akses kelas ke email Anda setelah pembayaran dikonfirmasi."
      : null;

  return (
    <>
      <StickyHeader />
      <main className="bg-white">
        {/* Breadcrumb */}
        <div className="bg-[#0A1E3F] pt-10 pb-8 md:pt-12 md:pb-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-xs text-gray-300 mb-6 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-[#F5821F] transition-colors">
                Beranda
              </Link>
              <span>/</span>
              <Link href="/e-course" className="hover:text-[#F5821F] transition-colors">
                E-Course
              </Link>
              <span>/</span>
              <span className="text-white font-medium line-clamp-1">{course.title}</span>
            </nav>
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-snug max-w-3xl">
              {course.title}
            </h1>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          {statusBanner && (
            <div className="mb-8 bg-[#0A1E3F]/5 border border-[#0A1E3F]/10 text-[#0A1E3F] text-sm font-medium rounded-2xl px-6 py-4 text-center">
              {statusBanner}
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column */}
            <div className="lg:col-span-7">
              {/* Preview */}
              <div
                className={`relative aspect-video rounded-2xl overflow-hidden shadow-xl mb-10 flex items-center justify-center bg-gradient-to-br ${course.gradient}`}
              >
                <span className="text-8xl opacity-90">{course.icon}</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-[#F5821F] text-white rounded-full flex items-center justify-center shadow-xl">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-[#0A1E3F]/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Cuplikan Preview Kelas
                </div>
              </div>

              {/* Mentor */}
              <section className="mb-10">
                <div className="bg-gray-50 border-l-4 border-[#F5821F] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 border border-gray-100">
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl bg-[#0A1E3F] rotate-3 flex items-center justify-center text-3xl font-bold text-white shadow-md">
                      {course.mentor
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-[#F5821F] text-white p-1 rounded-lg">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L12 14.27l-4.77 2.44.91-5.32-3.87-3.77 5.34-.78z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <span className="text-[10px] font-bold text-[#F5821F] uppercase tracking-[0.2em] mb-2 block">
                      Mentor Utama
                    </span>
                    <h4 className="font-bold text-[#0A1E3F] text-2xl mb-1">{course.mentor}</h4>
                    <p className="text-[#6B7280] font-semibold text-sm mb-3">{course.mentorTitle}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-[#6B7280] bg-white px-3 py-1.5 rounded-full border border-gray-100">
                        <svg className="w-4 h-4 text-[#F5821F]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        Praktisi Berpengalaman
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-medium text-[#6B7280] bg-white px-3 py-1.5 rounded-full border border-gray-100">
                        <svg className="w-4 h-4 text-[#F5821F]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm0 0a4 4 0 014 4v2H5v-2a4 4 0 014-4h6z" />
                        </svg>
                        {totalVideos}+ Video Pembelajaran
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* About */}
              <section>
                <h2 className="text-2xl font-bold text-[#0A1E3F] mb-4">Tentang Kelas Ini</h2>
                <p className="text-[#6B7280] leading-relaxed text-justify">{course.description}</p>
              </section>
            </div>

            {/* Right Column: Sticky Purchase Card */}
            <div className="lg:col-span-5">
              <div id="beli" className="lg:sticky lg:top-28 bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="mb-6">
                  <span className="text-sm font-bold text-gray-400 line-through">
                    {formatRupiah(course.originalPrice)}
                  </span>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h3 className="text-4xl font-extrabold text-[#0A1E3F]">{formatRupiah(course.price)}</h3>
                    <span className="text-[#F5821F] font-bold text-sm bg-[#F5821F]/10 px-2 py-1 rounded">
                      DISKON {discount}%
                    </span>
                  </div>
                </div>

                {checkoutEnabled ? (
                  <div className="mb-6">
                    <BuyCourseButton
                      slug={course.slug}
                      className="block w-full text-center bg-[#F5821F] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#F5821F]/90 hover:-translate-y-0.5 transition-all shadow-md"
                    />
                  </div>
                ) : (
                  <Link
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-[#F5821F] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#F5821F]/90 hover:-translate-y-0.5 transition-all mb-6 shadow-md"
                  >
                    Beli Sekarang
                  </Link>
                )}

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm font-medium text-[#6B7280]">
                    <svg className="w-5 h-5 text-[#0A1E3F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {totalVideos}+ Video Kualitas HD
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-[#6B7280]">
                    <svg className="w-5 h-5 text-[#0A1E3F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Total Durasi {course.durationHours} Jam
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-[#6B7280]">
                    <svg className="w-5 h-5 text-[#0A1E3F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Tingkat: {course.level}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-[#6B7280]">
                    <svg className="w-5 h-5 text-[#0A1E3F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Update Terbaru: {course.updated}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-[#6B7280]">
                    <svg className="w-5 h-5 text-[#0A1E3F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Sertifikat Kelulusan
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <p className="text-center text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                    Pembayaran aman via transfer bank &amp; e-wallet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What You Will Learn */}
        <section className="py-16 md:py-20 bg-[#0A1E3F]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-white">
              Apa yang Akan Anda Pelajari?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {course.learnPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-[#F5821F] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.94 14.5l-4.24-4.24 1.41-1.41 2.83 2.83 6.36-6.36 1.41 1.41-7.77 7.77z" />
                  </svg>
                  <p className="font-medium text-gray-200">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section className="py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1E3F] mb-3">Isi Materi Kelas</h2>
              <p className="text-[#6B7280]">Kurikulum komprehensif yang disusun secara sistematis.</p>
            </div>
            <div className="space-y-4">
              {course.modules.map((module, i) => (
                <details
                  key={i}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden"
                  open={i === 0}
                >
                  <summary className="p-6 flex items-center justify-between cursor-pointer list-none">
                    <div className="flex items-center gap-4">
                      <span className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center font-bold text-[#0A1E3F]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4 className="font-bold text-[#0A1E3F]">{module.title}</h4>
                        <p className="text-xs text-[#6B7280]">
                          {module.videoCount} Video &middot; {module.duration}
                        </p>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-[#6B7280] transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 pl-20 text-sm text-[#6B7280]">
                    Materi disampaikan dalam {module.videoCount} video terstruktur dengan studi kasus praktis
                    yang bisa langsung diterapkan pada bisnis Anda.
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1E3F] mb-4">Apa Kata Mereka?</h2>
              <div className="flex justify-center gap-1 text-[#F5821F]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {course.testimonials.map((testimonial, i) => (
                <AnimateOnScroll key={i} animation="fade-in-up" delay={i * 100} duration={600}>
                  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
                    <div className="flex gap-1 text-[#F5821F] mb-4">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <svg key={j} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-[#6B7280] italic mb-6 flex-grow">&quot;{testimonial.quote}&quot;</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#0A1E3F] flex items-center justify-center text-white font-bold flex-shrink-0">
                        {testimonial.name[0]}
                      </div>
                      <div>
                        <h6 className="font-bold text-[#0A1E3F]">{testimonial.name}</h6>
                        <p className="text-xs text-[#6B7280]">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0A1E3F] rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-3 relative z-10">
                Siap Bertumbuh Bersama SDBI?
              </h3>
              <p className="text-gray-300 mb-8 max-w-lg mx-auto relative z-10">
                Amankan kelas {course.title} sekarang dan mulai terapkan strateginya untuk bisnis Anda.
              </p>
              {checkoutEnabled ? (
                <Link
                  href="#beli"
                  className="relative z-10 inline-block bg-[#F5821F] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#F5821F]/90 transition-all duration-300 text-sm shadow-sm"
                >
                  Beli Kelas Sekarang
                </Link>
              ) : (
                <Link
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 inline-block bg-[#F5821F] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#F5821F]/90 transition-all duration-300 text-sm shadow-sm"
                >
                  Beli Kelas Sekarang
                </Link>
              )}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5821F] opacity-10 rounded-full blur-3xl -mr-32 -mt-32" />
            </div>
          </div>
        </section>

        {/* Related courses */}
        {related.length > 0 && (
          <section className="pb-16 md:pb-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-[#0A1E3F] mb-8">
                Kelas <span className="text-[#F5821F]">Terkait</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map((relatedCourse) => (
                  <Link key={relatedCourse.slug} href={`/e-course/${relatedCourse.slug}`} className="group block">
                    <div
                      className={`relative w-full h-40 rounded-xl overflow-hidden mb-3 flex items-center justify-center bg-gradient-to-br ${relatedCourse.gradient}`}
                    >
                      <span className="text-5xl">{relatedCourse.icon}</span>
                    </div>
                    <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-1">
                      {relatedCourse.mentor} &middot; {relatedCourse.durationHours} Jam
                    </p>
                    <h3 className="font-bold text-sm text-[#0A1E3F] leading-snug group-hover:text-[#F5821F] transition-colors line-clamp-2">
                      {relatedCourse.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
