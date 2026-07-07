'use client';

import { useState } from 'react';

export default function FAQ() {
  const faqs = [
    {
      question: 'Berapa rate card Coach Yoso sebagai pembicara?',
      answer:
        'Biaya bergantung pada durasi, format, dan lokasi acara. Kami sesuaikan dari talkshow internal, seminar publik, hingga konferensi nasional. Hubungi kami untuk mendapat proposal yang sesuai kebutuhan dan anggaran acara Anda.',
    },
    {
      question: 'Program Corporate Training apa saja yang tersedia?',
      answer:
        'Kami menyediakan program Corporate Training meliputi Digital Marketing, SEO & AI Search Optimization, Social Media Management, Content Marketing, Digital Ads, Public Speaking, Leadership, dan Business Development. Semua program dapat disesuaikan dengan kebutuhan perusahaan.',
    },
    {
      question: 'Apakah SDBI bisa menangani digital marketing perusahaan secara penuh?',
      answer:
        'Ya, SDBI menyediakan layanan Full Digital Marketing Management yang mencakup strategi, konten, iklan digital, SEO, dan analitik. Kami mengelola seluruh aspek digital marketing perusahaan Anda secara terukur.',
    },
    {
      question: 'Bagaimana proses kerja sama digital marketing dengan SDBI?',
      answer:
        'Proses dimulai dari konsultasi awal untuk memahami kebutuhan, lalu kami menyusun strategi, menjalankan implementasi, dan memberikan laporan berkala. Setiap tahap transparan dan terukur.',
    },
    {
      question: 'Apakah SDBI melayani perusahaan di luar Jakarta?',
      answer:
        'Tentu! SDBI melayani perusahaan di seluruh Indonesia. Untuk layanan digital marketing dan consulting bisa dilakukan secara online, sementara untuk training dan workshop bisa dilakukan onsite di lokasi Anda.',
    },
    {
      question: 'Apakah SDBI melayani konsultasi bisnis dan digital marketing?',
      answer:
        'Ya, SDBI menyediakan layanan konsultasi bisnis dan digital marketing baik secara private maupun project-based. Kami membantu perusahaan menyusun strategi yang tepat untuk meningkatkan revenue.',
    },
    {
      question: 'Apa saja yang termasuk dalam layanan Full Digital Marketing Management?',
      answer:
        'Layanan ini mencakup Social Media Management, Content Creation, Digital Ads (Meta, Google, TikTok), SEO & AI Search Optimization, Website Management, Email Marketing, dan Performance Reporting.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <span className="text-[#F5821F] font-semibold text-sm uppercase tracking-widest">FAQ</span>

        {/* Heading */}
        <h2 className="text-2xl md:text-4xl font-bold text-[#0A1E3F] mt-2 mb-10">
          Yang Sering Ditanyakan{' '}
          <span className="italic font-normal text-[#6B7280]">Client</span>
        </h2>

        {/* FAQ Items */}
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-[#D4A843]/30">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="font-semibold text-sm md:text-base text-[#0A1E3F] pr-8 group-hover:text-[#F5821F] transition-colors">
                  {faq.question}
                </span>
                <span className={`text-[#D4A843] text-2xl flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 pb-5' : 'max-h-0'
                }`}
              >
                <p className="text-sm text-[#6B7280] leading-relaxed pr-8">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
