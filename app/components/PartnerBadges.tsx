import Image from 'next/image';
import AnimateOnScroll from './AnimateOnScroll';

export default function PartnerBadges() {
  const partners = [
    { name: 'Google Partner', logo: '/logos-partner-badges/badge-google1.webp' },
    { name: 'Google Certified', logo: '/logos-partner-badges/badge-google2.webp' },
    { name: 'Meta Business Partners', logo: '/logos-partner-badges/meta-badge.webp' },
    { name: 'TikTok Marketing Partners', logo: '/logos-partner-badges/tiktok-badge.webp' },
    { name: 'BNSP', logo: '/logos-partner-badges/bnsp-badge.webp' },
    { name: 'OSS', logo: '/logos-partner-badges/oss-badge.webp' },
  ];

  return (
    <section className="bg-gray-50 pb-16 md:pb-24 -mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="scale-in" duration={700}>
          <div className="bg-blue-100/70 backdrop-blur-sm rounded-3xl md:rounded-full py-6 md:py-8 px-6 md:px-12 border border-blue-200/50 shadow-sm">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-6 md:gap-6 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="relative flex items-center justify-center h-10 md:h-14"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="150px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}