import Link from 'next/link';
import Image from 'next/image';
import Counter from './Counter';

export default function FounderProfile() {
  const credentials = [
    'Google Certified',
    'Digital Business Consultant',
    '5 BNSP bidang Digital Marketing & web seo analitics',
    '1 BNSP Profesional Instructor Nasional',
    'Entrepreneur',
  ];

  const stats = [
    { end: 200, suffix: '+', label: 'Corporate Events', color: 'text-[#F5821F]' },
    { end: 20, suffix: '+', label: 'Tahun Pengalaman', color: 'text-[#F5821F]' },
    { end: 10000, suffix: '+', label: 'Peserta Terinspirasi', color: 'text-[#F5821F]' },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left - Photo (no card, directly on background) */}
          <div className="md:col-span-5">
            <Image
              src="/images-founder-profile/coach-yoso-lukito.png"
              alt="Coach Yoso Lukito - Founder & CEO SDBI"
              width={700}
              height={500}
              className="w-full h-auto object-contain"
              sizes="(max-width: 768px) 100vw, 42vw"
            />
          </div>

          {/* Middle - Profile Info */}
          <div className="md:col-span-5">
            <span className="inline-block bg-[#FFD54F] text-[#0A1E3F] font-bold text-xs px-3 py-1.5 rounded uppercase tracking-wider mb-2">
              Founder & CEO SDBI
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1E3F] mb-4 mt-1">
              Coach Yoso Lukito
            </h2>
            <p className="text-[#0A1E3F] font-semibold text-base mb-4">
              Digital Business Expert & International Speaker
            </p>

            {/* Credentials */}
            <ul className="space-y-2.5 mb-5">
              {credentials.map((cred, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#0A1E3F] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-sm font-bold text-black">{cred}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm text-[#6B7280] mb-6 leading-relaxed">
              Telah berbicara & melatih di 200+ event bersama perusahaan dan institusi besar
            </p>

            <Link
              href="#konsultasi"
              className="inline-block bg-[#0A1E3F] text-white px-8 py-3.5 rounded-xl font-medium hover:bg-[#0A1E3F]/90 transition-colors text-sm"
            >
              Cek Profile Lengkap & Portofolio
            </Link>
          </div>

          {/* Right - Stats (vertical stack) */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 space-y-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className={`text-2xl lg:text-3xl font-bold ${stat.color}`}>
                    <Counter end={stat.end} suffix={stat.suffix} />
                  </p>
                  <p className="text-[10px] lg:text-xs text-[#6B7280] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
