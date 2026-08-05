export interface CourseModule {
  title: string;
  videoCount: number;
  duration: string;
}

export interface CourseTestimonial {
  name: string;
  role: string;
  quote: string;
}

export type CourseCategory = "Social Media" | "Advertising" | "Marketplace";
export type CourseLevel = "Pemula" | "Menengah";

export interface Course {
  slug: string;
  title: string;
  badge?: "Bestseller" | "Terbaru";
  category: CourseCategory;
  mentor: string;
  mentorTitle: string;
  level: CourseLevel;
  durationHours: number;
  gradient: string;
  icon: string;
  price: number;
  originalPrice: number;
  description: string;
  learnPoints: string[];
  modules: CourseModule[];
  testimonials: CourseTestimonial[];
  updated: string;
  /**
   * ID folder Google Drive (bukan URL) berisi seluruh video modul kelas ini,
   * shared dengan setting "Restricted". Akses diberikan per-email lewat
   * grantDriveAccess() di app/lib/googleDrive.ts setelah pembayaran lunas —
   * satu grant ke folder ini otomatis mencakup semua video di dalamnya.
   */
  driveFileId: string;
}

export const courses: Course[] = [
  {
    slug: "mastering-meta-ads",
    title: "Mastering Meta Ads untuk UMKM Beromzet Milyaran",
    badge: "Bestseller",
    category: "Advertising",
    mentor: "Aditya Wijaya",
    mentorTitle: "Meta Ads Specialist & Digital Strategist",
    level: "Menengah",
    durationHours: 12,
    gradient: "from-blue-600 to-blue-800",
    icon: "📱",
    price: 499000,
    originalPrice: 1499000,
    description:
      "Kelas ini membedah cara membangun dan mengoptimalkan kampanye Meta Ads (Facebook & Instagram) untuk UMKM yang ingin naik kelas. Anda akan belajar riset audiens, struktur kampanye, copy iklan yang konversi, hingga membaca data performa untuk terus menaikkan omzet secara terukur.",
    learnPoints: [
      "Menyusun struktur akun Meta Ads yang efisien dari nol.",
      "Riset audiens dan lookalike untuk menekan biaya iklan.",
      "Membuat creative dan copy iklan yang tinggi konversi.",
      "Strategi budgeting dan scaling kampanye tanpa boncos.",
      "Membaca Ads Manager untuk mengambil keputusan optimasi.",
      "Retargeting funnel untuk memaksimalkan repeat buyer.",
    ],
    modules: [
      { title: "Modul 1: Fondasi Ekosistem Meta Ads", videoCount: 5, duration: "50 Menit" },
      { title: "Modul 2: Riset Audiens & Lookalike", videoCount: 4, duration: "55 Menit" },
      { title: "Modul 3: Membuat Creative & Copy Iklan", videoCount: 6, duration: "80 Menit" },
      { title: "Modul 4: Budgeting & Scaling Kampanye", videoCount: 5, duration: "70 Menit" },
      { title: "Modul 5: Optimasi Data & Retargeting", videoCount: 4, duration: "60 Menit" },
    ],
    testimonials: [
      {
        name: "Herlina Putri",
        role: "Owner Toko Fashion Online",
        quote:
          "Setelah menerapkan struktur kampanye dari kelas ini, biaya iklan saya turun tapi penjualan justru naik. Sangat aplikatif.",
      },
      {
        name: "Agus Setiawan",
        role: "Pemilik UMKM Kuliner",
        quote: "Penjelasannya runtut dari nol. Sekarang saya berani kelola sendiri iklan tanpa jasa agency.",
      },
      {
        name: "Maya Anjani",
        role: "Digital Marketer Freelance",
        quote: "Bagian retargeting funnel-nya paling berharga, langsung saya terapkan ke banyak klien.",
      },
    ],
    updated: "Juli 2026",
    driveFileId: "REPLACE_MASTERING_META_ADS_FOLDER_ID",
  },
  {
    slug: "tiktok-content-creator-mastery",
    title: "TikTok Content Creator Mastery: Dari 0 ke 100k Followers",
    badge: "Terbaru",
    category: "Social Media",
    mentor: "Siti Aminah",
    mentorTitle: "TikTok Creator & Content Strategist",
    level: "Pemula",
    durationHours: 8,
    gradient: "from-pink-500 to-rose-600",
    icon: "🎵",
    price: 299000,
    originalPrice: 999000,
    description:
      "Pelajari cara membangun akun TikTok dari nol hingga menembus 100 ribu followers. Kelas ini membahas riset konten, teknik shooting & editing sederhana, algoritma TikTok, hingga cara mengubah engagement menjadi peluang bisnis dan endorse.",
    learnPoints: [
      "Menentukan niche dan positioning konten yang tepat.",
      "Riset tren dan sound yang sedang naik di TikTok.",
      "Teknik shooting dan editing dengan HP saja.",
      "Memahami algoritma FYP agar konten mudah viral.",
      "Konsistensi konten dan content calendar sederhana.",
      "Monetisasi: endorse, affiliate, hingga TikTok Shop.",
    ],
    modules: [
      { title: "Modul 1: Menentukan Niche & Positioning", videoCount: 4, duration: "40 Menit" },
      { title: "Modul 2: Riset Tren & Ide Konten", videoCount: 5, duration: "45 Menit" },
      { title: "Modul 3: Teknik Shooting & Editing HP", videoCount: 6, duration: "70 Menit" },
      { title: "Modul 4: Memahami Algoritma FYP", videoCount: 4, duration: "50 Menit" },
      { title: "Modul 5: Monetisasi & TikTok Shop", videoCount: 5, duration: "55 Menit" },
    ],
    testimonials: [
      {
        name: "Dewi Lestari",
        role: "Content Creator Pemula",
        quote: "Dalam 2 bulan konten saya mulai FYP terus setelah belajar riset sound dan hook dari kelas ini.",
      },
      {
        name: "Fajar Ramadhan",
        role: "Mahasiswa & Part-time Creator",
        quote: "Editing yang diajarkan simpel banget, cukup pakai HP tapi hasilnya rapi.",
      },
      {
        name: "Nabila Putri",
        role: "Owner Brand Skincare Lokal",
        quote: "Sekarang saya paham cara bikin konten organik yang benar-benar mendatangkan penjualan.",
      },
    ],
    updated: "Juli 2026",
    driveFileId: "REPLACE_TIKTOK_CONTENT_CREATOR_FOLDER_ID",
  },
  {
    slug: "optimasi-toko-shopee",
    title: "Optimasi Toko Shopee: Menangkan Persaingan Marketplace",
    category: "Marketplace",
    mentor: "Budi Santoso",
    mentorTitle: "Marketplace Growth Consultant",
    level: "Pemula",
    durationHours: 10,
    gradient: "from-orange-500 to-amber-600",
    icon: "🛒",
    price: 399000,
    originalPrice: 1199000,
    description:
      "Kuasai strategi memenangkan persaingan di Shopee mulai dari optimasi listing, riset kata kunci, hingga memanfaatkan fitur iklan dan promosi toko. Kelas ini dirancang untuk pemilik toko yang ingin naik peringkat pencarian dan meningkatkan konversi.",
    learnPoints: [
      "Optimasi judul dan deskripsi produk agar mudah ditemukan.",
      "Riset kata kunci yang paling banyak dicari pembeli.",
      "Strategi foto dan video produk yang meningkatkan konversi.",
      "Memanfaatkan Shopee Ads secara efektif dan efisien.",
      "Mengelola promosi toko, voucher, dan flash sale.",
      "Analisis performa toko lewat Seller Center.",
    ],
    modules: [
      { title: "Modul 1: Fondasi Optimasi Toko Shopee", videoCount: 4, duration: "45 Menit" },
      { title: "Modul 2: Riset Kata Kunci & Listing", videoCount: 5, duration: "60 Menit" },
      { title: "Modul 3: Foto & Video Produk Konversi Tinggi", videoCount: 4, duration: "50 Menit" },
      { title: "Modul 4: Shopee Ads untuk Pemula", videoCount: 5, duration: "65 Menit" },
      { title: "Modul 5: Promosi Toko & Analisis Performa", videoCount: 4, duration: "55 Menit" },
    ],
    testimonials: [
      {
        name: "Rudi Hartono",
        role: "Owner Toko Perlengkapan Rumah",
        quote: "Posisi produk saya naik signifikan di pencarian Shopee setelah optimasi judul dan kata kunci.",
      },
      {
        name: "Lina Marlina",
        role: "Reseller Produk Kecantikan",
        quote: "Materi Shopee Ads-nya sangat membantu, iklan jadi lebih efisien dan tidak boros budget.",
      },
      {
        name: "Yusuf Ibrahim",
        role: "Owner Toko Aksesoris",
        quote: "Sekarang saya lebih percaya diri mengatur promosi toko sendiri tanpa tebak-tebakan.",
      },
    ],
    updated: "Juli 2026",
    driveFileId: "REPLACE_OPTIMASI_TOKO_SHOPEE_FOLDER_ID",
  },
  {
    slug: "copywriting-menjual",
    title: "Copywriting Menjual: Ubah Kata-Kata Menjadi Transferan",
    category: "Advertising",
    mentor: "Rina Kusuma",
    mentorTitle: "Copywriter & Sales Content Specialist",
    level: "Pemula",
    durationHours: 6,
    gradient: "from-violet-500 to-purple-700",
    icon: "✍️",
    price: 249000,
    originalPrice: 799000,
    description:
      "Belajar merangkai kata yang mampu menggerakkan pembaca untuk mengambil tindakan: klik, chat, hingga transfer. Kelas ini membahas formula copywriting praktis untuk caption, iklan, dan pesan penawaran yang bisa langsung dipakai di bisnis Anda.",
    learnPoints: [
      "Memahami psikologi pembeli sebelum menulis copy.",
      "Formula headline yang menghentikan scroll.",
      "Menyusun copy iklan dengan struktur AIDA & PAS.",
      "Menulis caption media sosial yang mengundang interaksi.",
      "Copy penawaran chat/WhatsApp yang closing lebih cepat.",
      "Menghindari kata-kata yang menurunkan kepercayaan pembeli.",
    ],
    modules: [
      { title: "Modul 1: Psikologi Dasar Pembeli", videoCount: 3, duration: "30 Menit" },
      { title: "Modul 2: Formula Headline Menggoda", videoCount: 4, duration: "40 Menit" },
      { title: "Modul 3: Struktur Copy AIDA & PAS", videoCount: 4, duration: "45 Menit" },
      { title: "Modul 4: Caption Media Sosial", videoCount: 3, duration: "35 Menit" },
      { title: "Modul 5: Copy Chat & Closing", videoCount: 4, duration: "40 Menit" },
    ],
    testimonials: [
      {
        name: "Sari Wulandari",
        role: "Admin Online Shop",
        quote: "Template copy chat-nya langsung saya pakai, closing rate saya meningkat cukup terasa.",
      },
      {
        name: "Bayu Firmansyah",
        role: "Freelance Marketer",
        quote: "Formula headline-nya sederhana tapi ampuh, tulisan iklan jadi lebih menarik dibaca.",
      },
      {
        name: "Indah Permatasari",
        role: "Owner Bisnis Fashion Muslim",
        quote: "Caption Instagram saya jadi jauh lebih hidup dan engagement-nya naik.",
      },
    ],
    updated: "Juli 2026",
    driveFileId: "REPLACE_COPYWRITING_MENJUAL_FOLDER_ID",
  },
  {
    slug: "sem-google-ads",
    title: "Search Engine Marketing (SEM) with Google Ads",
    category: "Advertising",
    mentor: "Denny Pratama",
    mentorTitle: "Google Ads Certified Specialist",
    level: "Menengah",
    durationHours: 15,
    gradient: "from-sky-500 to-blue-700",
    icon: "🔍",
    price: 599000,
    originalPrice: 1899000,
    description:
      "Pelajari cara menjaring calon pembeli yang sedang mencari produk/jasa Anda di Google. Kelas ini membahas riset kata kunci, struktur kampanye Search, penulisan iklan yang relevan, hingga optimasi budget agar biaya per konversi semakin efisien.",
    learnPoints: [
      "Memahami cara kerja lelang iklan Google Ads.",
      "Riset kata kunci dengan intent transaksional.",
      "Menyusun struktur kampanye Search yang rapi.",
      "Menulis Responsive Search Ads yang relevan.",
      "Mengatur bidding dan budget agar efisien.",
      "Membaca laporan konversi untuk optimasi berkelanjutan.",
    ],
    modules: [
      { title: "Modul 1: Cara Kerja Google Ads", videoCount: 4, duration: "55 Menit" },
      { title: "Modul 2: Riset Kata Kunci Transaksional", videoCount: 5, duration: "70 Menit" },
      { title: "Modul 3: Struktur Kampanye Search", videoCount: 5, duration: "75 Menit" },
      { title: "Modul 4: Menulis Iklan yang Relevan", videoCount: 4, duration: "60 Menit" },
      { title: "Modul 5: Bidding, Budget & Optimasi", videoCount: 5, duration: "80 Menit" },
    ],
    testimonials: [
      {
        name: "Wahyu Nugroho",
        role: "Owner Jasa Renovasi Rumah",
        quote: "Biaya per leads turun cukup jauh setelah saya rapikan struktur kampanye sesuai kelas ini.",
      },
      {
        name: "Citra Ayu",
        role: "Marketing Manager B2B",
        quote: "Materinya sangat teknis tapi dijelaskan dengan bahasa yang mudah dipahami pemula sekalipun.",
      },
      {
        name: "Rizky Ramadhan",
        role: "Digital Ads Specialist",
        quote: "Bagian bidding & budget-nya membuka wawasan baru untuk mengelola akun klien saya.",
      },
    ],
    updated: "Juli 2026",
    driveFileId: "REPLACE_SEM_GOOGLE_ADS_FOLDER_ID",
  },
  {
    slug: "youtube-marketing",
    title: "Youtube Marketing: Bangun Brand & Pasif Income",
    category: "Social Media",
    mentor: "Faisal Akbar",
    mentorTitle: "YouTube Creator & Brand Strategist",
    level: "Pemula",
    durationHours: 9,
    gradient: "from-red-500 to-red-700",
    icon: "▶️",
    price: 349000,
    originalPrice: 1099000,
    description:
      "Bangun kanal YouTube yang memperkuat brand bisnis sekaligus menghasilkan pemasukan tambahan. Kelas ini membahas strategi konten jangka panjang, teknik SEO YouTube, hingga cara memonetisasi kanal secara berkelanjutan.",
    learnPoints: [
      "Menyusun strategi konten YouTube untuk brand bisnis.",
      "Riset topik dan judul video yang mudah ditemukan.",
      "Optimasi SEO YouTube: judul, deskripsi, dan tag.",
      "Teknik dasar produksi video yang profesional.",
      "Membangun audiens loyal melalui konsistensi konten.",
      "Strategi monetisasi: AdSense, sponsor, dan produk sendiri.",
    ],
    modules: [
      { title: "Modul 1: Strategi Konten untuk Brand", videoCount: 4, duration: "50 Menit" },
      { title: "Modul 2: Riset Topik & Judul Video", videoCount: 4, duration: "45 Menit" },
      { title: "Modul 3: Optimasi SEO YouTube", videoCount: 5, duration: "60 Menit" },
      { title: "Modul 4: Produksi Video Profesional", videoCount: 5, duration: "70 Menit" },
      { title: "Modul 5: Monetisasi & Membangun Audiens", videoCount: 4, duration: "55 Menit" },
    ],
    testimonials: [
      {
        name: "Putri Handayani",
        role: "Owner Bisnis Kuliner",
        quote: "Video-video brand kami sekarang lebih mudah ditemukan berkat optimasi SEO YouTube.",
      },
      {
        name: "Ilham Maulana",
        role: "Konten Kreator Edukasi",
        quote: "Strategi kontennya sistematis, tidak sekadar upload video tanpa arah.",
      },
      {
        name: "Diah Ayu Ningtyas",
        role: "Marketing Executive",
        quote: "Kanal YouTube perusahaan kami mulai menghasilkan leads berkat teknik yang diajarkan.",
      },
    ],
    updated: "Juli 2026",
    driveFileId: "REPLACE_YOUTUBE_MARKETING_FOLDER_ID",
  },
];

export const courseCategories: CourseCategory[] = ["Social Media", "Advertising", "Marketplace"];

export function getAllCourses(): Course[] {
  return courses;
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getRelatedCourses(slug: string, limit = 3): Course[] {
  const current = getCourseBySlug(slug);
  if (!current) return courses.slice(0, limit);

  const sameCategory = courses.filter((c) => c.slug !== slug && c.category === current.category);
  const rest = courses.filter((c) => c.slug !== slug && c.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export function formatRupiah(value: number): string {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export function discountPercent(price: number, originalPrice: number): number {
  return Math.round(100 - (price / originalPrice) * 100);
}

/** Builds the Drive folder URL a buyer opens after being granted per-email access. */
export function getCourseDriveUrl(driveFileId: string): string {
  return `https://drive.google.com/drive/folders/${driveFileId}`;
}
