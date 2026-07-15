'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Counter from './Counter';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // trigger entrance animations after mount
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    {
      end: 500,
      suffix: '+',
      label: 'Perusahaan & Institusi',
    },
    {
      end: 10000,
      suffix: '+',
      label: 'Peserta Terlatih',
    },
    {
      end: 15,
      suffix: '+',
      label: 'Tahun Pengalaman',
    },
    {
      end: 98,
      suffix: '%',
      label: 'Kepuasan Klien',
    },
  ];

  return (
    <section
      className="relative pt-[70px] md:pt-[100px] pb-12 md:pb-20 overflow-hidden"
      style={{
        backgroundImage: `url('/bg-hero/background-hero.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* White overlay */}
      <div className="absolute inset-0 bg-white/40 z-0" />
      <style>{`
        @keyframes drawLine {
          from { stroke-dashoffset: 150; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeArea {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.94);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-draw-line {
          stroke-dasharray: 150;
          stroke-dashoffset: 150;
          animation: drawLine 1.5s ease-out 1.1s forwards;
        }
        .animate-fade-area {
          opacity: 0;
          animation: fadeArea 1.5s ease-out 1.1s forwards;
        }
        .reveal {
          opacity: 0;
          animation: fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .reveal-scale {
          opacity: 0;
          animation: scaleIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .cta-btn {
          transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
        }
        .cta-btn:hover {
          transform: translateY(-2px) scale(1.02);
        }
        .cta-btn:active {
          transform: translateY(0) scale(0.98);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center">
          {/* Kolom Kiri - Content */}
          <div className="md:col-span-5 space-y-5 lg:space-y-6">
            {/* Label */}
            <div
              className={`flex items-center space-x-2 ${mounted ? 'reveal' : 'opacity-0'}`}
              style={{ animationDelay: '0.05s' }}
            >
              <span className="relative flex w-1.5 h-1.5">
                <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-[#F5821F] opacity-75"></span>
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[#F5821F]"></span>
              </span>
              <span className="text-[#F5821F] font-semibold text-xs uppercase tracking-wider">
                The partner of digital Marketing
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`text-[1.75rem] md:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold leading-[1.15] tracking-tight ${mounted ? 'reveal' : 'opacity-0'}`}
              style={{ animationDelay: '0.15s' }}
            >
              <span className="text-[#F5821F] whitespace-nowrap">Revenue Growth</span>{' '}
              <span className="text-[#0A1E3F]">&</span>
              <br />
              <span className="text-[#0A1E3F] whitespace-nowrap">Digital Transformation</span>
              <br />
              <span className="text-[#0A1E3F] whitespace-nowrap">Partner</span>
            </h1>

            {/* Subheadline */}
            <p
              className={`text-[13px] md:text-[14px] leading-[1.7] max-w-[420px] ${mounted ? 'reveal' : 'opacity-0'}`}
              style={{ animationDelay: '0.3s' }}
            >
              <strong className="text-black font-bold">Untuk Perusahaan, Institusi, dan Organisasi di Indonesia</strong>
              <br />
              <span className="text-[#6B7280]">Melalui Consulting, Corporate Training, dan Digital Marketing Implementation yang Terukur.</span>
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-row flex-wrap gap-3 md:gap-4 pt-2 ${mounted ? 'reveal' : 'opacity-0'}`}
              style={{ animationDelay: '0.45s' }}
            >
              <Link
                href="#konsultasi"
                className="cta-btn bg-[#0A1E3F] text-white px-5 py-3 rounded-lg font-bold text-center hover:bg-[#0A1E3F]/90 shadow-md text-[11px] md:text-[12px]"
              >
                Konsultasi Gratis Sekarang
              </Link>
              <Link
                href="#portofolio"
                className="cta-btn bg-transparent text-[#F5821F] border-2 border-[#F5821F] px-5 py-3 rounded-lg font-bold text-center hover:bg-[#F5821F] hover:text-white shadow-md text-[11px] md:text-[12px]"
              >
                Lihat Portofolio Kami
              </Link>
            </div>
          </div>

          {/* Kolom Kanan - Image & Stats */}
          <div className="md:col-span-7 space-y-12">
            <div className="relative">
              <div
                className={`relative rounded-3xl overflow-hidden shadow-2xl ${mounted ? 'reveal-scale' : 'opacity-0'}`}
                style={{ animationDelay: '0.2s' }}
              >
                <Image
                  src="/hero-images/hero-team.png"
                  alt="SDBI Team - Digital Marketing Experts"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              {/* Floating Card */}
              <div
                className={`absolute bottom-2 right-2 bg-white rounded-xl shadow-2xl p-2 md:p-3 min-w-[90px] md:min-w-[140px] z-10 border border-gray-100 ${mounted ? 'reveal' : 'opacity-0'}`}
                style={{ animationDelay: '0.6s' }}
              >
                <div className="text-left relative">
                  <p className="text-[6px] md:text-[10px] text-[#6B7280] font-semibold mb-0.5">
                    Business Growth
                  </p>
                  <div className="text-[#25D366] text-sm md:text-xl font-extrabold flex items-center gap-1 mb-0.5">
                    <Counter end={300} prefix="+" suffix="%" /> <span className="text-xs md:text-sm">↑</span>
                  </div>
                  <p className="text-[5px] md:text-[8px] text-[#6B7280] mb-1">
                    Avg. Increase in Leads
                  </p>
                  {/* Mini sparkline */}
                  <svg className="w-full h-5 md:h-8 mt-1" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradient-hero" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0A1E3F" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#0A1E3F" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <polyline
                      className="animate-draw-line"
                      points="0,25 15,20 30,22 45,15 60,18 75,8 90,10 100,2"
                      fill="none"
                      stroke="#0A1E3F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      className="animate-fade-area"
                      points="0,25 15,20 30,22 45,15 60,18 75,8 90,10 100,2 100,30 0,30"
                      fill="url(#gradient-hero)"
                    />
                  </svg>

                  {/* Orange circle icon */}
                  <div className="hidden md:flex absolute md:-bottom-8 md:-right-8 bg-[#F5821F] w-10 h-10 md:w-12 md:h-12 rounded-full items-center justify-center shadow-lg border-4 border-white">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats below image */}
            <div className="flex justify-between items-start gap-2">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center ${mounted ? 'reveal' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                >
                  <p className="text-2xl md:text-3xl lg:text-[2.5rem] font-bold text-[#0A1E3F] mb-1">
                    <Counter end={stat.end} suffix={stat.suffix} />
                  </p>
                  <p className="text-[10px] md:text-xs lg:text-sm text-[#6B7280] font-medium tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}