'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// 9 avatar images from /avatar-testimonials/
const avatarImages = [
  '/avatar-testimonials/pevesindo.webp',
  '/avatar-testimonials/rs-permata-gunung-putri.webp',
  '/avatar-testimonials/nashtagroup.webp',
  '/avatar-testimonials/labschool-cibubur.webp',
  '/avatar-testimonials/koperasi-ababil-solution.webp',
  '/avatar-testimonials/frutta-gelato.webp',
  '/avatar-testimonials/visa-optik.webp',
  '/avatar-testimonials/berkah-diesel-indonesia.webp',
  '/avatar-testimonials/collagel.webp',
  '/avatar-testimonials/person1.webp',
  '/avatar-testimonials/person2.webp',
  '/avatar-testimonials/person3.webp',
  '/avatar-testimonials/person4.webp',
  '/avatar-testimonials/person5.webp',
  '/avatar-testimonials/person6.webp',
  '/avatar-testimonials/bapak-wisnu-kristianto.webp',
  '/avatar-testimonials/bapak-arie.webp',
  '/avatar-testimonials/bapak-suranto.webp',
  '/avatar-testimonials/bapak-andri-purnomo.webp',
  '/avatar-testimonials/bapak-kusmanto.webp',
  '/avatar-testimonials/bapak-dadan-noor.webp',
];

