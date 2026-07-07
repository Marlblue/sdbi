'use client';

import { useState } from 'react';

export default function Gallery() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const galleryItems = [
    {
      title: 'Corporate Training',
      description: 'Fast-track program untuk belajar dan berkarir sebagai digital marketer dengan fasilitas koneksi kerja seumur hidup.',
      gradient: 'from-blue-500 to-indigo-600',
      icon: '🎓',
    },
    {
      title: 'Workshop Digital Marketing',
      description: 'Fast-track program untuk belajar dan berkarir sebagai digital marketer dengan fasilitas koneksi kerja seumur hidup.',
      gradient: 'from-orange-500 to-red-600',
      icon: '💡',
    },
    {
      title: 'Seminar & Keynote',
      description: 'Fast-track program untuk belajar dan berkarir sebagai digital marketer dengan fasilitas koneksi kerja seumur hidup.',
      gradient: 'from-teal-500 to-cyan-600',
      icon: '🎤',
    },
    {
      title: 'Business Consulting',
      description: 'Fast-track program untuk belajar dan berkarir sebagai digital marketer dengan fasilitas koneksi kerja seumur hidup.',
      gradient: 'from-purple-500 to-pink-600',
      icon: '📋',
    },
    {
      title: 'Digital Ads Training',
      description: 'Fast-track program untuk belajar dan berkarir sebagai digital marketer dengan fasilitas koneksi kerja seumur hidup.',
      gradient: 'from-emerald-500 to-green-600',
      icon: '📈',
    },
    {
      title: 'SEO Workshop',
      description: 'Fast-track program untuk belajar dan berkarir sebagai digital marketer dengan fasilitas koneksi kerja seumur hidup.',
      gradient: 'from-amber-500 to-yellow-600',
      icon: '🔎',
    },
  ];

  const itemsPerView = 3;
  const maxSlide = Math.max(0, galleryItems.length - itemsPerView);

  const prev = () => setCurrentSlide((s) => Math.max(0, s - 1));
  const next = () => setCurrentSlide((s) => Math.min(maxSlide, s + 1));

  return (
    <section className="bg-[#D1ECFA] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-bold text-[#0A1E3F] text-center mb-12">
          Galeri Kegiatan
        </h2>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prev}
            disabled={currentSlide === 0}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-30"
          >
            <svg className="w-5 h-5 text-[#0A1E3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={next}
            disabled={currentSlide >= maxSlide}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-30"
          >
            <svg className="w-5 h-5 text-[#0A1E3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)` }}
            >
              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  className="min-w-[calc(33.333%-16px)] flex-shrink-0"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                    {/* Image placeholder */}
                    <div className="h-52 bg-gray-200 flex items-center justify-center relative overflow-hidden">
                      {/* USER: Ganti div ini dengan tag Image foto galeri asli */}
                      <div className="text-center p-4">
                        <span className="text-4xl opacity-50 block mb-2">{item.icon}</span>
                        <span className="text-xs text-gray-500 font-semibold">Ganti Foto<br/>(Rekomen: 800x600)</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-[#6B7280] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
