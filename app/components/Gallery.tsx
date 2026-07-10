'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Gallery() {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const totalSlides = galleryItems.length;

  const prev = () => setCurrentSlide((s) => (s === 0 ? totalSlides - 1 : s - 1));
  const next = () => setCurrentSlide((s) => (s === totalSlides - 1 ? 0 : s + 1));

  return (
    <section className="bg-[#D1ECFA] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-bold text-[#0A1E3F] text-center mb-12">
          Galeri Kegiatan
        </h2>

        {/* Carousel */}
        <div className="relative px-12 md:px-14">
          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Slide sebelumnya"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-[#0A1E3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Slide selanjutnya"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-[#0A1E3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Single Image Slide */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    {/* Image */}
                    <div className="relative h-72 sm:h-80 md:h-[28rem] overflow-hidden bg-gray-100">
                      <Image
                        src={item.image}
                        alt={`Galeri Kegiatan ${item.title}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 80vw"
                      />
                    </div>
                    <div className="p-5 md:p-6">
                      <p className="text-sm text-[#6B7280] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'bg-[#0A1E3F] scale-125'
                    : 'bg-[#0A1E3F]/25 hover:bg-[#0A1E3F]/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
