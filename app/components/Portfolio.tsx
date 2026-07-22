import Image from 'next/image';
import Link from 'next/link';
import Counter from './Counter';
import AnimateOnScroll from './AnimateOnScroll';

export default function Portfolio() {
  const stats = [
    { end: 300, prefix: '+', suffix: '%', label: 'Peningkatan Leads', color: 'text-[#D4A843]' },
    { end: 10000, prefix: '+', suffix: '', label: 'Alumni di seluruh Indonesia', color: 'text-[#D4A843]' },
    { end: 40, prefix: '', suffix: '%', label: 'Efisiensi Biaya', color: 'text-[#D4A843]' },
  ];

  const caseStudies = [
    {
      logo: '/logos-portofolio/sma-lab-jkt.webp',
      result: 'Peningkatan Pendaftaran Siswa 200%',
      detail: 'Leads meningkat 250% dalam 6 bulan',
      resultColor: 'text-[#F5821F]',
      bgColor: 'bg-white',
    },
    {
      logo: '/logos-portofolio/logopln-portofolio.webp',
      result: 'Training 1.000+ peserta',
      detail: 'Peningkatan kompetensi dan adopsi digital signifikan',
      resultColor: 'text-[#0A1E3F]',
      bgColor: 'bg-white',
    },
    {
      logo: '/logos-portofolio/rs-permata-gp.webp',
      result: '300% Peningkatan Pasien datang',
      detail: 'Leads meningkat 400% dalam 6 bulan',
      resultColor: 'text-[#F5821F]',
      bgColor: 'bg-white',
    },
  ];

  return (
    <section className="bg-[#0A1E3F] py-16 md:py-24 relative overflow-hidden" id="portofolio">
      {/* Decorative stars */}
      <div className="absolute top-10 right-10 md:top-20 md:right-20 opacity-30">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#D4A843" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>
      <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 opacity-20">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D4A843" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Left Column - Title */}
          <AnimateOnScroll animation="slide-in-left" duration={800} className="md:col-span-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Portofolio & Case Studies
            </h2>
            <div className="w-16 h-1 bg-[#D4A843] mb-6"></div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
              Pendampingan bisnis untuk membantu perusahaan meningkatkan revenue,
              memperkuat strategi pemasaran, dan mengoptimalkan proses bisnis secara terukur.
            </p>
            <Link
              href="#konsultasi"
              className="inline-block bg-[#F5821F] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#F5821F]/90 transition-colors text-sm"
            >
              Konsultasi Gratis Sekarang
            </Link>
          </AnimateOnScroll>

          {/* Right Column - Stats + Cards */}
          <div className="md:col-span-2">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <AnimateOnScroll key={index} animation="fade-in-up" delay={index * 150} duration={600}>
                  <div className="text-center">
                    <p className={`text-3xl md:text-4xl font-bold ${stat.color} mb-1`}>
                      <Counter end={stat.end} prefix={stat.prefix} suffix={stat.suffix} />
                    </p>
                    <p className="text-xs md:text-sm text-gray-300 font-medium mt-2">
                      {stat.label}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            {/* Case Study Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {caseStudies.map((study, index) => (
                <AnimateOnScroll key={index} animation="scale-in" delay={index * 120} duration={600}>
                  <div
                    className={`${study.bgColor} rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}
                  >
                    <div className="flex items-center justify-center mb-4 h-24">
                      <Image
                        src={study.logo}
                        alt={study.result}
                        width={160}
                        height={120}
                        className="h-20 w-auto object-contain"
                      />
                    </div>
                    <p className={`text-center font-bold text-base ${study.resultColor} mb-2 leading-snug`}>
                      {study.result}
                    </p>
                    <div className="bg-gray-50 rounded-lg p-2 mt-3 border border-gray-100">
                      <p className="text-xs text-[#6B7280] text-center">
                        {study.detail}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
