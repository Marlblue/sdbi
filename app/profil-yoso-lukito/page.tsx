import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import StickyHeader from "../components/StickyHeader";
import Footer from "../components/Footer";
import AnimateOnScroll from "../components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Yoso Lukito - Founder & CEO SDBI | Profil Lengkap",
  description:
    "Profil lengkap Coach Yoso Lukito, Google Certified Professional & Founder Sekolah Digital Bisnis Indonesia (SDBI). 18 tahun berkarir di Telkomsel, LG Electronics & Panasonic.",
  openGraph: {
    title: "Yoso Lukito - Founder & CEO SDBI",
    description:
      "Profil lengkap Coach Yoso Lukito, Google Certified Professional & Founder Sekolah Digital Bisnis Indonesia (SDBI).",
    url: "https://sekolahdigitalbisnis.com/profil-yoso-lukito",
    images: [{ url: "/images-founder-profile/coach-yoso-lukito.webp", width: 1200, height: 630 }],
    type: "profile",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yoso Lukito - Founder & CEO SDBI",
    description:
      "Profil lengkap Coach Yoso Lukito, Google Certified Professional & Founder Sekolah Digital Bisnis Indonesia (SDBI).",
    images: ["/images-founder-profile/coach-yoso-lukito.webp"],
  },
};

const pendidikan = [
  { bold: "Google Certified", text: "" },
  { bold: "BNSP", text: "Certified Digital Marketing Profesional (CDMP)" },
  { bold: "BNSP", text: "Certified SEO Specialist Profesional (CSSP)" },
  { bold: "BNSP", text: "Certified Social Media Specialist Profesional (CSMP)" },
  { bold: "BNSP", text: "Certified Media Content Specialist Profesional (CMSP)" },
  { bold: "BNSP", text: "Certified Instructur Training Profesional (CITP)" },
  {
    bold: "2001",
    text: "LGE Changwoon University, South Korea — Six Sigma Innovation & Manufacturing Hope",
  },
  { bold: "2003", text: "Six Sigma Black Belt Certified" },
  {
    bold: "2013",
    text: "Mendapatkan Google Certified - Web Analytics Official Certificate No. BD2013AN301000036",
  },
  {
    bold: "2013 – 2016",
    text: "Menghasilkan 7 (tujuh) Digital Innovation di Telkomsel Innovation Award bidang Digital Business Process, Revenue Process & Digital Supply Chain",
  },
];

const praktisiBisnis = [
  { role: "FOUNDER", text: "Sekolah Digital Bisnis Indonesia (2019 - Now, 10.000+ Alumni)" },
  { role: "CO-FOUNDER", text: "PT. GIZI INDONESIA (Cosmetics Manufacture) (2021 - 2023)" },
  { role: "Executive Director", text: "FROZZNET Indonesia (2021)" },
  { role: "Executive Director", text: "NAHLA Cosmetics (2021 - 2023)" },
  { role: "Head of BIZ Division", text: "GREATSEL Persiapan Masa Pensiun PT. TELKOMSEL (2021 - Now)" },
  { role: "Dewan Penasehat Bisnis", text: "RUMASYO Community (25.000 Member, 2023)" },
  { role: "Bagian Dari Pakar Bisnis", text: "ANB Consulting (2021 - Now)" },
];

const portofolio = Array.from({ length: 27 }, (_, i) => ({
  logo: `/portofolio/logo-${String(i + 1).padStart(2, "0")}.webp`,
  label: `Klien & Mitra ${i + 1}`,
}));

const portofolioRow1 = portofolio.slice(0, 14);
const portofolioRow2 = portofolio.slice(14);
const marqueeRow1 = [...portofolioRow1, ...portofolioRow1];
const marqueeRow2 = [...portofolioRow2, ...portofolioRow2];