export default function Testimonials() {
  const tabs = [
    'Digital Marketing',
    'SEO & AI Search Optimization',
    'Training dan Workshop',
    'Masa Persiapan Pensiun',
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const testimonials: Record<number, Array<{
    name: string;
    industry: string;
    quote: string;
    avatarIndex: number;
  }>> = {
    0: [
      {
        name: 'Ismawati',
        industry: 'PEVESINDO',
        quote: 'Saya merasa sangat terbantu dengan adanya SDBI yang dimana saya bisa banyak belajar tentang sosial media secara spesifik. Apalagi saya dulunya di bidang keuangan, dimana saya sangat abu abu terhadap sosial media. Tetapi dengan adanya SDBI ini saya menjadi banyak mengetahui secara mendalam terkait sosial media dimana itu sangat membantu secara pribadi buat saya untuk kedepannya.',
        avatarIndex: 0,
      },
      {
        name: 'Dewi',
        industry: 'RS PERMATA GUNUNG PUTRI',
        quote: 'Banyak sekali perubahan setelah berkolaborasi dengan SDBI. Pertama mengetahui bagaimana cara pembuatan konten, peningkatan followers, dan dalam peningkatan jumlah pasien karena disini juga banyak informasi yang dibutuhkan oleh pasien kita. Harapan kami untuk RS Gunung Putri agar lebih baik lagi karena kita terus terang saja selama ini memang selalu mendapatkan bimbingan dan pendampingan dalam mengadakan konten konten.',
        avatarIndex: 1,
      },
      {
        name: 'Gilang Gustiardi',
        industry: 'PT NASHTA GLOBAL UTAMA',
        quote: 'Sejak digital marketing Nashta Group diHandle SDBI, kami banyak dibantu. Bukan hanya diberikan tools, tetapi juga diajarkan cara membaca data dan mengimplementasikannya ke dalam strategi marketing, mulai dari konten, SEO, hingga Ads. Dampaknya benar-benar terasa, branding Nashta Group semakin kuat sebagai IT Solution.',
        avatarIndex: 2,
      },
      {
        name: 'Deden E. Ariffan',
        industry: 'Labschool Cibubur',
        quote: 'Lebih dari dua tahun bekerja sama dengan SDBI, kami terus merasakan dampak yang nyata. Target pendaftaran yang kami tetapkan berhasil melampaui target setiap tahun, yang sangat kami apresiasi SDBI selalu berbagi kompetensi pengetahuan digitalisasi tanpa batas. Kami diberi pencerahan, kami diberikan ilmu yang sangat luar biasa sehingga kami bisa paham secara konsep tentang digitalisasi terutama di bidang pendidikan.',
        avatarIndex: 3,
      },
      {
        name: 'Kusmanto',
        industry: 'KOPERASI ABABIL SOLUTION',
        quote: 'Yang kami rasakan overal impactnya terasa sekali dan kita sudah mulai coba pilah customer mana yang sudah dapat info dari sosial media  dan ternyata memang banyak dari sosial media yang masuk ke kita karena kita sudah bisa mapping mana yang tau dari sosial media dan mana yang bukan. Tim Ababil mulai merasakan banyak order yang masuk terus menerus.',
        avatarIndex: 4,
      },
      {
        name: 'Almi',
        industry: 'FRUTTAGELATO',
        quote: 'Alhamdulillah saya banyak terbantu terutama di sosial media. semenjak gabung dengan SDBI saya belajar banyak. Dari koordinasi, kerjasama semua berjalan sangat lancar.',
        avatarIndex: 5,
      },
    ],
    1: [
      {
        name: 'Frutta Gelato',
        industry: 'FOOD & BEVERAGE',
        quote: 'Setelah mengoptimalkan SEO dan AI Search dari SDBI, website Frutta Gelato mulai muncul di pencarian Google untuk kata kunci seperti "gelato halal" dan "supplier gelato horeca". Dalam beberapa bulan, trafik organik meningkat dan semakin banyak calon mitra menghubungi kami melalui website.',
        avatarIndex: 5,
      },
      {
        name: 'Labschool Cibubur',
        industry: 'EDUCATION',
        quote: 'Kami mulai merasakan peningkatan visibilitas website untuk pencarian PPDB SD, SMP, dan SMA. Strategi SEO dan AI Search yang diterapkan SDBI membuat informasi sekolah lebih mudah ditemukan oleh calon orang tua siswa.',
        avatarIndex: 3,
      },
      {
        name: 'RS Permata Gunung Putri',
        industry: 'HEALTHCARE',
        quote: 'Setelah optimasi SEO dan AI Search, kami mulai menerima pasien yang mengetahui RS Permata Gunung Putri melalui Google maupun rekomendasi AI seperti ChatGPT dan Gemini. Trafik website meningkat dan jumlah pertanyaan pelayanan dari calon pasien juga bertambah.',
        avatarIndex: 1,
      },
      {
        name: 'Visa Optik',
        industry: 'OPTICAL & EYECARE',
        quote: 'Google Business Profile dan SEO lokal kami jauh lebih optimal. Kini Visa Optik lebih sering muncul di pencarian "optik terdekat" di Semarang, sehingga jumlah kunjungan Customer baru terus meningkat.',
        avatarIndex: 6,
      },
      {
        name: 'Berkah Diesel',
        industry: 'iNDUSTRI MANUFACTURING',
        quote: 'Website kini menjadi salah satu sumber utama datangnya calon pelanggan. Optimasi SEO yang dilakukan SDBI membuat layanan kami lebih mudah ditemukan oleh target pasar melalui pencarian Google.',
        avatarIndex: 7,
      },
      {
        name: 'Collagel',
        industry: 'HEALTH & NUTRITION',
        quote: 'Optimasi SEO dan AI Search membantu produk Collagel lebih mudah ditemukan di Google maupun platform AI. Kami mulai mendapatkan pelanggan yang mengaku menemukan informasi produk melalui rekomendasi AI dan pencarian organik',
        avatarIndex: 8,
      },
    ],
    2: [
      {
        name: 'Addamas Nizaroeddin',
        industry: '',
        quote: 'Saya mengikuti social media special academy selama 3 bulan mulai bulan juni sd sep 2025, selama mengikuti pelatihan Digital Marketing ini mendapat banyak materi teori, praktek Lab dan magang bersama Rekanan Vendor dari SDBI, Bravo Coach Yoso, Mb Nia, Mb Lia serta Team dari SDBI.',
        avatarIndex: 9,
      },
      {
        name: 'Sabdo Rachim',
        industry: '',
        quote: 'Alhamdulillah bisa ikut pelatihan bersama coach Yoso Lukito. Jadi menambah pengetahuan dlm digital marketing baik dlm teori, praktek dan beberapa tools yg harus di gunakan dlm membuat sebuah konten yg menarik. Semoga Allah mudahkan urusan kita semua dlm bermuamalah dlm mencari rezeki yg halal, Aamiin. Ditunggu kembali pelatihan kelas lainnya ...',
        avatarIndex: 10,
      },
      {
        name: 'Khairunnisa Nisa',
        industry: '',
        quote: 'Maa syaa Allaah Walhamdulillaah dapat kesempatan ikutan Bootcamp Digital Marketing oleh Coach Yoso Lukito di Auditorium Masjid Albarkah, selain tempatnya nyaman fasilitasnya juga good dan ilmunya daging banget ... mudah mudahan bermanfaat dan bisa aplikasinya Meskipun saya yakin masih banyak ilmu yg harus dipelajari lagi untuk mendapatkan hasil yg optimal dalam digital marketing.',
        avatarIndex: 11,
      },
      {
        name: 'Syaafati R Suryo',
        industry: '',
        quote: 'Alhamdulillaah berkesempatan gabung di WAG Sekolah Digital Bisnis Indonesia (SDBI) beberapa waktu lalu, meski belum memiliki kesempatan untuk ikut Bootcamp DigiMar-nya 😊 MaaSyaaAllah Coach Yoso shodaqoh Ilmunya gak berhenti² di WAG. Member yang bertanya pun selalu berusaha dijawab oleh Coach Yoso secara langsung, padahal beliau pribadi yang sangat sibuk sekali. Syukron Coach Yoso dan SDBI Team yang telah memfasilitasi saya untuk bisa bergabung di WAG SDBI, sehingga banyak sekali insight yang bisa saya dapatkan. Semoga menjadi pahala jariyah untuk Coach Yoso dan SDBI Team. Aamiin ... Baarakallaahu fiikum.',
        avatarIndex: 12,
      },
      {
        name: 'Kami Senin',
        industry: '',
        quote: 'Terimakasih untuk Coach Yoso dan tim atas ilmu yang dibagikan kepada kami. Seminarnya sangat membantu, sehingga kami mendapatkan insight-insight baru terhadap dunia digital marketing. Semoga Tim SDBI semakin maju dan terus berbagi ilmu dengan teman-trman diluar sana yang masih membutuhkan ilmu baru.',
        avatarIndex: 13,
      },
      {
        name: 'Eka Wiranita',
        industry: '',
        quote: 'Alhamdulillah sangat bersyukur dan senang sekali bisa mengikuti acara bootcamp Digital Bussiness dg Coach Yoso Lukito. Memberikan ilmu yang luar biasa bisa bermanfaat di berbagai bidang. Semoga bisa menjadi pahala jariyyah untuk Coach Yoso, tim SDB dan pengurus DKM masjid Al Barkah sbg penyelenggara.',
        avatarIndex: 14,
      },
    ],
    3: [
      {
        name: 'Bapak Wisnu Kristianto',
        industry: 'PENDIRI & BENDAHARA KOPERASI ABABIL SOLUTION',
        quote: 'Materinya mudah dipahami, aplikatif, dan memberikan langkah yang jelas untuk memulai bisnis. Sangat bermanfaat sebagai bekal memasuki masa pensiun.',
        avatarIndex: 15,
      },
      {
        name: 'Bapak Arie',
        industry: 'PT. RESIN PLATING TECHNOLOGY',
        quote: 'Pelatihan ini memberikan pemahaman yang jelas mengenai persiapan masa pensiun dan strategi memulai bisnis. Materinya praktis, mudah dipahami, dan sangat bermanfaat.',
        avatarIndex: 16,
      },
      {
        name: 'Bapak Suranto',
        industry: 'PENDIRI & PENGAWAS KOPERASI ABABIL SOLUTION',
        quote: 'Pelatihan ini benar-benar membuka wawasan saya. Banyak insight dan ide baru yang sebelumnya tidak pernah terpikirkan, sehingga saya lebih percaya diri untuk mengembangkan bisnis ke depan. Sangat saya rekomendasikan.',
        avatarIndex: 17,
      },
      {
        name: 'Bapak Andri Purnomo',
        industry: 'BPENDIRI & PENGAWAS KOPERASI ABABIL SOLUTION',
        quote: 'Materinya mudah dipahami, aplikatif, dan memberikan langkah yang jelas untuk memulai bisnis. Sangat bermanfaat sebagai bekal memasuki masa pensiun.',
        avatarIndex: 18,
      },
      {
        name: 'Bapak Kusmanto',
        industry: 'PENDIRI & KETUA KOPERASI',
        quote: 'SDBI membantu kami menyampaikan informasi layanan rumah sakit secara lebih efektif melalui strategi digital marketing yang tepat sasaran.',
        avatarIndex: 19,
      },
      {
        name: 'Bapak Dadan Noor',
        industry: 'PENDIRI & ketua PENGAWAS KOPERASI ABABIL SOLUTION',
        quote: 'SDBI membantu mengembangkan strategi digital marketing yang lebih terstruktur untuk mendukung pertumbuhan bisnis dan peningkatan brand visibility.',
        avatarIndex: 20,
      },
    ],
  };

  const activeTestimonials = testimonials[activeTab] || [];

  // Reset slider position when switching tabs
  useEffect(() => {
    setActiveSlide(0);
    sliderRef.current?.scrollTo({ left: 0, behavior: 'auto' });
  }, [activeTab]);

  const handleSliderScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveSlide(index);
  };

  const goToSlide = (index: number) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
    setActiveSlide(index);
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-[#0A1E3F]">
            Apa Kata Klien dan Peserta Tentang
            <br />
            <span className="border-b-4 border-[#D4A843] pb">Sekolah Digital Bisnis Indonesia</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-dashed border-gray-300 pb-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 text-sm font-bold transition-all duration-300 rounded-t-lg ${activeTab === index
                ? 'text-[#0A1E3F] border-b-4 border-[#0A1E3F]'
                : 'text-[#6B7280] hover:text-[#0A1E3F]'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Testimonial Slider (mobile) / Grid (desktop) */}
        <div
          ref={sliderRef}
          onScroll={handleSliderScroll}
          className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scroll-smooth -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {activeTestimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 shrink-0 w-full snap-center md:shrink md:w-auto"
            >
              {/* Avatar & Name */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden relative shrink-0 border-2 border-[#D4A843]">
                  <Image
                    src={avatarImages[item.avatarIndex]}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0A1E3F]">{item.name}</h4>
                  <p className="text-xs text-[#6B7280] uppercase tracking-wider">{item.industry}</p>
                </div>
              </div>

              {/* Quote */}
              <p className="text-sm text-[#374151] leading-relaxed text-justify">
                {item.quote}
              </p>
            </div>
          ))}
        </div>

        {/* Slide dots (mobile only) */}
        <div className="flex md:hidden justify-center gap-2 mt-5">
          {activeTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Ke testimoni ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${activeSlide === index ? 'w-6 bg-[#0A1E3F]' : 'w-2 bg-gray-300'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
