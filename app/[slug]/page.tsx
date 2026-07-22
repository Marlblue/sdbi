import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllArticles, getArticleBySlug, formatTanggal, getLatestArticles } from "../lib/articles";
import StickyHeader from "../components/StickyHeader";
import Footer from "../components/Footer";

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} | SDBI`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://sekolahdigitalbisnis.com/${article.slug}`,
      images: [{ url: article.image, width: 1200, height: 630 }],
      type: "article",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getAllArticles()
    .filter((a) => a.slug !== article.slug)
    .filter((a) => a.category === article.category)
    .slice(0, 3);

  const fallbackRelated =
    related.length > 0 ? related : getLatestArticles(4).filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <StickyHeader />
      <main className="bg-white">
        {/* Hero */}
        <div className="bg-[#0A1E3F] pt-10 pb-8 md:pt-14 md:pb-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-xs text-gray-300 mb-6 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">
                Beranda
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white transition-colors">
                Artikel
              </Link>
            </nav>
            <span className="inline-block bg-[#F5821F] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {article.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-snug">
              {article.title}
            </h1>
            <p className="text-xs text-gray-300 uppercase tracking-wider mt-5">
              {formatTanggal(article.date)} &middot; {article.readTime}
            </p>
          </div>
        </div>

        {/* Featured image */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10">
          <div className="relative w-full h-56 md:h-96 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {article.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-[#6B7280] px-3 py-1.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* CTA */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-[#0A1E3F] rounded-2xl p-8 md:p-10 text-center">
            <h3 className="text-white text-xl md:text-2xl font-bold mb-3">
              Siap Bertumbuh Bersama SDBI?
            </h3>
            <p className="text-gray-300 text-sm md:text-base mb-6 max-w-lg mx-auto">
              Konsultasikan strategi digital marketing dan transformasi bisnis Anda bersama tim ahli kami.
            </p>
            <Link
              href="/#kontak"
              className="inline-block bg-[#FFD54F] border-2 border-[#D4A843] text-[#0A1E3F] px-8 py-3.5 rounded-xl font-bold hover:bg-[#F5821F] hover:text-white hover:border-[#F5821F] transition-all duration-300 text-sm shadow-sm"
            >
              Konsultasi Gratis Sekarang
            </Link>
          </div>
        </div>

        {/* Related articles */}
        {fallbackRelated.length > 0 && (
          <div className="bg-gray-50 py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-[#0A1E3F] mb-8">
                Artikel <span className="text-[#F5821F]">Terkait</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {fallbackRelated.map((a) => (
                  <Link key={a.slug} href={`/${a.slug}`} className="group block">
                    <div className="relative w-full h-44 rounded-xl overflow-hidden bg-gray-200 mb-3">
                      <Image
                        src={a.image}
                        alt={a.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-1">
                      {formatTanggal(a.date)}
                    </p>
                    <h3 className="font-bold text-sm text-[#0A1E3F] leading-snug group-hover:text-[#F5821F] transition-colors">
                      {a.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
