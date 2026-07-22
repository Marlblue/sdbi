import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllArticles, formatTanggal } from "../lib/articles";
import StickyHeader from "../components/StickyHeader";
import Footer from "../components/Footer";
import AnimateOnScroll from "../components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Artikel & Insights | SDBI - Sekolah Digital Bisnis Indonesia",
  description:
    "Kumpulan artikel, insight, dan strategi digital marketing, AI SEO, dan pertumbuhan bisnis dari Sekolah Digital Bisnis Indonesia.",
};

const categoryColors: Record<string, string> = {
  default: "bg-[#0A1E3F]",
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <>
      <StickyHeader />
      <main className="bg-white">
        <div className="bg-[#0A1E3F] pt-16 pb-20 md:pt-20 md:pb-24">
          <AnimateOnScroll animation="fade-in-up" duration={700} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Artikel & <span className="text-[#F5821F]">Insights</span>
            </h1>
            <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base">
              Strategi, insight, dan panduan digital marketing terbaru untuk pertumbuhan bisnis Anda.
            </p>
          </AnimateOnScroll>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-sm text-[#6B7280] mb-8">{articles.length} artikel</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <AnimateOnScroll key={article.slug} animation="fade-in-up" delay={(index % 3) * 100} duration={600}>
                <Link href={`/${article.slug}`} className="group h-full block">
                  <article className="h-full flex flex-col">
                    <div className="bg-gray-200 h-52 rounded-2xl mb-4 relative overflow-hidden border border-gray-300">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span
                        className={`absolute top-4 left-4 ${categoryColors.default} text-white text-xs font-semibold px-3 py-1 rounded-full z-10 shadow-sm`}
                      >
                        {article.category.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-2">
                      {formatTanggal(article.date)} - {article.readTime}
                    </p>
                    <h2 className="font-bold text-base text-[#0A1E3F] mb-2 leading-snug line-clamp-2 min-h-[2lh] group-hover:text-[#F5821F] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-[#6B7280] leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </article>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
