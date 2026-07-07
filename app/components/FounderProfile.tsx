import Link from 'next/link';

export default function FounderProfile() {
  const credentials = [
    'Google Certified',
    'Digital Business Consultant',
    '5 BNSP bidang Digital Marketing & web seo analitics',
    '1 BNSP Profesional Instructor Nasional',
    'Entrepreneur',
  ];

  const stats = [
    { number: '200+', label: 'Corporate Events', color: 'text-[#F5821F]' },
    { number: '20+', label: 'Tahun Pengalaman', color: 'text-[#F5821F]' },
    { number: '10.000+', label: 'Peserta Terinspirasi', color: 'text-[#F5821F]' },
  ];

  return (
    <section className="bg-gradient-to-br from-[#E8F4FD] to-[#D1ECFA] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Photo placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-200 to-blue-400 rounded-3xl h-[400px] md:h-[500px] flex items-end justify-center overflow-hidden relative">
              {/* Placeholder for Coach Yoso photo */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-6xl opacity-50 mb-4">👨‍💼</span>
                <p className="text-white font-bold mb-2 text-xl shadow-sm">Coach Yoso Lukito</p>
                {/* USER: Hapus komentar ini dan isi tag Image di bawah ini dengan foto asli */}
                <span className="bg-white/20 px-4 py-2 rounded-lg text-white text-xs font-semibold backdrop-blur-sm">
                  Ganti Foto (Rekomendasi: 600x800px)
                </span>
              </div>
              {/* Decorative handwriting text */}
              <div className="absolute top-8 left-8 text-white/50 italic text-2xl font-light" style={{ fontFamily: 'cursive' }}>
                Coach<br />Yoso Lukito
              </div>
            </div>
          </div>

          {/* Right - Profile Info */}
          <div>
            <span className="inline-block bg-[#FFD54F] text-[#0A1E3F] font-bold text-xs px-3 py-1.5 rounded uppercase tracking-wider mb-2">
              Founder & CEO SDBI
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1E3F] mb-6 mt-1">
              Coach Yoso Lukito
            </h2>
            <p className="text-[#0A1E3F] font-semibold text-base mb-4">
              Digital Business Expert & International Speaker
            </p>

            {/* Credentials */}
            <ul className="space-y-3 mb-6">
              {credentials.map((cred, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#0A1E3F] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-sm font-bold text-black">{cred}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm text-[#6B7280] mb-8 leading-relaxed">
              Telah berbicara & melatih di 200+ event bersama perusahaan dan institusi besar
            </p>

            <Link
              href="#konsultasi"
              className="inline-block bg-[#0A1E3F] text-white px-8 py-3.5 rounded-xl font-medium hover:bg-[#0A1E3F]/90 transition-colors text-sm"
            >
              Cek Profile Lengkap
            </Link>

            {/* Stats sidebar */}
            <div className="mt-8 grid grid-cols-3 gap-4 bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.number}</p>
                  <p className="text-xs text-[#6B7280] mt-1">{stat.label}</p>
                  {index < stats.length - 1 && (
                    <div className="hidden" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
