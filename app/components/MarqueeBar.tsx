'use client';

import Link from 'next/link';

interface MarqueeItem {
  text: string;
  cta?: { label: string; href: string };
}

interface MarqueeBarProps {
  items?: MarqueeItem[];
  speed?: number; // seconds for one full loop
}

const defaultItems: MarqueeItem[] = [
  {
    text: 'Promo Konsultasi Gratis berlaku hingga 31 Juli 2026',
    cta: { label: 'Konsultasi Sekarang', href: '#konsultasi' },
  },
  {
    text: 'Program MPP Batch Baru Segera Dibuka',
    cta: { label: 'Lihat Program', href: '#layanan' },
  },
  {
    text: '500+ Perusahaan & Institusi Sudah Bergabung',
    cta: { label: 'Hubungi Kami', href: '#hubungi-kami' },
  },
];

export default function MarqueeBar({ items = defaultItems, speed = 28 }: MarqueeBarProps) {
  // duplicate items so the loop is seamless
  const loopItems = [...items, ...items];

  return (
    <div className="relative z-[60] bg-[#0A1E3F] text-white overflow-hidden">
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeScroll ${speed}s linear infinite;
        }
        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-wrapper">
        <div className="marquee-track py-2.5">
          {loopItems.map((item, index) => (
            <div key={index} className="flex items-center flex-shrink-0 px-6">
              <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                {item.text}
              </span>
              {item.cta && (
                <Link
                  href={item.cta.href}
                  className="ml-4 inline-flex items-center gap-1 bg-transparent border border-[#F5821F] text-[#F5821F] hover:bg-[#F5821F] hover:text-white transition-colors rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap"
                >
                  {item.cta.label}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </Link>
              )}
              <span className="mx-6 text-white/20">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}