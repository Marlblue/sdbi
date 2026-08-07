import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getPaginatedArticles, getPaginatedArticlesByTag, formatTanggal, ARTICLES_PER_PAGE } from "../lib/articles";
import StickyHeader from "../components/StickyHeader";
import Footer from "../components/Footer";
import AnimateOnScroll from "../components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Artikel & Insights | SDBI - Sekolah Digital Bisnis Indonesia",
  description:
    "Kumpulan artikel, insight, dan strategi digital marketing, AI SEO, dan pertumbuhan bisnis dari Sekolah Digital Bisnis Indonesia.",
};

export const revalidate = 3600;

const categoryColors: Record<string, string> = {
  default: "bg-[#0A1E3F]",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; page?: string }>;
}) {
  const { tag, page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const { items: articles, total } = tag
    ? await getPaginatedArticlesByTag(tag, page)
    : await getPaginatedArticles(page);
  const totalPages = Math.max(1, Math.ceil(total / ARTICLES_PER_PAGE));
  const pageQuery = (p: number) => {
    const params = new URLSearchParams();
    if (tag) params.set("tag", tag);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

  if (page > totalPages) {
    redirect(pageQuery(totalPages));
  }

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
          {tag ? (
            <div className="flex items-center flex-wrap gap-3 mb-8">
              <p className="text-sm text-[#6B7280]">
                Menampilkan {total} artikel dengan tag{" "}
                <span className="font-semibold text-[#0A1E3F]">#{tag}</span>
              </p>
              <Link
                href="/blog"
                className="text-xs bg-gray-100 text-[#6B7280] px-3 py-1.5 rounded-full hover:bg-[#F5821F] hover:text-white transition-colors"
              >
                Hapus filter ✕
              </Link>
            </div>
          ) : (
            <p className="text-sm text-[#6B7280] mb-8">{total} artikel</p>
          )}
          {articles.length === 0 && (
            <p className="text-sm text-[#6B7280] mb-8">
              {tag ? "Belum ada artikel dengan tag ini." : "Belum ada artikel."}
            </p>
          )}
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
                        priority={index === 0}
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
          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
              <Link
                href={pageQuery(page - 1)}
                aria-disabled={page <= 1}
                className={`text-sm font-semibold px-4 py-2 rounded-full border transition-colors ${
                  page <= 1
                    ? "pointer-events-none opacity-40 border-gray-200 text-[#6B7280]"
                    : "border-gray-300 text-[#0A1E3F] hover:bg-[#0A1E3F] hover:text-white hover:border-[#0A1E3F]"
                }`}
              >
                Sebelumnya
              </Link>
              <span className="text-sm text-[#6B7280] px-2">
                Halaman {page} dari {totalPages}
              </span>
              <Link
                href={pageQuery(page + 1)}
                aria-disabled={page >= totalPages}
                className={`text-sm font-semibold px-4 py-2 rounded-full border transition-colors ${
                  page >= totalPages
                    ? "pointer-events-none opacity-40 border-gray-200 text-[#6B7280]"
                    : "border-gray-300 text-[#0A1E3F] hover:bg-[#0A1E3F] hover:text-white hover:border-[#0A1E3F]"
                }`}
              >
                Berikutnya
              </Link>
            </nav>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
