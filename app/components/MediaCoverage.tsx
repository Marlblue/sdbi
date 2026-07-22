import Image from 'next/image';
import Link from 'next/link';
import AnimateOnScroll from './AnimateOnScroll';

export default function MediaCoverage() {
  const mediaLogos = [
    { name: 'NET.', sub: 'NET TV' },
    { name: 'iNews', sub: 'iNews TV' },
    { name: 'SWA', sub: 'Majalah SMA' },
    { name: 'CNNC', sub: 'CNN Indonesia' },
    { name: 'Bisnis', sub: 'Bisnis Indonesia' },
    { name: 'Detik', sub: 'detik.com' },
  ];

  const newsArticles = [
    {
      source: 'tvOnenews.com',
      date: '15 Desember 2024',
      title: 'Bank Indonesia Kolaborasi dengan BKKBN Beri Edukasi Keuangan Inklusif ke Masyarakat',
      quote: 'Kolaborasi ini diawali dalam acara bertajuk "Edukasi Keuangan Inklusif, Perlindungan Konsumen, dan Pemasaran Digital untuk Pemberdayaan Ekonomi Keluarga" yang berlangsung di Sheraton Tunjungan Plaza Surabaya.',
      gradient: 'from-red-500 to-red-700',
      image: '/images-mediacoverage/675e57c6dd04d-bi-dan-bkkbn-sukses-menyelenggarakan-acara-bertajuk-edukasi-keuangan-inklusif-perlindungan-konsumen-dan-pemasaran-digital-untuk-pemberdayaan-ekonomi-keluarga_990_557.webp',
      link: 'https://www.tvonenews.com/berita/nasional/278402-bank-indonesia-kolaborasi-dengan-bkkbn-beri-edukasi-keuangan-inklusif-ke-masyarakat?page=all',
    },
    {
      source: 'mnctrijaya.com',
      date: '21 Desember 2024',
      title: 'Yoso Lukito Berkolaborasi dengan BPJS Ketenagakerjaan Jabar: Tingkatkan Kompetensi Digital Marketing di Era Digital',
      quote: 'Dalam sesi yang dinantikan tersebut, Coach Yoso Lukito founder Sekolah Digital Bisnis Indonesia, seorang Google Certified Digital Marketing Expert, hadir sebagai salah satu pembicara dalam acara "Social Media Winning".',
      gradient: 'from-blue-500 to-blue-700',
      image: '/images-mediacoverage/serba-serbi_183556_big.webp',
      link: 'https://www.mnctrijaya.com/news/detail/69657/yoso-lukito-berkolaborasi-dengan-bpjs-ketenagakerjaan-jabar-tingkatkan-kompetensi-digital',
    },
    {
      source: 'Warta Ekonomi',
      date: '24 Agustus 2024',
      title: 'Kolaborasi Yoso Lukito Sekolah Digital Bisnis Indonesia (SDBI) Bersama KPMI: Strategi Pemasaran Digital untuk Para Pebisnis',
      quote: '"Kami berusaha memberikan wawasan yang aplikatif dan mudah dipahami, sehingga para Muslimat dapat meraih peluang bisnis digital yang lebih besar di era kompetisi global ini."',
      gradient: 'from-amber-500 to-orange-700',
      image: '/images-mediacoverage/IMG-20241221-WA0059.webp',
      link: 'https://wartaekonomi.co.id/read553732/kolaborasi-yoso-lukito-sekolah-digital-bisnis-indonesia-sdbi-bersama-kpmi-strategi-pemasaran-digital-untuk-para-pebisnis',
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24" id="media">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <AnimateOnScroll animation="fade-in-up" duration={700}>
          <div className="text-center mb-4">
            <span className="text-[#F5821F] font-semibold text-xs uppercase tracking-widest">
              ★ LIPUTAN MEDIA
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold text-center text-[#0A1E3F] mb-4">
            Media yang Telah{' '}
            <span className="text-[#F5821F]">Meliput SDBI</span>
          </h2>

          <p className="text-center text-[#6B7280] text-sm md:text-base max-w-2xl mx-auto mb-10">
            Aktivitas dan kontribusi SDBI dalam ekosistem digital bisnis Indonesia mendapat perhatian dari berbagai media nasional terkemuka.
          </p>
        </AnimateOnScroll>

        {/* Media Logos */}
        <AnimateOnScroll animation="fade-in" delay={200} duration={600}>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-16">
            {mediaLogos.map((media, index) => (
              <div
                key={index}
                className="text-center px-4 py-3 border-r border-gray-200 last:border-r-0 flex flex-col items-center justify-center min-w-[120px]"
              >
                <p className="font-bold text-[#0A1E3F] text-lg leading-tight">{media.name}</p>
                <p className="text-xs text-[#6B7280]">{media.sub}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* News Section */}
        <AnimateOnScroll animation="fade-in-up" delay={100} duration={600}>
          <h3 className="text-2xl md:text-3xl font-bold text-center text-[#0A1E3F] mb-10">
            Liputan Media N<span className="text-[#F5821F]">asional</span>
          </h3>
        </AnimateOnScroll>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsArticles.map((article, index) => (
            <AnimateOnScroll key={index} animation="fade-in-up" delay={index * 120} duration={600}>
              <Link
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block hover:-translate-y-1"
              >
                {/* Source bar */}
                <div className={`bg-gradient-to-r ${article.gradient} px-4 py-3 flex items-center justify-between`}>
                  <span className="text-white font-bold text-sm">{article.source}</span>
                  <span className="text-white/80 text-xs">{article.date}</span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h4 className="font-bold text-sm text-[#0A1E3F] mb-3 leading-snug line-clamp-3">
                    {article.title}
                  </h4>

                  {/* Image */}
                  <div className="relative w-full h-32 rounded-xl mb-4 overflow-hidden border border-gray-100">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <blockquote className="border-l-3 border-[#D4A843] pl-3">
                    <p className="text-xs text-[#6B7280] italic leading-relaxed line-clamp-4">
                      {article.quote}
                    </p>
                  </blockquote>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}