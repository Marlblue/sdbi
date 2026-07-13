'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface NavbarProps {
  className?: string;
  onOpenChange?: (open: boolean) => void;
}

export default function Navbar({ className = '', onOpenChange }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const [closeBtnPos, setCloseBtnPos] = useState({ top: 16, right: 16 });

  const menuItems = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Layanan', href: '#layanan' },
    { label: 'Portofolio', href: '#portofolio' },
    { label: 'Artikel', href: '#artikel' },
    { label: 'Hubungi Kami', href: '#hubungi-kami' },
  ];

  const toggleMobile = (next: boolean) => {
    setMobileOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        setScrolled(window.scrollY > 12);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen && hamburgerRef.current) {
      const rect = hamburgerRef.current.getBoundingClientRect();
      setCloseBtnPos({
        top: rect.top,
        right: window.innerWidth - rect.right,
      });
    }
  }, [mobileOpen]);

  return (
    <nav
      className={`relative z-[65] bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-none'
        } ${className}`}
    >
      <style>{`
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0%;
          height: 2px;
          background-color: #F5821F;
          transition: width 0.25s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-[80] flex justify-between items-center py-2 md:py-3">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="relative block w-[200px] md:w-[260px] lg:w-[320px] h-[50px] md:h-[70px] lg:h-[85px] overflow-hidden"
            >
              <Image
                src="/images/logo-sdbi.png"
                alt="Sekolah Digital Bisnis Indonesia"
                fill
                sizes="(max-width: 768px) 200px, (max-width: 1024px) 260px, 320px"
                className="object-cover object-center mix-blend-multiply"
                priority
              />
            </Link>
          </div>

          {/* Menu Desktop & CTA */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center space-x-6">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link text-gray-700 hover:text-[#0A1E3F] transition-colors font-medium text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link
              href="#konsultasi"
              className="bg-[#0A1E3F] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#0A1E3F]/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm shadow-md whitespace-nowrap ml-4"
            >
              Konsultasi Sekarang
            </Link>
          </div>

          {/* Mobile/tablet hamburger */}
          <button
            ref={hamburgerRef}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => toggleMobile(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6 text-[#0A1E3F]" viewBox="0 0 24 24" fill="none">
                <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-[#0A1E3F]" viewBox="0 0 24 24" fill="none">
                <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="4" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile full-screen menu */}
        {mounted && mobileOpen && createPortal(
          <div className="lg:hidden fixed inset-0 z-[9999] bg-white/70 backdrop-blur-md">
            <button
              className="fixed p-2 rounded-lg hover:bg-gray-100 transition-colors"
              style={{ top: closeBtnPos.top, right: closeBtnPos.right }}
              onClick={() => toggleMobile(false)}
              aria-label="Close menu"
            >
              <svg className="w-6 h-6 text-[#0A1E3F]" viewBox="0 0 24 24" fill="none">
                <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div className="flex flex-col h-full px-6 pt-28 pb-10 overflow-y-auto">
              <div className="flex-1 flex flex-col gap-10">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-block w-fit pb-1.5 text-2xl font-bold text-[#0A1E3F] border-b-2 border-dashed border-gray-300 hover:text-[#F5821F] hover:border-[#F5821F] transition-colors"
                    onClick={() => toggleMobile(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="pt-6">
                <Link
                  href="#konsultasi"
                  className="block bg-[#0A1E3F] text-white px-6 py-3.5 rounded-xl font-medium text-center hover:bg-[#0A1E3F]/90 transition-colors text-sm shadow-md"
                  onClick={() => toggleMobile(false)}
                >
                  Konsultasi Sekarang
                </Link>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </nav>
  );
}