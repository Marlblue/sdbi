'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import MarqueeBar from './MarqueeBar';

export default function StickyHeader() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

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
      <div ref={headerRef} className="fixed top-0 left-0 right-0 z-[100] flex flex-col">
        <MarqueeBar className="order-1" />
        <Navbar className="order-2" />
      </div>
      <div style={{ height: headerHeight }} />
    </>
  );
}
