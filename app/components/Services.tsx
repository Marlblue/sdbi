import Link from 'next/link';
import Image from 'next/image';
import AnimateOnScroll from './AnimateOnScroll';

interface ServicesProps {
  showHeading?: boolean;
  showMoreButton?: boolean;
}

export default function Services({ showHeading = true, showMoreButton = true }: ServicesProps) {
  const services = [
    {
      title: 'Digital Marketing Management',
      image: '/images-layanan/digital-marketing.webp',
      gradient: 'from-blue-600 to-blue-800',
      icon: '📊',
      tags: ['Strategy & Execution', 'Lead Generation'],
      description:
        'Mengelola strategi, konten, iklan, dan optimasi digital marketing & SEO untuk membantu meningkatkan awareness, leads, dan penjualan bisnis.',
    },
    {
      title: 'SEO & AI Search Optimization',
      image: '/images-layanan/seo-ai.webp',
      gradient: 'from-cyan-500 to-blue-600',
      icon: '🔍',
      tags: ['Search Engine Optimization', 'AI Search'],
      description:
        'Meningkatkan visibilitas bisnis di Google dan AI Search untuk menghasilkan traffic organik yang berkelanjutan.',
    },
    {
      title: 'Digital Ads Management',
      image: '/images-layanan/digital-ads.webp',
      gradient: 'from-red-500 to-orange-600',
      icon: '📢',
      tags: ['Meta Ads', 'TikTok Ads', 'Google Ads'],
      description:
        'Mengelola iklan digital untuk membantu meningkatkan leads, penjualan, dan pertumbuhan bisnis.',
    },
    {
      title: 'Corporate Training & Workshop (MSA)',
      image: '/images-layanan/training-corporate.webp',
      gradient: 'from-indigo-500 to-purple-600',
      icon: '🎓',
      tags: ['In-House Training', 'Online | Offline', 'Sertifikasi'],
      description:
        'Program pelatihan sesuai kebutuhan perusahaan untuk meningkatkan kompetensi tim di bidang digital marketing, public speaking, leadership, & business development.',
    },
    {
      title: 'Business & Digital Consulting',
      image: '/images-layanan/business-digital.webp',
      gradient: 'from-emerald-500 to-teal-600',
      icon: '💼',
      tags: ['Private Consulting', 'Project Based'],
      description:
        'Pendampingan bisnis untuk membantu perusahaan meningkatkan revenue, memperkuat strategi pemasaran, dan mengoptimalkan proses bisnis secara terukur.',
    },
    {
      title: 'Website Development',
      image: '/images-layanan/website-development.webp',
      gradient: 'from-violet-500 to-indigo-600',
      icon: '💻',
      tags: ['Custom Development', 'Mobile Friendly'],
      description:
        'Pembuatan website company profile, corporate website, landing page, dan portal institusi yang profesional serta berorientasi pada konversi.',
    },
    {
      title: 'Speaker & Corporate Event',
      image: '/images-layanan/speaker.webp',
      gradient: 'from-amber-500 to-orange-600',
      icon: '🎤',
      tags: ['Corporate Event', 'Online & Offline'],
      description:
        'Program seminar, workshop, webinar, dan keynote session bersama Coach Yoso Lukito dengan materi yang aplikatif dan relevan untuk kebutuhan bisnis modern.',
    },
    {
      title: 'Program Masa Persiapan Pensiun (MPP)',
      image: '/images-layanan/program-masa.webp',
      gradient: 'from-rose-500 to-pink-600',
      icon: '🏖️',
      tags: ['Business Learning Journey', 'Business Visit'],
      description:
        'Program pembekalan masa pensiun melalui pengembangan mindset, keterampilan usaha, sharing bersama pengusaha, serta kunjungan langsung ke berbagai model bisnis yang telah berhasil berkembang.',
    },
  ];

  return (
    <section className="bg-gray-50 py-16 md:py-24" id="layanan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        {showHeading && (
          <AnimateOnScroll animation="fade-in-up" duration={700} className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#0A1E3F]">
              Layanan <span className="highlight-yellow">Sekolah Digital Bisnis Indonesia</span>
            </h2>
          </AnimateOnScroll>
        )}

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <AnimateOnScroll key={index} animation="fade-in-up" delay={index * 80} duration={600}>
              <div
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
              >
                {/* Image Area */}
                <div className="relative h-44 bg-gray-100 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-[#0A1E3F] font-bold text-base mb-3 leading-snug">
                    {service.title}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {service.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs border border-gray-200 text-[#6B7280] px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-[#6B7280] text-sm leading-relaxed flex-1 mb-4">
                    {service.description}
                  </p>

                  {/* CTA */}
                  <Link
                    href="https://wa.me/6285211436032"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20BD5A] text-white text-center py-2.5 rounded-lg font-bold text-sm transition-colors w-full"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Hubungi Kami
                    </span>
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* CTA Button */}
        {showMoreButton && (
          <AnimateOnScroll animation="fade-in-up" delay={200} duration={600} className="text-center mt-12">
            <Link
              href="/layanan"
              className="inline-block bg-[#0A1E3F] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#0A1E3F]/90 transition-all duration-300 text-sm"
            >
              Lihat Layanan Lainnya
            </Link>
          </AnimateOnScroll>
        )}
      </div>
    </section>
  );
}
