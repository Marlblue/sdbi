import Image from 'next/image';
import Link from 'next/link';
import { getLatestArticles, formatTanggal } from '../lib/articles';
import AnimateOnScroll from './AnimateOnScroll';

export default function Articles() {
  const articles = getLatestArticles(3);

  return (
    <section className="bg-white py-16 md:py-24" id="artikel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <AnimateOnScroll animation="fade-in-up" duration={700} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A1E3F]">
            Artikel & <span className="text-[#F5821F]">Insights</span>
          </h2>
        </AnimateOnScroll>

        {/* Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <AnimateOnScroll key={article.slug} animation="fade-in-up" delay={index * 120} duration={600}>
              <Link href={`/${article.slug}`} className="group cursor-pointer h-full block">
                <article className="h-full flex flex-col">
                  {/* Image */}
                  <div className="bg-gray-200 h-52 rounded-2xl mb-4 relative overflow-hidden flex flex-col items-center justify-center border border-gray-300">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Category badge */}
                    <span className="absolute top-4 left-4 bg-[#0A1E3F] text-white text-xs font-semibold px-3 py-1 rounded-full z-10 shadow-sm">
                      {article.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Meta */}
                  <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-2">
                    {formatTanggal(article.date)} - {article.readTime}
                  </p>

                  {/* Title */}
                  <h3 className="font-bold text-base text-[#0A1E3F] mb-2 leading-snug line-clamp-2 min-h-[2lh] group-hover:text-[#F5821F] transition-colors">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-[#6B7280] leading-relaxed mb-3 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Read more */}
                  <span className="text-[#F5821F] font-semibold text-sm group-hover:underline mt-auto">
                    Baca Artikel
                  </span>
                </article>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>

        {/* CTA */}
        <AnimateOnScroll animation="fade-in-up" delay={200} duration={600} className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-block bg-[#FFD54F] border-2 border-[#D4A843] text-[#0A1E3F] px-8 py-3.5 rounded-xl font-bold hover:bg-[#F5821F] hover:text-white hover:border-[#F5821F] transition-all duration-300 text-sm shadow-sm"
          >
            Baca Artikel Lainnya
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
