'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function Transformation() {
  // null = no modal, number = index of active video
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  // Hide the floating WhatsApp button while the video modal is open
  useEffect(() => {
    document.body.classList.toggle('video-modal-open', activeVideo !== null);
    return () => document.body.classList.remove('video-modal-open');
  }, [activeVideo]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const testimonials = [
    {
      name: 'Bu Dewi',
      role: 'Manager Marketing',
      org: 'RS Permata Gunung Putri',
      thumbnail: '/thumbnails-transformation/1.webp',
      youtubeId: 'uPoc4hfkJYA',
    },
    {
      name: 'Kak Rendi',
      role: 'Tim Troopers BPJS',
      org: 'BPJS Ketenagakerjaan',
      thumbnail: '/thumbnails-transformation/2.webp',
      youtubeId: 'oPQC7VS6tC0',
    },
    {
      name: 'Kak Eka',
      role: 'Tim Digital Marketing',
      org: 'Digital Executive | Sinarmas Land',
      thumbnail: '/thumbnails-transformation/3.webp',
      youtubeId: '7JDA2oJ_CQc',
    },
    {
      name: 'Dokter-dokter',
      role: 'Visual & UI/UX Design',
      org: '| UI/UX Designer | RS Permata',
      thumbnail: '/thumbnails-transformation/4.webp',
      youtubeId: 'jzSsX9zFAJU',
    },
    // Thumbnails 5–20
    {
      name: 'Cut Lisna',
      role: '',
      org: 'PLN UP 3 BANDA ACEH',
      thumbnail: '/thumbnails-transformation/5.webp',
      youtubeId: 'oPQC7VS6tC0',
    },
    {
      name: 'Andi Rizkullah',
      role: '',
      org: 'Allia Tour dan Hotel Ibis',
      thumbnail: '/thumbnails-transformation/6.webp',
      youtubeId: 'IpvceBpqfLg',
    },
    {
      name: 'Wahyu Haryadi',
      role: '',
      org: 'LSP MIGAS',
      thumbnail: '/thumbnails-transformation/7.webp',
      youtubeId: 'oEfK41Z4qIY',
    },
    {
      name: 'Rossiman',
      role: '',
      org: 'Lab School Cibubur',
      thumbnail: '/thumbnails-transformation/8.webp',
      youtubeId: 'NR_DyCpA6nM',
    },
    {
      name: 'Ibu Mira Restyawati',
      role: '',
      org: 'RS Permata Gunung Putri',
      thumbnail: '/thumbnails-transformation/9.webp',
      youtubeId: 'Ay-Z8j63u3w',
    },
    {
      name: 'Bapak Deden E Ariffan',
      role: 'Kepala Pengembang',
      org: 'Labschool Cibubur',
      thumbnail: '/thumbnails-transformation/10.webp',
      youtubeId: 'VpRBG1k9-IA',
    },
    {
      name: 'Gilang Gustiardi',
      role: 'Digital Marketing',
      org: 'Nashta Global Utama',
      thumbnail: '/thumbnails-transformation/11.webp',
      youtubeId: 'AVXE9dQqPL0',
    },
    {
      name: 'Redy Indra Wijaya',
      role: '',
      org: 'BPJS Ketenagakerjaan',
      thumbnail: '/thumbnails-transformation/12.webp',
      youtubeId: 'GnpEP3F-Zas',
    },
    {
      name: 'Ibu Rina',
      role: 'Owner',
      org: 'Orien Beauty',
      thumbnail: '/thumbnails-transformation/13.webp',
      youtubeId: '8-TTtTO9sBI',
    },
    {
      name: 'Pak Kusmanto',
      role: '',
      org: 'Koperasi Ababil Solution',
      thumbnail: '/thumbnails-transformation/14.webp',
      youtubeId: '3gUoPl1DF2A',
    },
    {
      name: 'Putri Anitasari',
      role: '',
      org: 'Pevesindo',
      thumbnail: '/thumbnails-transformation/15.webp',
      youtubeId: 'lelRVSo8DwE',
    },
    {
      name: 'Kak Muslim',
      role: '',
      org: 'Laz Rabbani',
      thumbnail: '/thumbnails-transformation/16.webp',
      youtubeId: 'ynBaBmA2Tf8',
    },
    {
      name: 'Ibu Isni',
      role: '',
      org: 'Bollen Isni',
      thumbnail: '/thumbnails-transformation/17.webp',
      youtubeId: '_gsytAcoEGM',
    },
    {
      name: 'Kak Ismi',
      role: '',
      org: 'PEVESINDO',
      thumbnail: '/thumbnails-transformation/18.webp',
      youtubeId: 'Rfw5_M-4rxw',
    },
    {
      name: 'Muhammad Al-Jundi',
      role: '',
      org: 'PEVESINDO',
      thumbnail: '/thumbnails-transformation/19.webp',
      youtubeId: 'mCJer02WGpU',
    },
    {
      name: 'Ruslan',
      role: '',
      org: 'Workshop Digital Bisnis Bersama Brand owner UMKM',
      thumbnail: '/thumbnails-transformation/20.webp',
      youtubeId: 'uEZlEqeRNZY',
    },
  ];

  const maxSlide = Math.max(0, testimonials.length - itemsPerView);
  const totalPages = Math.ceil(testimonials.length / itemsPerView);
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
    itemsPerView === 2
      ? 'w-[calc(50%-8px)]'
      : itemsPerView === 3
        ? 'w-[calc(33.333%-11px)]'
        : 'w-[calc(25%-12px)]';

  return (
    <section className="relative pt-10 md:pt-20 pb-10 md:pb-16 overflow-hidden">
      {/* Background Image - only covers top portion */}
      <div className="absolute inset-x-0 top-0 h-[78%] md:h-[70%] z-0">
        <Image
          src="/bg-transformation/Website SDBI (1).webp"
          alt="Background pattern"
          fill
          sizes="100vw"
          className="object-cover"
          quality={90}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Left text + Right image */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-10 items-start mb-0">
          {/* Left - Title & Button */}
          <div className="pt-4 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold leading-tight mb-4">
              <span className="text-[#F5821F] italic">Kisah Transformasi Klien &</span>
              <br />
              <span className="text-[#F5821F] italic">Alumni</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed max-w-md mx-auto md:mx-0">
              Dampak nyata dari strategi, pelatihan, dan pendampingan SDBI
            </p>
            <button
              onClick={() => setActiveVideo(0)}
              className="inline-flex items-center gap-3 border-2 border-gray-800 text-gray-800 px-8 py-3.5 rounded-full font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 text-sm group"
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Tonton Video
            </button>
          </div>

          {/* Right - High-Ticket Closing + Image */}
          <div className="relative flex flex-col">
            {/* Text block */}
            <div className="relative z-10 pt-0 text-center md:text-left">
              <h3 className="text-4xl md:text-5xl lg:text-[3.5rem] font-[900] text-[#0A1E3F] leading-[1.05] mb-3 tracking-tight">
                High-Ticket
                <br />
                <span className="bg-[#FFD54F] text-[#0A1E3F] px-4 py-1 inline-block rounded-md mt-2">
                  Closing
                </span>
              </h3>

              <p className="text-gray-700 italic text-base md:text-lg mt-5 leading-relaxed max-w-xs mx-auto md:mx-0" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>                &ldquo;Mengapa Produk Mahal Tidak Butuh &apos;Diskon&apos;, Tapi Butuh &apos;Edukasi&apos;.&rdquo;
              </p>

            </div>
            {/* Coach Yoso Image - stacked below text on mobile; on md+ fills the space below the quote down to the thumbnails */}
            {/* Coach Yoso Image - responsive, fades at bottom on desktop to blend with thumbnails */}
            <div
              className="relative w-[56%] aspect-[1366/1614] mx-auto mt-2 md:mt-0 md:mx-0 md:w-[55%] lg:w-[50%] md:self-start z-[5]"
              style={{
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              }}
            >
              <Image
                src="/images-transformation/image.webp"
                alt="Coach Yoso - High Ticket Closing"
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 768px) 56vw, (max-width: 1024px) 45vw, 40vw"
              />
            </div>
          </div>
        </div>

        {/* Testimonial Thumbnail Carousel */}
        <div className="relative z-20 -mt-2 md:-mt-20 px-0 md:px-14">
          {/* Left Arrow Button (desktop only) */}
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

          {/* Right Arrow Button (desktop only) */}
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

          {/* Cards Container */}
          <div
            className="overflow-hidden py-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex gap-4 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(calc(-${currentSlide * (100 / itemsPerView)}% - ${currentSlide * (16 / itemsPerView)}px))` }}
            >
              {testimonials.map((person, index) => (
                <div
                  key={index}
                  className={`${cardWidthClass} flex-shrink-0 group cursor-pointer`}
                  onClick={() => setActiveVideo(index)}
                >
                  {/* Thumbnail - fixed aspect ratio for uniform grid alignment */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-4 shadow-lg">
                    <Image
                      src={person.thumbnail}
                      alt={`Testimoni ${person.name}`}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/50 shadow-lg">
                        <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Info */}
                  <h4 className="text-gray-900 font-bold text-sm">{person.name}</h4>
                  {person.role && <p className="text-gray-500 text-xs mt-0.5">{person.role}</p>}
                  <p className="text-gray-400 text-xs font-medium">{person.org}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(Math.min(i * itemsPerView, maxSlide))}
              className={`rounded-full transition-all duration-300 ${i === currentPage
                ? 'w-8 h-2.5 bg-[#0A1E3F]'
                : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* YouTube Shorts Video Modal */}
      {activeVideo !== null && (
        <div
          className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-[380px] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              aria-label="Tutup video"
              className="absolute top-3 right-3 z-20 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${testimonials[activeVideo].youtubeId}?autoplay=1&rel=0`}
              title={`Video testimoni ${testimonials[activeVideo].name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Navigation arrows for switching between videos */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveVideo(activeVideo > 0 ? activeVideo - 1 : testimonials.length - 1);
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300"
            aria-label="Video sebelumnya"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveVideo(activeVideo < testimonials.length - 1 ? activeVideo + 1 : 0);
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300"
            aria-label="Video selanjutnya"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