export default function ProfilYosoLukitoPage() {
  return (
    <>
      <StickyHeader />
      <main className="bg-white">
        {/* Hero */}
        <section className="bg-white border-b border-gray-100 pt-10 pb-16 md:pt-14 md:pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-xs text-[#6B7280] mb-8 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-[#F5821F] transition-colors">
                Beranda
              </Link>
              <span>/</span>
              <span className="text-[#0A1E3F] font-medium">Profil Yoso Lukito</span>
            </nav>

            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Text */}
              <AnimateOnScroll animation="fade-in-up" duration={800} className="md:w-1/2 text-center md:text-left space-y-5">
                <span className="inline-block bg-[#FFD54F] text-[#0A1E3F] font-bold text-xs px-3 py-1.5 rounded uppercase tracking-wider">
                  Profile
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-[#0A1E3F] leading-tight tracking-tight">
                  Yoso Lukito
                </h1>
                <p className="text-lg md:text-xl text-[#6B7280] font-medium">
                  Google Certified Professional
                </p>

                <AnimateOnScroll animation="fade-in-up" delay={200} duration={600}>
                  <div className="pt-5 border-t border-gray-200 mt-5">
                    <h2 className="text-xl font-bold text-[#0A1E3F] mb-1">Founder</h2>
                    <p className="text-lg text-[#F5821F] font-bold">SekolahDigitalBisnis.com</p>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-center md:justify-start gap-2 text-[#6B7280] text-sm">
                        <svg className="w-4 h-4 text-[#F5821F] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                        <span className="font-bold text-[#0A1E3F]">Instagram:</span>
                        <span>@yosolukito</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-2 text-[#6B7280] text-sm">
                        <svg className="w-4 h-4 text-[#F5821F] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span className="font-bold text-[#0A1E3F]">LinkedIn:</span>
                        <span>@yosolukito</span>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-in-up" delay={400} duration={600}>
                  <div className="pt-2">
                    <Link
                      href="/#konsultasi"
                      className="inline-block bg-[#0A1E3F] text-white px-8 py-3.5 rounded-xl font-medium hover:bg-[#0A1E3F]/90 transition-colors text-sm"
                    >
                      Konsultasi Gratis Sekarang
                    </Link>
                  </div>
                </AnimateOnScroll>
              </AnimateOnScroll>

              {/* Photo */}
              <AnimateOnScroll animation="slide-in-right" duration={900} delay={200} className="md:w-1/2 flex justify-center md:justify-end">
                <Image
                  src="/images-founder-profile/coach-yoso-lukito.webp"
                  alt="Yoso Lukito - Founder & CEO SDBI"
                  width={700}
                  height={500}
                  className="w-full max-w-md object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll animation="scale-in" duration={800}>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Prestasi & Pendidikan */}
                  <div>
                    <AnimateOnScroll animation="slide-in-left" duration={600}>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#0A1E3F] mb-8 pb-2 border-b-2 border-[#F5821F] inline-block">
                        Prestasi &amp; Pendidikan
                      </h3>
                    </AnimateOnScroll>
                    <ul className="space-y-4">
                      {pendidikan.map((item, index) => (
                        <AnimateOnScroll key={index} animation="fade-in-up" delay={index * 80} duration={500}>
                          <li className="flex items-start gap-3">
                            <svg
                              className="w-5 h-5 text-[#F5821F] mt-0.5 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-sm text-[#374151] leading-relaxed">
                              <strong className="text-[#0A1E3F]">{item.bold}</strong>
                              {item.text ? ` ${item.text}` : ""}
                            </span>
                          </li>
                        </AnimateOnScroll>
                      ))}
                    </ul>
                  </div>

                  {/* Pengalaman */}
                  <div>
                    <div className="mb-10">
                      <AnimateOnScroll animation="slide-in-right" duration={600}>
                        <h3 className="text-2xl md:text-3xl font-bold text-[#0A1E3F] mb-6 pb-2 border-b-2 border-[#F5821F] inline-block">
                          Pengalaman Profesional
                        </h3>
                      </AnimateOnScroll>
                      <AnimateOnScroll animation="fade-in-up" delay={150} duration={600}>
                        <p className="text-sm text-[#374151] leading-relaxed bg-gray-50 p-6 rounded-xl border border-gray-100">
                          <strong className="text-lg text-[#0A1E3F] block mb-2">18 Tahun Berkarir</strong>
                          di <strong className="text-[#0A1E3F]">PT. TELKOMSEL, LG Electronics &amp; PANASONIC</strong>{" "}
                          bidang Marketing, Enterprise Business &amp; Supply Chain
                        </p>
                      </AnimateOnScroll>
                    </div>

                    <div>
                      <AnimateOnScroll animation="slide-in-right" delay={100} duration={600}>
                        <h3 className="text-xl font-bold text-[#0A1E3F] mb-6 pb-2 border-b-2 border-[#F5821F] inline-block">
                          Pengalaman Praktisi Bisnis
                        </h3>
                      </AnimateOnScroll>
                      <ul className="space-y-4">
                        {praktisiBisnis.map((item, index) => (
                          <AnimateOnScroll key={index} animation="fade-in-up" delay={index * 80} duration={500}>
                            <li className="flex items-start gap-3">
                              <svg
                                className="w-5 h-5 text-[#F5821F] mt-0.5 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                              </svg>
                              <span className="text-sm text-[#374151] leading-relaxed">
                                <strong className="text-[#0A1E3F]">{item.role}</strong> {item.text}
                              </span>
                            </li>
                          </AnimateOnScroll>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Portfolio */}
        <section className="py-16 md:py-24 bg-[#0A1E3F] relative overflow-hidden">
          <style>{`
            @keyframes profileMarqueeLeft {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes profileMarqueeRight {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .profile-marquee-left {
              animation: profileMarqueeLeft 40s linear infinite;
            }
            .profile-marquee-right {
              animation: profileMarqueeRight 40s linear infinite;
            }
          `}</style>

          <div className="absolute top-10 right-10 md:top-16 md:right-16 opacity-20">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#D4A843" strokeWidth="1">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimateOnScroll animation="fade-in-up" duration={700} className="text-center mb-14">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Portofolio</h2>
              <p className="text-lg text-gray-300">Dipercaya oleh organisasi dan perusahaan terkemuka</p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="scale-in" delay={200} duration={800}>
            <div className="bg-white rounded-[32px] shadow-[0_0_40px_rgba(0,0,0,0.2)] py-10 px-4 md:px-10 relative overflow-hidden">
              <div className="flex flex-col gap-6 md:gap-8">
                <div className="flex w-max profile-marquee-right gap-8 md:gap-14">
                  {marqueeRow1.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center transition-transform hover:scale-110 w-24 h-14 md:w-32 md:h-16 shrink-0"
                    >
                      <Image
                        src={item.logo}
                        alt={item.label}
                        width={140}
                        height={70}
                        className="max-w-full max-h-full object-contain"
                        style={{ width: "auto", height: "auto" }}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex w-max profile-marquee-left gap-8 md:gap-14">
                  {marqueeRow2.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center transition-transform hover:scale-110 w-24 h-14 md:w-32 md:h-16 shrink-0"
                    >
                      <Image
                        src={item.logo}
                        alt={item.label}
                        width={140}
                        height={70}
                        className="max-w-full max-h-full object-contain"
                        style={{ width: "auto", height: "auto" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* CTA */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <AnimateOnScroll animation="blur-in" duration={800}>
            <div className="bg-[#0A1E3F] rounded-2xl p-8 md:p-10 text-center">
              <h3 className="text-white text-xl md:text-2xl font-bold mb-3">
                Siap Bertumbuh Bersama SDBI?
              </h3>
              <p className="text-gray-300 text-sm md:text-base mb-6 max-w-lg mx-auto">
                Konsultasikan strategi digital marketing dan transformasi bisnis Anda bersama tim ahli kami.
              </p>
              <Link
                href="/#konsultasi"
                className="inline-block bg-[#FFD54F] border-2 border-[#D4A843] text-[#0A1E3F] px-8 py-3.5 rounded-xl font-bold hover:bg-[#F5821F] hover:text-white hover:border-[#F5821F] transition-all duration-300 text-sm shadow-sm"
              >
                Konsultasi Gratis Sekarang
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </main>
      <Footer />
    </>
  );
}
