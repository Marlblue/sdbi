'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import MarqueeBar from './MarqueeBar';

export default function StickyHeader() {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) return;

      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;

      setHidden(scrollingDown && currentScrollY > 0);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Header is fixed (out of document flow), so reserve its height with a
  // spacer to keep the page content from rendering underneath it.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const updateHeight = () => setHeaderHeight(el.offsetHeight);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-[100] flex flex-col transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'
          }`}
      >
        <Navbar className="order-1 md:order-2" onOpenChange={setMobileMenuOpen} />
        <MarqueeBar className="order-2 md:order-1" />
      </div>
      <div style={{ height: headerHeight }} />
    </>
  );
}