'use client';

import { useState } from 'react';

export default function Testimonials() {
  const tabs = [
    'Digital Marketing',
    'SEO & AI Search Optimization',
    'Peserta Business Consulting',
    'Training dan Workshop',
    'Masa Persiapan Pensiun',
  ];

  const [activeTab, setActiveTab] = useState(0);

  const testimonials: Record<number, Array<{
    name: string;
    industry: string;
    quote: string;
    avatar: string;
  }>> = {
    0: [
      {
        name: 'Labschool Cibubur',
        industry: 'EDUCATION',
        quote: '"SDBI membantu kami mengelola strategi digital marketing secara lebih terarah, mulai dari konten hingga kampanye digital untuk meningkatkan awareness dan engagement calon peserta didik."',
        avatar: '🏫',
      },
      {
        name: 'Shuka Grill Pekalongan',
        industry: 'FOOD & BEVERAGE',
        quote: '"Strategi konten dan promosi digital yang dijalankan SDBI membantu meningkatkan visibilitas brand serta memperkuat interaksi dengan pelanggan."',
        avatar: '🍽️',
      },
      {
        name: 'RS Permata Gunung Putri',
        industry: 'HEALTHCARE & BEAUTY',
        quote: '"SDBI membantu kami menyampaikan informasi layanan rumah sakit secara lebih efektif melalui strategi digital marketing yang tepat sasaran."',
        avatar: '🏥',
      },
      {
        name: 'Trupastry',
        industry: 'FOOD & BEVERAGE',
        quote: '"SDBI membantu membangun komunikasi brand yang lebih konsisten sehingga produk kami lebih dikenal dan mudah diterima oleh target pasar."',
        avatar: '🧁',
      },
      {
        name: 'Visa Optik',
        industry: 'RETAIL',
        quote: '"SDBI membantu kami menyampaikan informasi layanan rumah sakit secara lebih efektif melalui strategi digital marketing yang tepat sasaran."',
        avatar: '👓',
      },
      {
        name: 'PEVESINDO',
        industry: 'INDUSTRIAL, MANUFACTURING & RETAIL',
        quote: '"SDBI membantu mengembangkan strategi digital marketing yang lebih terstruktur untuk mendukung pertumbuhan bisnis dan peningkatan brand visibility."',
        avatar: '🏭',
      },
    ],
    1: [
      {
        name: 'Tech Startup Indonesia',
        industry: 'TECHNOLOGY',
        quote: '"Dengan optimasi SEO dari SDBI, website kami berhasil naik ke halaman pertama Google untuk keyword-keyword utama bisnis kami."',
        avatar: '💻',
      },
      {
        name: 'Klinik Kecantikan Glow',
        industry: 'HEALTHCARE & BEAUTY',
        quote: '"Traffic organik website kami meningkat 400% setelah menerapkan strategi SEO dan AI Search yang direkomendasikan SDBI."',
        avatar: '✨',
      },
      {
        name: 'PT Maju Sejahtera',
        industry: 'MANUFACTURING',
        quote: '"SDBI membantu kami memahami dan memanfaatkan AI Search untuk meningkatkan visibilitas bisnis di era digital."',
        avatar: '🏢',
      },
    ],
    2: [
      {
        name: 'CV Berkah Mandiri',
        industry: 'RETAIL',
        quote: '"Konsultasi bisnis bersama SDBI membantu kami menemukan strategi yang tepat untuk meningkatkan revenue secara signifikan."',
        avatar: '🛍️',
      },
      {
        name: 'Resto Nusantara',
        industry: 'FOOD & BEVERAGE',
        quote: '"Pendampingan bisnis dari SDBI sangat membantu dalam menyusun strategi pemasaran yang lebih efektif dan terukur."',
        avatar: '🍜',
      },
      {
        name: 'Salon Modern',
        industry: 'BEAUTY',
        quote: '"SDBI membantu kami merancang model bisnis yang lebih scalable dan efisien."',
        avatar: '💇',
      },
    ],
    3: [
      {
        name: 'BPJS Ketenagakerjaan',
        industry: 'GOVERNMENT',
        quote: '"Workshop yang diberikan SDBI sangat aplikatif dan langsung bisa diterapkan oleh tim kami."',
        avatar: '🏛️',
      },
      {
        name: 'Bank Indonesia',
        industry: 'FINANCE',
        quote: '"Training digital marketing dari SDBI membantu meningkatkan kompetensi tim kami secara signifikan."',
        avatar: '🏦',
      },
      {
        name: 'Telkom Indonesia',
        industry: 'TELECOMMUNICATIONS',
        quote: '"Materi workshop yang diberikan Coach Yoso sangat relevan dengan kebutuhan transformasi digital kami."',
        avatar: '📡',
      },
    ],
    4: [
      {
        name: 'PT Pertamina',
        industry: 'ENERGY',
        quote: '"Program MPP dari SDBI sangat membantu karyawan kami mempersiapkan masa pensiun dengan baik."',
        avatar: '⛽',
      },
      {
        name: 'PT PLN',
        industry: 'UTILITIES',
        quote: '"Kunjungan bisnis dalam program MPP memberikan inspirasi nyata untuk memulai usaha setelah pensiun."',
        avatar: '⚡',
      },
      {
        name: 'Kementerian BUMN',
        industry: 'GOVERNMENT',
        quote: '"SDBI memberikan pembekalan yang komprehensif untuk para calon pensiunan kami."',
        avatar: '🏢',
      },
    ],
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

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(testimonials[activeTab] || []).map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
            >
              {/* Avatar & Name */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-xl overflow-hidden relative shrink-0 border border-gray-300">
                  {/* USER: Ganti div ini dengan tag Image foto orang */}
                  <span className="opacity-40">{item.avatar}</span>
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
      </div>
    </section>
  );
}
