'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// 6 avatar images from /avatar-testimonials/
const avatarImages = [
  '/avatar-testimonials/Website SDBI (1).png',
  '/avatar-testimonials/Website SDBI (2).png',
  '/avatar-testimonials/Website SDBI (7).png',
  '/avatar-testimonials/Website SDBI (8).png',
  '/avatar-testimonials/Website SDBI (9).png',
  '/avatar-testimonials/Website SDBI (10).png',
];

export default function Testimonials() {
  const tabs = [
    'Digital Marketing',
    'SEO & AI Search Optimization',
    'Peserta Business Consulting',
    'Training dan Workshop',
    'Masa Persiapan Pensiun',
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const testimonials: Record<number, Array<{
    name: string;
    industry: string;
    quote: string;
    avatarIndex: number;
  }>> = {
    0: [
      {
        name: 'Labschool Cibubur',
        industry: 'EDUCATION',
        quote: '"SDBI membantu kami mengelola strategi digital marketing secara lebih terarah, mulai dari konten hingga kampanye digital untuk meningkatkan awareness dan engagement calon peserta didik."',
        avatarIndex: 0,
      },
      {
        name: 'Shuka Grill Pekalongan',
        industry: 'FOOD & BEVERAGE',
        quote: '"Strategi konten dan promosi digital yang dijalankan SDBI membantu meningkatkan visibilitas brand serta memperkuat interaksi dengan pelanggan."',
        avatarIndex: 1,
      },
      {
        name: 'RS Permata Gunung Putri',
        industry: 'HEALTHCARE & BEAUTY',
        quote: '"SDBI membantu kami menyampaikan informasi layanan rumah sakit secara lebih efektif melalui strategi digital marketing yang tepat sasaran."',
        avatarIndex: 2,
      },
      {
        name: 'Trupastry',
        industry: 'FOOD & BEVERAGE',
        quote: '"SDBI membantu membangun komunikasi brand yang lebih konsisten sehingga produk kami lebih dikenal dan mudah diterima oleh target pasar."',
        avatarIndex: 3,
      },
      {
        name: 'Visa Optik',
        industry: 'RETAIL',
        quote: '"SDBI membantu kami menyampaikan informasi layanan rumah sakit secara lebih efektif melalui strategi digital marketing yang tepat sasaran."',
        avatarIndex: 4,
      },
      {
        name: 'PEVESINDO',
        industry: 'INDUSTRIAL, MANUFACTURING & RETAIL',
        quote: '"SDBI membantu mengembangkan strategi digital marketing yang lebih terstruktur untuk mendukung pertumbuhan bisnis dan peningkatan brand visibility."',
        avatarIndex: 5,
      },
    ],
    1: [
      {
        name: 'Tech Startup Indonesia',
        industry: 'TECHNOLOGY',
        quote: '"Dengan optimasi SEO dari SDBI, website kami berhasil naik ke halaman pertama Google untuk keyword-keyword utama bisnis kami."',
        avatarIndex: 0,
      },
      {
        name: 'Klinik Kecantikan Glow',
        industry: 'HEALTHCARE & BEAUTY',
        quote: '"Traffic organik website kami meningkat 400% setelah menerapkan strategi SEO dan AI Search yang direkomendasikan SDBI."',
        avatarIndex: 1,
      },
      {
        name: 'PT Maju Sejahtera',
        industry: 'MANUFACTURING',
        quote: '"SDBI membantu kami memahami dan memanfaatkan AI Search untuk meningkatkan visibilitas bisnis di era digital."',
        avatarIndex: 2,
      },
      {
        name: 'PT Digital Nusantara',
        industry: 'TECHNOLOGY',
        quote: '"Strategi AI Search dari SDBI membantu kami tampil di berbagai platform pencarian AI dengan hasil yang optimal."',
        avatarIndex: 3,
      },
      {
        name: 'Apotek Sehat Jaya',
        industry: 'HEALTHCARE',
        quote: '"Optimasi SEO lokal dari SDBI membuat apotek kami mudah ditemukan oleh calon pelanggan di sekitar lokasi."',
        avatarIndex: 4,
      },
      {
        name: 'CV Karya Digital',
        industry: 'CREATIVE AGENCY',
        quote: '"SDBI membantu kami membangun strategi konten SEO yang meningkatkan ranking website secara konsisten."',
        avatarIndex: 5,
      },
    ],
    2: [
      {
        name: 'CV Berkah Mandiri',
        industry: 'RETAIL',
        quote: '"Konsultasi bisnis bersama SDBI membantu kami menemukan strategi yang tepat untuk meningkatkan revenue secara signifikan."',
        avatarIndex: 0,
      },
      {
        name: 'Resto Nusantara',
        industry: 'FOOD & BEVERAGE',
        quote: '"Pendampingan bisnis dari SDBI sangat membantu dalam menyusun strategi pemasaran yang lebih efektif dan terukur."',
        avatarIndex: 1,
      },
      {
        name: 'Salon Modern',
        industry: 'BEAUTY',
        quote: '"SDBI membantu kami merancang model bisnis yang lebih scalable dan efisien."',
        avatarIndex: 2,
      },
      {
        name: 'PT Sinar Abadi',
        industry: 'MANUFACTURING',
        quote: '"Konsultasi strategis dari SDBI memberikan perspektif baru dalam menghadapi persaingan pasar yang semakin ketat."',
        avatarIndex: 3,
      },
      {
        name: 'Koperasi Maju Bersama',
        industry: 'FINANCE',
        quote: '"SDBI membantu kami mengoptimalkan operasional bisnis dan meningkatkan efisiensi manajemen keuangan."',
        avatarIndex: 4,
      },
      {
        name: 'Toko Bangunan Jaya',
        industry: 'RETAIL',
        quote: '"Dengan bimbingan SDBI, kami berhasil memperluas jangkauan pasar melalui strategi pemasaran digital yang tepat."',
        avatarIndex: 5,
      },
    ],
    3: [
      {
        name: 'BPJS Ketenagakerjaan',
        industry: 'GOVERNMENT',
        quote: '"Workshop yang diberikan SDBI sangat aplikatif dan langsung bisa diterapkan oleh tim kami."',
        avatarIndex: 0,
      },
      {
        name: 'Bank Indonesia',
        industry: 'FINANCE',
        quote: '"Training digital marketing dari SDBI membantu meningkatkan kompetensi tim kami secara signifikan."',
        avatarIndex: 1,
      },
      {
        name: 'Telkom Indonesia',
        industry: 'TELECOMMUNICATIONS',
        quote: '"Materi workshop yang diberikan Coach Yoso sangat relevan dengan kebutuhan transformasi digital kami."',
        avatarIndex: 2,
      },
      {
        name: 'Kementerian Kominfo',
        industry: 'GOVERNMENT',
        quote: '"Pelatihan yang diberikan SDBI membantu ASN kami memahami pentingnya digitalisasi dalam pelayanan publik."',
        avatarIndex: 3,
      },
      {
        name: 'PT Astra International',
        industry: 'AUTOMOTIVE',
        quote: '"Workshop SDBI memberikan wawasan baru tentang pemanfaatan teknologi digital untuk efisiensi bisnis."',
        avatarIndex: 4,
      },
      {
        name: 'Universitas Indonesia',
        industry: 'EDUCATION',
        quote: '"Training dari SDBI sangat membantu dosen dan staf kami dalam mengembangkan kompetensi digital."',
        avatarIndex: 5,
      },
    ],
    4: [
      {
        name: 'PT Pertamina',
        industry: 'ENERGY',
        quote: '"Program MPP dari SDBI sangat membantu karyawan kami mempersiapkan masa pensiun dengan baik."',
        avatarIndex: 0,
      },
      {
        name: 'PT PLN',
        industry: 'UTILITIES',
        quote: '"Kunjungan bisnis dalam program MPP memberikan inspirasi nyata untuk memulai usaha setelah pensiun."',
        avatarIndex: 1,
      },
      {
        name: 'Kementerian BUMN',
        industry: 'GOVERNMENT',
        quote: '"SDBI memberikan pembekalan yang komprehensif untuk para calon pensiunan kami."',
        avatarIndex: 2,
      },
      {
        name: 'PT Garuda Indonesia',
        industry: 'AVIATION',
        quote: '"Program persiapan pensiun SDBI sangat terstruktur dan memberikan motivasi bagi karyawan kami."',
        avatarIndex: 3,
      },
      {
        name: 'PT Pos Indonesia',
        industry: 'LOGISTICS',
        quote: '"SDBI membantu karyawan kami menemukan peluang bisnis baru sebagai bekal masa pensiun."',
        avatarIndex: 4,
      },
      {
        name: 'PT Kereta Api Indonesia',
        industry: 'TRANSPORTATION',
        quote: '"Materi MPP dari SDBI sangat praktis dan relevan dengan kebutuhan calon pensiunan di era digital."',
        avatarIndex: 5,
      },
    ],
  };

  const activeTestimonials = testimonials[activeTab] || [];

  // Reset slider position when switching tabs
  useEffect(() => {
    setActiveSlide(0);
    sliderRef.current?.scrollTo({ left: 0, behavior: 'auto' });
  }, [activeTab]);

  const handleSliderScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveSlide(index);
  };

  const goToSlide = (index: number) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
    setActiveSlide(index);
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-[#0A1E3F]">
            Apa Kata Klien dan Peserta Tentang
            <br />
            <span className="border-b-4 border-[#D4A843] pb-1">Sekolah Digital Bisnis Indonesia</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-dashed border-gray-300 pb-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 text-sm font-bold transition-all duration-300 rounded-t-lg ${
                activeTab === index
                  ? 'text-[#0A1E3F] border-b-4 border-[#0A1E3F]'
                  : 'text-[#6B7280] hover:text-[#0A1E3F]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Testimonial Slider (mobile) / Grid (desktop) */}
        <div
          ref={sliderRef}
          onScroll={handleSliderScroll}
          className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scroll-smooth -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {activeTestimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 shrink-0 w-full snap-center md:shrink md:w-auto"
            >
              {/* Avatar & Name */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden relative shrink-0 border-2 border-[#D4A843]">
                  <Image
                    src={avatarImages[item.avatarIndex]}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0A1E3F]">{item.name}</h4>
                  <p className="text-xs text-[#6B7280] uppercase tracking-wider">{item.industry}</p>
                </div>
              </div>

              {/* Quote */}
              <p className="text-sm text-[#374151] leading-relaxed">
                {item.quote}
              </p>
            </div>
          ))}
        </div>

        {/* Slide dots (mobile only) */}
        <div className="flex md:hidden justify-center gap-2 mt-5">
          {activeTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Ke testimoni ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === index ? 'w-6 bg-[#0A1E3F]' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
