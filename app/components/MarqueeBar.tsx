'use client';

import Link from 'next/link';

interface MarqueeItem {
  text: string;
  cta?: { label: string; href: string };
}

interface MarqueeBarProps {
  items?: MarqueeItem[];
  speed?: number; // seconds for one full loop
  className?: string;
}

const defaultItems: MarqueeItem[] = [
  {
    text: 'Free Business Consultation',
    cta: { label: 'Konsultasi Sekarang', href: 'https://wa.me/6285211436032' },
  },
  {
    text: 'Social Media Specialist Academy',
    cta: { label: 'Hubungi Kami', href: 'https://wa.me/6285211436032' },
  },
  {
    text: 'Corporate Training',
    cta: { label: 'Hubungi Kami', href: 'https://wa.me/6285211436032' },
  },
  {
    text: 'Business Speaker',
    cta: { label: 'Hubungi Kami', href: 'https://wa.me/6285211436032' },
  },
  {
    text: 'Digital Marketing Workshop',
    cta: { label: 'Hubungi Kami', href: 'https://wa.me/6285211436032' },
  },
  {
    text: 'Business Seminar',
    cta: { label: 'Hubungi Kami', href: 'https://wa.me/6285211436032' },
  },
];

export default function MarqueeBar({ items = defaultItems, speed = 28, className = '' }: MarqueeBarProps) {
  // duplicate items so the loop is seamless
  const loopItems = [...items, ...items];

  return (
    <div className={`relative z-[60] bg-[#0A1E3F] text-white overflow-hidden ${className}`}>
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
                  {...(item.cta.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
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