'use client';

import { useState, useEffect, useRef } from 'react';

function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp: number;
          const duration = 2000;
          
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Ease out quad
            const easeOut = progress * (2 - progress);
            setCount(Math.floor(easeOut * end));
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count.toLocaleString('id-ID')}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
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
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center flex-1 min-w-[120px]">
              <p className="text-3xl md:text-[2.5rem] font-bold text-[#0A1E3F] mb-1">
                <Counter end={stat.end} suffix={stat.suffix} />
              </p>
              <p className="text-xs md:text-sm text-[#6B7280] font-medium tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
