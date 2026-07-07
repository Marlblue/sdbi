import Link from 'next/link';

export default function Transformation() {
  const testimonialPeople = [
    { name: 'Bu Dewi', role: 'Manager Marketing', org: 'RS Permata Gunung Putri', gradient: 'from-blue-400 to-purple-500' },
    { name: 'Kak Rendi', role: 'Tim Troopers BPJS', org: 'BPJS Ketenagakerjaan', gradient: 'from-green-400 to-teal-500' },
    { name: 'Kak Eka', role: 'Tim Digital Marketing', org: 'Digital Executive | Sinarmas Land', gradient: 'from-orange-400 to-red-500' },
    { name: 'Dokter-dokter', role: 'Visual & UI/UX Design', org: '| UI/UX Designer | RS Permata', gradient: 'from-pink-400 to-rose-500' },
  ];

  return (
    <section className="bg-[#1A1A2E] bg-grid-pattern py-16 md:py-24 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-40 h-40 border border-[#D4A843]/20 rounded-full" />
      <div className="absolute bottom-20 right-40 w-24 h-24 border border-[#D4A843]/10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Transformasi */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-[#F5821F]">Kisah Transformasi Klien &</span>
              <br />
              <span className="text-[#F5821F]">Alumni</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
              Dampak nyata dari strategi, pelatihan, dan pendampingan SDBI
            </p>
            <Link
              href="#"
              className="inline-block bg-[#F5821F] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#F5821F]/90 transition-all duration-300 text-sm"
            >
              Tonton Video
            </Link>
          </div>

          {/* Right - High-Ticket Closing */}
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="relative z-10 flex-1">
              <h3 className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight">
                High-Ticket
                <br />
                <span className="bg-[#FFD54F] text-[#0A1E3F] px-3 py-1 inline-block rounded mt-2">Closing</span>
              </h3>
              <p className="text-gray-300 italic text-base md:text-lg mt-4 leading-relaxed">
                &ldquo;Mengapa Produk Mahal Tidak Butuh &apos;Diskon&apos;, Tapi Butuh &apos;Edukasi&apos;.&rdquo;
              </p>
            </div>
            
            {/* Photo Placeholder */}
            <div className="relative w-40 h-40 md:w-56 md:h-56 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden shrink-0 border-4 border-[#D4A843]">
              {/* USER: Ganti div ini dengan tag Image foto coach yoso */}
              <div className="text-center p-2">
                <span className="text-4xl block mb-1">📸</span>
                <span className="text-[10px] text-white font-semibold">Ganti Foto<br/>Coach Yoso</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {testimonialPeople.map((person, index) => (
            <div key={index} className="group">
              {/* Video/Image placeholder */}
              <div className={`bg-gray-700 rounded-2xl h-72 mb-4 flex flex-col items-center justify-center overflow-hidden relative border border-gray-600`}>
                {/* USER: Ganti div ini dengan iframe youtube atau video tag asli */}
                <div className="text-center text-white p-4">
                  <div className="text-5xl mb-2">🎬</div>
                  <p className="text-[11px] font-semibold opacity-70">Ganti dengan Video<br/>(Portrait / Shorts)</p>
                </div>
                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all group-hover:scale-110 shadow-lg">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h4 className="text-white font-bold text-sm">{person.name}</h4>
              <p className="text-gray-400 text-xs mt-1">{person.role}</p>
              <p className="text-gray-500 text-xs font-semibold">{person.org}</p>
            </div>
          ))}
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <button className="w-8 h-2.5 rounded-full bg-[#F5821F]"></button>
          <button className="w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-white/40 transition-colors"></button>
          <button className="w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-white/40 transition-colors"></button>
        </div>
      </div>
    </section>
  );
}
