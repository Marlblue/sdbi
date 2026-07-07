import Link from 'next/link';

export default function Articles() {
  const articles = [
    {
      category: 'AI UNTUK BISNIS',
      categoryColor: 'bg-[#0A1E3F]',
      date: '10 JUNI 2025',
      readTime: '8 MENIT BACA',
      title: '5 Tools AI yang Wajib Digunakan Setiap Tim Marketing pada 2025',
      excerpt:
        'Dari otomasi konten hingga analisis kompetitor real-time — inilah alat AI yang sudah digunakan tim marketing perusahaan terkemuka untuk efisiensi dan pertumbuhan.',
      gradient: 'from-blue-600 to-indigo-700',
      icon: '🤖',
    },
    {
      category: 'SEO & AI SEO',
      categoryColor: 'bg-[#25D366]',
      date: '5 JUNI 2025',
      readTime: '6 MENIT BACA',
      title: 'Panduan Praktis AI SEO : Cara Muncul di ChatGPT Search dan Google AI Overview',
      excerpt:
        'Strategi step-by-step untuk mengoptimalkan konten Anda agar relevan di era pencarian berbasis AI — bukan hanya Google biasa, tetapi juga Perplexity dan Gemini.',
      gradient: 'from-cyan-500 to-teal-600',
      icon: '🔍',
    },
    {
      category: 'BUSINESS GROWTH',
      categoryColor: 'bg-[#F5821F]',
      date: '28 MEI 2025',
      readTime: '7 MENIT BACA',
      title: 'Dari Awareness ke Revenue: Membangun Funnel Pemasaran yang Benar-Benar Bekerja',
      excerpt:
        'Banyak bisnis membangun funnel yang terlihat lengkap di atas kertas, tetapi tidak menghasilkan konversinya. Inilah letak kesalahannya dan cara memperbaikinya.',
      gradient: 'from-orange-500 to-red-600',
      icon: '📈',
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24" id="artikel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A1E3F]">
            Artikel & <span className="text-[#F5821F]">Insights</span>
          </h2>
        </div>

        {/* Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article
              key={index}
              className="group cursor-pointer"
            >
              {/* Image placeholder */}
              <div className="bg-gray-200 h-52 rounded-2xl mb-4 relative overflow-hidden flex flex-col items-center justify-center border border-gray-300">
                {/* USER: Ganti div ini dengan tag Image thumbnail artikel */}
                <span className="text-4xl opacity-40 mb-2">{article.icon}</span>
                <span className="text-xs text-gray-500 font-semibold">Ganti Thumbnail<br/>(Rekomen: 800x600)</span>
                
                {/* Category badge */}
                <span className={`absolute top-4 left-4 ${article.categoryColor} text-white text-xs font-semibold px-3 py-1 rounded-full z-10 shadow-sm`}>
                  {article.category}
                </span>
              </div>

              {/* Meta */}
              <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-2">
                {article.date} - {article.readTime}
              </p>

              {/* Title */}
              <h3 className="font-bold text-base text-[#0A1E3F] mb-2 leading-snug group-hover:text-[#F5821F] transition-colors">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-[#6B7280] leading-relaxed mb-3">
                {article.excerpt}
              </p>

              {/* Read more */}
              <Link href="#" className="text-[#F5821F] font-semibold text-sm hover:underline">
                Baca Artikel
              </Link>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="#"
            className="inline-block bg-[#FFD54F] border-2 border-[#D4A843] text-[#0A1E3F] px-8 py-3.5 rounded-xl font-bold hover:bg-[#F5821F] hover:text-white hover:border-[#F5821F] transition-all duration-300 text-sm shadow-sm"
          >
            Baca Artikel Lainnya
          </Link>
        </div>
      </div>
    </section>
  );
}
