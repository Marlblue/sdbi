import Image from 'next/image';

export default function PartnerBadges() {
  const partners = [
    { name: 'Google Partner', logo: '/images/placeholders/badge-google-partner.png' },
    { name: 'Google Certified', logo: '/images/placeholders/badge-google-certified.png' },
    { name: 'Meta Business Partners', logo: '/images/placeholders/badge-meta.png' },
    { name: 'TikTok Marketing Partners', logo: '/images/placeholders/badge-tiktok.png' },
    { name: 'BNSP', logo: '/images/placeholders/badge-bnsp.png' },
    { name: 'OSS', logo: '/images/placeholders/badge-oss.png' },
  ];

  return (
    <section className="bg-gray-50 pb-16 md:pb-24 -mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E8F4FD] rounded-full py-6 md:py-8 px-8 md:px-12">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-12 relative grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100"
              >
                {/* USER: Ganti div placeholder ini dengan tag Image atau img sungguhan */}
                <div className="bg-white/50 border border-blue-200 text-blue-800 text-[10px] md:text-xs font-semibold px-4 py-2 rounded-lg flex items-center justify-center min-w-[120px] h-full text-center">
                  Ganti Logo<br/>{partner.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
