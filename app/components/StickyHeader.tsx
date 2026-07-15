'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import MarqueeBar from './MarqueeBar';

// Section ids that anchor links across the site jump to (Navbar, MarqueeBar,
// Hero, FounderProfile, Portfolio, ...)
const ANCHOR_IDS = ['beranda', 'layanan', 'portofolio', 'artikel', 'hubungi-kami', 'konsultasi'];

export default function StickyHeader() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerHeightRef = useRef(0);

  // Header is fixed (out of document flow), so reserve its height with a
  // spacer to keep the page content from rendering underneath it.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const updateHeight = () => {
      const height = el.offsetHeight;
      setHeaderHeight(height);
      headerHeightRef.current = height;
    };
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll so the target section's top lands just below the fixed header.
  // Done in JS (rather than CSS scroll-margin-top) so the offset is always
  // correct regardless of how the navigation was triggered.
  const scrollToId = useCallback((id: string, behavior: ScrollBehavior = 'smooth') => {
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeightRef.current;
    window.scrollTo({ top: Math.max(top, 0), behavior });
  }, []);

  // Intercept clicks on any #hash link across the site so the fixed header
  // is accounted for, instead of relying on the framework's default scroll.
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute('href')?.slice(1);
      if (!id || !ANCHOR_IDS.includes(id) || !document.getElementById(id)) return;
      e.preventDefault();
      history.pushState(null, '', `#${id}`);
      scrollToId(id);
    };
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [scrollToId]);

  // Handle a hash already present on initial load (direct link, refresh).
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id || !ANCHOR_IDS.includes(id)) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToId(id, 'auto'));
    });
  }, [scrollToId]);

  return (
    <>
      <div ref={headerRef} className="fixed top-0 left-0 right-0 z-[100] flex flex-col">
        <MarqueeBar className="order-1" />
        <Navbar className="order-2" />
      </div>
      <div style={{ height: headerHeight }} />
    </>
  );
}
