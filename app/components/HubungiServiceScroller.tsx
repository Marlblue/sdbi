'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

const services = [
  { image: '/images-layanan/business-digital.webp', label: 'Business & Digital Consulting' },
  { image: '/images-layanan/training-corporate.webp', label: 'Corporate Training & Workshop' },
  { image: '/images-layanan/speaker.webp', label: 'Speaker & Corporate Event' },
  { image: '/images-layanan/digital-marketing.webp', label: 'Digital Marketing Management' },
  { image: '/images-layanan/seo-ai.webp', label: 'SEO & AI Search Optimization' },
];

export default function HubungiServiceScroller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const onMouseLeaveOrUp = () => setIsDown(false);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeaveOrUp}
      onMouseUp={onMouseLeaveOrUp}
      onMouseMove={onMouseMove}
      className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
    >
      {services.map((service) => (
        <div key={service.image} className="flex-none w-[75%] snap-center flex flex-col gap-2">
          <div className="relative h-32 rounded-lg overflow-hidden border border-[#c6c5cf]/20 bg-[#e6eff8]">
            <Image
              src={service.image}
              alt={service.label}
              fill
              className="object-cover"
              sizes="75vw"
            />
          </div>
          <div className="font-bold text-xs text-[#01072b] text-center">{service.label}</div>
        </div>
      ))}
    </div>
  );
}
