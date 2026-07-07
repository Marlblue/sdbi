'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Layanan', href: '#layanan' },
    { label: 'Portofolio', href: '#portofolio' },
    { label: 'Artikel', href: '#artikel' },
    { label: 'Hubungi Kami', href: '#hubungi-kami' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`relative z-50 bg-white pt-4 md:pt-6 transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-none'
      }`}
    >
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mobile-link {
          opacity: 0;
          animation: fadeInDown 0.35s ease-out forwards;
        }
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
        .hamburger-line {
          transition: transform 0.3s ease, opacity 0.2s ease;
          transform-origin: center;
        }
        .mobile-menu-wrapper {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.35s ease;
        }
        .mobile-menu-wrapper.open {
          grid-template-rows: 1fr;
        }
        .mobile-menu-inner {
          overflow: hidden;
          min-height: 0;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center pt-2">
            <Link
              href="/"
              className="relative block w-[200px] md:w-[260px] lg:w-[320px] h-[50px] md:h-[70px] lg:h-[85px] overflow-hidden"
            >
              <Image
                src="/images/logo-sdbi.png"
                alt="Sekolah Digital Bisnis Indonesia"
                fill
                className="object-cover object-center mix-blend-multiply"
                priority
              />
            </Link>
          </div>

          {/* Menu Desktop & CTA */}
          <div className="hidden md:flex items-center pt-2 md:pt-4">
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

          {/* Mobile hamburger */}
          <button
            className="md:hidden mt-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg className="w-6 h-6 text-[#0A1E3F]" viewBox="0 0 24 24" fill="none">
              <line
                className="hamburger-line"
                x1="4" y1="6" x2="20" y2="6"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                style={{
                  transform: mobileOpen ? 'translateY(6px) rotate(45deg)' : 'translateY(0) rotate(0)',
                }}
              />
              <line
                className="hamburger-line"
                x1="4" y1="12" x2="20" y2="12"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                style={{ opacity: mobileOpen ? 0 : 1 }}
              />
              <line
                className="hamburger-line"
                x1="4" y1="18" x2="20" y2="18"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                style={{
                  transform: mobileOpen ? 'translateY(-6px) rotate(-45deg)' : 'translateY(0) rotate(0)',
                }}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu-wrapper ${mobileOpen ? 'open' : ''}`}>
          <div className="mobile-menu-inner">
            <div className="md:hidden bg-white border-t border-gray-100 mt-4 py-4 space-y-1">
              {menuItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mobile-link block px-4 py-3 text-gray-700 hover:text-[#0A1E3F] hover:bg-gray-50 rounded-lg font-medium text-sm transition-colors"
                  style={{ animationDelay: mobileOpen ? `${index * 0.05}s` : '0s' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div
                className="mobile-link px-4 pt-2"
                style={{ animationDelay: mobileOpen ? `${menuItems.length * 0.05}s` : '0s' }}
              >
                <Link
                  href="#konsultasi"
                  className="block bg-[#0A1E3F] text-white px-6 py-3 rounded-xl font-medium text-center hover:bg-[#0A1E3F]/90 transition-colors text-sm shadow-md"
                  onClick={() => setMobileOpen(false)}
                >
                  Konsultasi Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}