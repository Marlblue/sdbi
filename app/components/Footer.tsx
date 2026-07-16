import Image from 'next/image';
import Link from 'next/link';
import ChatWidget from './ChatWidget';

export default function Footer() {
  const layanan = [
    'Keynote Speaker',
    'Corporate Training',
    'Business Consulting',
    'Digital Marketing',
    'SEO & AI SEO',
    'Paid Ads',
    'Program MPP',
  ];

  const socialLinks = [
    { name: 'Facebook', icon: 'fb', href: 'https://www.facebook.com/SekolahDigitalBisnisIndonesia/' },
    { name: 'Instagram', icon: 'ig', href: 'https://www.instagram.com/sekolahdigitalbisnisindonesia/' },
    { name: 'YouTube', icon: 'yt', href: 'https://www.youtube.com/@sekolahdigitalbisnis' },
    { name: 'LinkedIn', icon: 'li', href: 'https://id.linkedin.com/company/sekolah-digital-bisnis-indonesia' },
  ];

  return (
    <footer className="bg-[#0A1E3F] text-white" id="hubungi-kami">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1 - Logo & Description */}
          <div className="md:col-span-1">
            <Image
              src="/logos-footer/logo-sdbi-footer.webp"
              alt="Sekolah Digital Bisnis Indonesia"
              width={250}
              height={100}
              className="h-auto w-40 object-contain mb-6"
            />
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Revenue Growth & Digital Transformation Partner untuk perusahaan, BUMN, dan institusi pendidikan di Indonesia.
            </p>

            {/* Social Icons */}
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              FOLLOW US
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-[#F5821F] rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.name}
                >
                  {social.icon === 'fb' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                  {social.icon === 'ig' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  )}
                  {social.icon === 'yt' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  )}
                  {social.icon === 'li' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2 - Layanan */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6">LAYANAN</h3>
            <ul className="space-y-3">
              {layanan.map((item, index) => (
                <li key={index}>
                  <Link href="#layanan" className="text-gray-300 hover:text-[#F5821F] transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Hubungi Kami */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6">HUBUNGI KAMI</h3>
            <div className="space-y-5">
              <div>
                <p className="font-semibold text-sm mb-1">WhatsApp</p>
                <p className="text-gray-300 text-sm">+62 852-1143-6032</p>
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">Email</p>
                <p className="text-gray-300 text-sm">info@sdbi.co.id</p>
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">Kantor</p>
                <p className="text-gray-300 text-sm">Jakarta, Indonesia</p>
              </div>
            </div>
          </div>

          {/* Column 4 - Map */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6">LOKASI KAMI</h3>
            <div className="rounded-xl overflow-hidden border border-white/10 h-48 shadow-lg">
              <iframe
                src="https://maps.google.com/maps?q=Sekolah+Digital+Bisnis+Indonesia+(SDBI+Digital+Marketing+Agency),+Graha+Multipiranti,+Jl.+Radin+Inten+II+No.2-8,+Duren+Sawit,+Jakarta+Timur+13440&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(20%) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Kantor SDBI"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs">
              ©2026 Sekolah Digital Bisnis Indonesia (SDBI). Hak cipta dilindungi.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs">
                Kebijakan Privasi
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ChatWidget />
    </footer>
  );
}
