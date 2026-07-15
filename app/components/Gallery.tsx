'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Gallery() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const galleryItems = [
    {
      title: 'Kurasi Bisnis Digital untuk UMKM',
      image: '/images-gallery/Website-SDBI-1.png',
      description: 'Workshop Sekolah Digital Bisnis Indonesia bertema "Kurasi Bisnis Digital: Agar Produk Layak Dipilih & Dibeli Konsumen", diikuti oleh 100 UMKM dari wilayah Jabodetabek.',
    },
    {
      title: 'Corporate Training Website SEO & AI',
      image: '/images-gallery/Website-SDBI-2.png',
      description: 'Pelatihan optimasi website berbasis SEO dan AI Search untuk tim Labschool Cibubur bersama Tim IT, Tim Creative dan Tim SEO internal Labschool.',
    },
    {
      title: 'Pemberdayaan UMKM Bersama PT PLN (Persero)',
      image: '/images-gallery/Website-SDBI-3.png',
      description: 'Melalui Program TJSL Museum Listrik dan Energi Baru (MLEB), Sekolah Digital Bisnis Indonesia membekali UMKM binaan PLN dengan strategi digital marketing, AI Search, dan transformasi digital untuk meningkatkan daya saing bisnis.',
    },
    {
      title: 'Kolaborasi PT PLN (Persero) dan SDBI di Aceh',
      image: '/images-gallery/Website-SDBI-4.png',
      description: 'Program kolaborasi PT PLN (Persero) dan Sekolah Digital Bisnis Indonesia (SDBI) yang diikuti oleh lebih 100 Manager dan Pimpinan Cabang PLN di Aceh untuk memperkuat kompetensi digital marketing serta mendukung percepatan transformasi digital.',
    },
    {
      title: 'Digital Marketing KOL & SEO Training',
      image: '/images-gallery/Website-SDBI-5.png',
      description: 'Kolaborasi Labschool Cibubur dan Sekolah Digital Bisnis Indonesia. Pelatihan digital marketing yang membahas strategi Key Opinion Leader (KOL), Search Engine Optimization (SEO), dan pengembangan brand digital untuk meningkatkan visibilitas, kredibilitas, serta performa pemasaran di era digital.',
    },
    {
      title: 'Kolaborasi BKKBN bersama SDBI',
      image: '/images-gallery/Website-SDBI-6.png',
      description: 'Program persiapan kurasi produk UPPKA untuk meningkatkan kualitas, inovasi, promosi, dan daya saing usaha melalui penguatan strategi bisnis di era ekosistem digital. Kegiatan ini diikuti oleh lebih dari 5.000 UMKM dari seluruh Indonesia dan diselenggarakan secara hybrid.',
    },
  ];

  const maxSlide = Math.max(0, galleryItems.length - itemsPerView);
  const totalPages = Math.ceil(galleryItems.length / itemsPerView);
  const currentPage = Math.min(Math.floor(currentSlide / itemsPerView), totalPages - 1);

  const prev = () => setCurrentSlide((s) => Math.max(0, s - itemsPerView));
  const next = () => setCurrentSlide((s) => Math.min(maxSlide, s + itemsPerView));

  // Swipe support for mobile
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 40;
    if (touchDeltaX.current < -swipeThreshold) {
      next();
    } else if (touchDeltaX.current > swipeThreshold) {
      prev();
    }
    touchDeltaX.current = 0;
  };

  // Fixed width for each card based on itemsPerView
  const cardWidthClass =
    itemsPerView === 1
      ? 'w-full'
      : itemsPerView === 2
        ? 'w-[calc(50%-8px)]'
        : 'w-[calc(33.333%-11px)]';

  return (
    <section className="bg-[#D1ECFA] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-bold text-[#0A1E3F] text-center mb-12">
          Galeri Kegiatan
        </h2>

        {/* Carousel */}
        <div className="relative px-0 md:px-14">
          {/* Navigation Buttons (desktop only) */}
          <button
            onClick={prev}
            disabled={currentSlide === 0}
            className="hidden md:flex absolute left-0 top-[45%] -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-full items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Slide sebelumnya"
          >
            <svg className="w-6 h-6 text-[#0A1E3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={next}
            disabled={currentSlide >= maxSlide}
            className="hidden md:flex absolute right-0 top-[45%] -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-full items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Slide selanjutnya"
          >
            <svg className="w-6 h-6 text-[#0A1E3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Card Slides */}
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex gap-4 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(calc(-${currentSlide * (100 / itemsPerView)}% - ${currentSlide * (16 / itemsPerView)}px))` }}
            >
              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  className={`${cardWidthClass} flex-shrink-0`}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 md:h-56 flex-shrink-0 overflow-hidden bg-gray-100">
                      <Image
                        src={item.image}
                        alt={`Galeri Kegiatan ${item.title}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex-1 min-h-0 overflow-hidden p-5 flex flex-col">
                      <h3 className="text-base font-bold text-[#0A1E3F] mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed line-clamp-4">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(Math.min(i * itemsPerView, maxSlide))}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentPage === i
                  ? 'bg-[#0A1E3F] scale-125'
                  : 'bg-[#0A1E3F]/25 hover:bg-[#0A1E3F]/50'
                }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
