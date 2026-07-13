import Image from 'next/image';

export default function PartnerBadges() {
  const partners = [
    { name: 'Google Partner', logo: '/badge-layanan/badge-google1.png' },
    { name: 'Google Certified', logo: '/badge-layanan/badge-google2.png' },
    { name: 'Meta Business Partners', logo: '/badge-layanan/meta-badge.png' },
    { name: 'TikTok Marketing Partners', logo: '/badge-layanan/tiktok-badge.png' },
    { name: 'BNSP', logo: '/badge-layanan/bnsp-badge.png' },
    { name: 'OSS', logo: '/badge-layanan/oss-badge.png' },
  ];

  return (
    <section className="bg-gray-50 pb-16 md:pb-24 -mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-100/70 backdrop-blur-sm rounded-3xl md:rounded-full py-6 md:py-8 px-6 md:px-12 border border-blue-200/50 shadow-sm">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-6 md:gap-6 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-10 md:h-14"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={150}
                  height={56}
                  style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
