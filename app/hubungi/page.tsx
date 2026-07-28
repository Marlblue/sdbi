import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import StickyHeader from '../components/StickyHeader';
import Footer from '../components/Footer';
import HubungiServiceScroller from '../components/HubungiServiceScroller';

export const metadata: Metadata = {
  title: 'Sekolah Digital Bisnis Indonesia | Hubungi',
  description:
    'Semua tautan penting SDBI dalam satu halaman: konsultasi WhatsApp, layanan, e-course & e-book, profil Coach Yoso, komunitas, dan sosial media.',
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Sekolah Digital Bisnis Indonesia | Hubungi',
    description:
      'Semua tautan penting SDBI dalam satu halaman: konsultasi WhatsApp, layanan, e-course & e-book, profil Coach Yoso, komunitas, dan sosial media.',
    url: 'https://sekolahdigitalbisnis.com/hubungi',
    type: 'website',
    locale: 'id_ID',
  },
};

const mainLinks = [
  { icon: 'business_center', label: 'Layanan Kami', href: '/layanan' },
  { icon: 'menu_book', label: 'eCourse & eBook', href: '/e-course' },
  { icon: 'person_check', label: 'Profile Coach Yoso', href: '/profil-yoso-lukito' },
];

const joinCommunityHref = 'https://chat.whatsapp.com/CzTgFEipBaGFS6UJPRZUIq';

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/sekolahdigitalbisnisindonesia/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@sekolahdigitalbisnis',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/SekolahDigitalBisnisIndonesia/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/6285211436032',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.32 4.94L2 22l5.2-1.35a9.94 9.94 0 004.84 1.24h.01c5.52 0 10-4.48 10-10S17.56 2 12.04 2zm0 18.15h-.01c-1.51 0-2.98-.4-4.26-1.17l-.3-.18-3.09.8.83-3-.2-.32a8.13 8.13 0 01-1.25-4.31c0-4.49 3.66-8.15 8.16-8.15 2.18 0 4.22.85 5.76 2.39a8.09 8.09 0 012.39 5.76c0 4.49-3.66 8.18-8.03 8.18zm4.47-6.13c-.24-.12-1.44-.71-1.67-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.35-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42-.14-.01-.3-.01-.46-.01a.9.9 0 00-.65.3c-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.11-.22-.17-.46-.29z" />
      </svg>
    ),
  },
];

export default function HubungiPage() {
  return (
    <>
      <StickyHeader />
      <div className="bg-[#f6faff] text-[#141d23] min-h-screen flex flex-col items-center">
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <style>{`
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <main className="w-full max-w-[480px] px-6 pt-12 pb-24 flex flex-col gap-12">
        {/* Header Branding & Intro */}
        <section className="text-center space-y-4">
          <Image
            src="/logos-navbar/logo-sdbi-new.webp"
            alt="Sekolah Digital Bisnis Indonesia"
            width={220}
            height={70}
            className="h-20 w-auto mx-auto object-contain"
            priority
          />
          <h2 className="text-3xl font-extrabold text-[#01072b] leading-tight">
            Empowering Your Digital Growth
          </h2>
          <p className="text-[#46464e] text-sm leading-relaxed">
            Jembatan profesional antara edukasi tradisional dan ekonomi digital masa kini.
          </p>
        </section>

        {/* Highlight Layanan Section */}
        <section className="bg-white rounded-xl overflow-hidden shadow-md border border-[#c6c5cf]/30 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-[#01072b]">Layanan Unggulan Kami</h3>
            <Link
              href="https://wa.me/6285211436032"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-[#feba42] text-[#171f42] rounded-full font-bold text-[10px] shadow-sm hover:opacity-90 transition-opacity uppercase tracking-wider"
            >
              Konsultasi
            </Link>
          </div>
          <HubungiServiceScroller />
        </section>

        {/* Main Buttons Section */}
        <section className="flex flex-col gap-3">
          <Link
            href="https://wa.me/6285211436032"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-5 bg-[#01072b] text-white rounded-xl shadow-md border-2 border-[#feba42] active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#feba42]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[#feba42] text-3xl">chat</span>
              </div>
              <div>
                <div className="font-bold text-lg leading-tight">Konsultasi WhatsApp</div>
                <div className="text-[11px] text-[#bdc4f1]">Solusi Digital Personal & Cepat</div>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#feba42]">arrow_forward_ios</span>
          </Link>

          {mainLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 p-5 bg-white text-[#01072b] rounded-xl shadow-sm border border-[#c6c5cf]/30 hover:bg-[#ecf5fe] active:scale-[0.98] transition-colors"
            >
              <span className="material-symbols-outlined text-[#01072b]">{item.icon}</span>
              <span className="font-bold flex-1 text-base">{item.label}</span>
              <span className="material-symbols-outlined text-[#c6c5cf]">navigate_next</span>
            </Link>
          ))}

          <Link
            href={joinCommunityHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 bg-white text-[#01072b] rounded-xl shadow-sm border border-[#c6c5cf]/30 hover:bg-[#ecf5fe] active:scale-[0.98] transition-colors"
          >
            <span className="material-symbols-outlined text-[#01072b]">groups</span>
            <span className="font-bold flex-1 text-base">Join Community</span>
            <span className="material-symbols-outlined text-[#c6c5cf]">navigate_next</span>
          </Link>
        </section>

        {/* Lokasi */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-[#7f5600] flex items-center gap-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>
              location_on
            </span>
            LOKASI KAMI
          </h3>
          <div className="rounded-xl overflow-hidden shadow-md border border-[#c6c5cf]/30 h-48">
            <iframe
              src="https://maps.google.com/maps?q=Sekolah+Digital+Bisnis+Indonesia+(SDBI+Digital+Marketing+Agency),+Graha+Multipiranti,+Jl.+Radin+Inten+II+No.2-8,+Duren+Sawit,+Jakarta+Timur+13440&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Kantor SDBI"
            />
          </div>
          <p className="text-[#46464e] text-sm leading-relaxed">
            Graha Multipiranti, Jl. Radin Inten II No.2-8, Duren Sawit, Jakarta Timur 13440
          </p>
        </section>

        {/* Get In Touch */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-[#c6c5cf]/30" />
            <h4 className="text-xs font-bold text-[#76767f] uppercase tracking-widest text-center">
              Get In Touch
            </h4>
            <div className="h-[1px] flex-1 bg-[#c6c5cf]/30" />
          </div>

          <div className="flex justify-center gap-6">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-[#e6eff8] text-[#01072b] hover:bg-[#feba42] hover:text-[#704b00] transition-all"
              >
                {social.icon}
              </Link>
            ))}
          </div>

          <div className="grid gap-3">
            <Link
              href="https://sekolahdigitalbisnis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 bg-[#ecf5fe] text-[#01072b] rounded-lg text-sm font-bold border border-[#c6c5cf]/20"
            >
              <span className="material-symbols-outlined text-sm">language</span>
              sekolahdigitalbisnis.com
            </Link>
          </div>
        </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
