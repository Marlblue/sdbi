export default function WhyChooseUs() {
  const reasons = [
    {
      number: '01',
      title: 'Berpengalaman Menangani Beragam Industri',
      description:
        'Mendampingi perusahaan, institusi, dan organisasi dalam pengembangan bisnis, pemasaran digital, serta transformasi digital.',
      numColor: 'bg-blue-100 text-[#0A1E3F]',
    },
    {
      number: '02',
      title: 'Fokus pada Pertumbuhan Revenue',
      description:
        'Membantu bisnis meningkatkan penjualan, menghasilkan lebih banyak leads, dan mempercepat pertumbuhan melalui strategi digital yang terukur.',
      numColor: 'bg-teal-100 text-[#0A1E3F]',
    },
    {
      number: '03',
      title: 'Berpengalaman Menangani Beragam Industri',
      description:
        'Mendampingi perusahaan, institusi, dan organisasi dalam pengembangan bisnis dan transformasi digital.',
      numColor: 'bg-orange-100 text-[#0A1E3F]',
    },
    {
      number: '04',
      title: 'Dipandu Praktisi yang Aktif di Industri',
      description:
        'Belajar dari praktisi yang terlibat langsung dalam berbagai proyek bisnis dan digital marketing.',
      numColor: 'bg-indigo-100 text-[#0A1E3F]',
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24" id="mengapa">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-4xl font-bold text-[#0A1E3F] leading-tight">
            Mengapa Memilih
            <br />
            Sekolah Digital Bisnis Indonesia
          </h2>
        </div>

        {/* Description */}
        <p className="text-center text-[#6B7280] text-sm md:text-base max-w-6xl mx-auto mb-12">
          Sekolah Digital Bisnis Indonesia (SDBI) adalah Digital Marketing Agency yang membantu perusahaan meningkatkan leads, penjualan, <br className="hidden lg:block" />
          dan pertumbuhan bisnis melalui layanan Digital Marketing, Corporate Training, dan Business Consulting.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white shadow-[0_0_40px_rgba(0,0,0,0.08)] rounded-[24px] p-6 lg:p-8 flex flex-col h-full hover:shadow-[0_0_50px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`${reason.numColor} w-8 h-8 rounded-[8px] flex items-center justify-center font-bold text-xs mb-5`}
              >
                {reason.number}
              </div>
              <h3 className="text-[#0A1E3F] font-bold text-[15px] lg:text-[16px] mb-4 leading-snug">
                {reason.title}
              </h3>
              <p className="text-[#9CA3AF] text-[13px] leading-[1.8] flex-grow">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
