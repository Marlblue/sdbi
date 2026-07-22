import Link from "next/link";
import type { Metadata } from "next";
import StickyHeader from "../components/StickyHeader";
import Services from "../components/Services";
import CTAForm from "../components/CTAForm";
import Footer from "../components/Footer";
import AnimateOnScroll from "../components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Layanan | Sekolah Digital Bisnis Indonesia (SDBI)",
  description:
    "Layanan Digital Marketing Management, SEO & AI Search Optimization, Digital Ads, Corporate Training, Business Consulting, Website Development, Speaker, dan Program MPP dari SDBI.",
  openGraph: {
    title: "Layanan | Sekolah Digital Bisnis Indonesia (SDBI)",
    description:
      "Layanan Digital Marketing Management, SEO & AI Search Optimization, Digital Ads, Corporate Training, Business Consulting, Website Development, Speaker, dan Program MPP dari SDBI.",
    url: "https://sekolahdigitalbisnis.com/layanan",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Layanan | Sekolah Digital Bisnis Indonesia (SDBI)",
    description:
      "Layanan Digital Marketing Management, SEO & AI Search Optimization, Digital Ads, Corporate Training, Business Consulting, Website Development, Speaker, dan Program MPP dari SDBI.",
  },
};

export default function LayananPage() {
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
              <span className="text-white font-medium">Layanan</span>
            </nav>

            <AnimateOnScroll animation="fade-in-up" duration={700} className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Layanan <span className="text-[#F5821F]">Kami</span>
              </h1>
              <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base">
                Solusi digital marketing, pelatihan, dan konsultasi bisnis untuk membantu perusahaan
                Anda tumbuh secara terukur.
              </p>
            </AnimateOnScroll>
          </div>
        </div>

        <Services showHeading={false} showMoreButton={false} />

        <CTAForm />
      </main>
      <Footer />
    </>
  );
}
