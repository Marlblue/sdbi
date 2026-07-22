import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import StickyHeader from "../components/StickyHeader";
import CTAForm from "../components/CTAForm";
import Footer from "../components/Footer";
import AnimateOnScroll from "../components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Hubungi Kami | Sekolah Digital Bisnis Indonesia (SDBI)",
  description:
    "Hubungi Sekolah Digital Bisnis Indonesia (SDBI) melalui WhatsApp, email, atau kunjungi kantor kami di Jakarta Timur untuk konsultasi bisnis dan digital marketing.",
  openGraph: {
    title: "Hubungi Kami | Sekolah Digital Bisnis Indonesia (SDBI)",
    description:
      "Hubungi Sekolah Digital Bisnis Indonesia (SDBI) melalui WhatsApp, email, atau kunjungi kantor kami di Jakarta Timur untuk konsultasi bisnis dan digital marketing.",
    url: "https://sekolahdigitalbisnis.com/hubungi-kami",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hubungi Kami | Sekolah Digital Bisnis Indonesia (SDBI)",
    description:
      "Hubungi Sekolah Digital Bisnis Indonesia (SDBI) melalui WhatsApp, email, atau kunjungi kantor kami di Jakarta Timur untuk konsultasi bisnis dan digital marketing.",
  },
};

const contactPoints = [
  {
    label: "WhatsApp",
    value: "+62 852-1143-6032",
    href: "https://wa.me/6285211436032",
    icon: "/svg/whatsapp-svgrepo-com.svg",
  },
  {
    label: "Email",
    value: "info@sdbi.co.id",
    href: "mailto:info@sdbi.co.id",
    icon: "/svg/email-svgrepo-com.svg",
  },
  {
    label: "Kantor",
    value: "Graha Multipiranti, Jl. Radin Inten II No.2-8, Duren Sawit, Jakarta Timur 13440",
    href: "https://maps.google.com/maps?q=Sekolah+Digital+Bisnis+Indonesia+(SDBI+Digital+Marketing+Agency),+Graha+Multipiranti,+Jl.+Radin+Inten+II+No.2-8,+Duren+Sawit,+Jakarta+Timur+13440",
    icon: "/svg/map-svgrepo-com.svg",
  },
];

export default function HubungiKamiPage() {
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
              <span className="text-white font-medium">Hubungi Kami</span>
            </nav>

            <AnimateOnScroll animation="fade-in-up" duration={700} className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Hubungi <span className="text-[#F5821F]">Kami</span>
              </h1>
              <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base">
                Tim kami siap membantu kebutuhan digital marketing, pelatihan, dan konsultasi
                bisnis Anda. Sampaikan pertanyaan Anda melalui kanal berikut.
              </p>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Contact info + Map */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Contact cards */}
              <div className="space-y-6">
                {contactPoints.map((point, index) => (
                  <AnimateOnScroll key={point.label} animation="slide-in-left" delay={index * 120} duration={600}>
                    <Link
                      href={point.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-6"
                    >
                      <div className="w-12 h-12 shrink-0 rounded-xl bg-[#0A1E3F]/5 border border-[#0A1E3F]/10 flex items-center justify-center">
                        <Image src={point.icon} alt="" width={24} height={24} className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold uppercase tracking-wider text-[#0A1E3F] mb-1">
                          {point.label}
                        </p>
                        <p className="text-[#6B7280] text-sm leading-relaxed">{point.value}</p>
                      </div>
                    </Link>
                  </AnimateOnScroll>
                ))}
              </div>

              {/* Map */}
              <AnimateOnScroll animation="slide-in-right" delay={200} duration={700}>
                <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-80 lg:h-full min-h-[320px]">
                  <iframe
                    src="https://maps.google.com/maps?q=Sekolah+Digital+Bisnis+Indonesia+(SDBI+Digital+Marketing+Agency),+Graha+Multipiranti,+Jl.+Radin+Inten+II+No.2-8,+Duren+Sawit,+Jakarta+Timur+13440&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi Kantor SDBI"
                  />
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <CTAForm />
      </main>
      <Footer />
    </>
  );
}
