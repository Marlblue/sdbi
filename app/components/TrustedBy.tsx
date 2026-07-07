'use client';

import Image from 'next/image';

export default function TrustedBy() {
  const partners = [
    { name: 'BKKBN', logo: '/logos/logo-bkkbn.png' },
    { name: 'SMA Labschool Jakarta', logo: '/logos/labschoollogo.png' },
    { name: 'BPJS Ketenagakerjaan', logo: '/logos/bpjs-ketenagakerjaan.png' },
    { name: 'BPJS Kesehatan', logo: '/logos/bpjs-kesehatan-logo.png' },
    { name: 'PLN Icon Plus', logo: '/logos/pln-logo.png' },
    { name: 'TBINA', logo: '/logos/tbina.png' },
    { name: 'Institut Teknologi Nasional', logo: '/logos/itenas.png' },
    { name: 'Universitas Gadjah Mada', logo: '/logos/ugm-logo.png' },
    { name: 'RS Permata Gunung Putri', logo: '/logos/rs-permata-gunung-putri.png' },
    { name: 'Telkom University', logo: '/logos/telkom-university.png' },
    { name: 'Telkomsel', logo: '/logos/telkomsel.png' },
  ];

  const row1 = partners.slice(0, 6);
  const row2 = partners.slice(6);
  
  // Duplicate for seamless marquee
  const marqueeRow1 = [...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2];

  return (
    <section className="bg-white py-16 md:py-20 overflow-hidden">
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marqueeLeft 30s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 30s linear infinite;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-[1.3rem] md:text-2xl font-bold text-[#0A1E3F] italic">
            Dipercaya Oleh perusahaan, Institusi & Organisasi Terkemuka
          </h2>
        </div>

        {/* Logo Container - White Card */}
        <div className="bg-white rounded-[32px] shadow-[0_0_40px_rgba(0,0,0,0.06)] py-10 px-4 md:px-12 relative overflow-hidden">
          <div className="flex flex-col gap-6 md:gap-8">
            {/* Row 1 - Moves Right */}
            <div className="flex w-max animate-marquee-right gap-8 md:gap-14">
              {marqueeRow1.map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center transition-transform hover:scale-110 w-24 h-12 md:w-36 md:h-16 shrink-0"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={140}
                    height={60}
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                  />
                </div>
              ))}
            </div>

            {/* Row 2 - Moves Left */}
            <div className="flex w-max animate-marquee-left gap-8 md:gap-14">
              {marqueeRow2.map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center transition-transform hover:scale-110 w-24 h-12 md:w-36 md:h-16 shrink-0"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={140}
                    height={60}
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
