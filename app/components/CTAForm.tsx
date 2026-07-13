'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function CTAForm() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    phone: '',
    layanan: '',
    harapan: '',
    sumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Halo SDBI, saya ${formData.nama}.\nEmail: ${formData.email}\nNo HP: ${formData.phone}\nLayanan: ${formData.layanan}\nHarapan: ${formData.harapan}\nMengetahui dari: ${formData.sumber}`;
    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section className="bg-[#1A1A2E] py-16 md:py-24" id="konsultasi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C1C1C] rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left - CTA Text + People Image */}
            <div className="min-w-0 p-8 md:p-12 lg:p-14 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-8">
                Siap untuk raih{' '}
                <span className="text-[#FFD54F] font-extrabold">karir<br />digital</span>{' '}
                <span className="text-[#FFD54F] font-extrabold">seperti mereka?</span>
              </h2>

              {/* People collage image */}
              <div className="relative w-full mt-2">
                <Image
                  src="/image-cta/Website SDBI (3).png"
                  alt="Alumni Sekolah Digital Bisnis Indonesia"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right - Form */}
            <div className="min-w-0 bg-white p-8 md:p-10 lg:p-12 rounded-t-3xl md:rounded-t-none md:rounded-r-3xl flex flex-col justify-center">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nama */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="w-full border-b-2 border-gray-200 focus:border-[#0A1E3F] py-3 px-1 text-sm outline-none transition-colors placeholder:text-gray-400"
                    required
                  />
                  <svg className="absolute right-2 top-3 w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Masukkan Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border-b-2 border-gray-200 focus:border-[#0A1E3F] py-3 px-1 text-sm outline-none transition-colors placeholder:text-gray-400"
                    required
                  />
                  <svg className="absolute right-2 top-3 w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>

                {/* Phone */}
                <div className="relative flex items-center border-b-2 border-gray-200 focus-within:border-[#0A1E3F] transition-colors">
                  <span className="text-sm text-gray-500 mr-2 flex items-center gap-1 py-3">
                    🇮🇩 • +62
                  </span>
                  <input
                    type="tel"
                    placeholder=""
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="flex-1 py-3 px-1 text-sm outline-none placeholder:text-gray-400 border-none"
                    required
                  />
                  <svg className="w-5 h-5 text-gray-300 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>

                {/* Dropdown - Layanan */}
                <div className="relative">
                  <select
                    value={formData.layanan}
                    onChange={(e) => setFormData({ ...formData, layanan: e.target.value })}
                    className="w-full border-b-2 border-gray-200 focus:border-[#0A1E3F] py-3 px-1 text-sm outline-none transition-colors text-gray-400 bg-transparent appearance-none"
                    required
                  >
                    <option value="">Pilih Pelayanan Sekolah Digital Bisnis Indonesia</option>
                    <option value="digital-marketing">Digital Marketing Management</option>
                    <option value="seo">SEO & AI Search Optimization</option>
                    <option value="ads">Digital Ads Management</option>
                    <option value="training">Corporate Training & Workshop</option>
                    <option value="consulting">Business & Digital Consulting</option>
                    <option value="webdev">Website Development</option>
                    <option value="speaker">Speaker & Corporate Event</option>
                    <option value="mpp">Program Masa Persiapan Pensiun (MPP)</option>
                  </select>
                  <svg className="absolute right-2 top-3 w-5 h-5 text-gray-300 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Dropdown - Harapan */}
                <div className="relative">
                  <select
                    value={formData.harapan}
                    onChange={(e) => setFormData({ ...formData, harapan: e.target.value })}
                    className="w-full border-b-2 border-gray-200 focus:border-[#0A1E3F] py-3 px-1 text-sm outline-none transition-colors text-gray-400 bg-transparent appearance-none"
                  >
                    <option value="">Apa yang di harapkan</option>
                    <option value="revenue">Meningkatkan Revenue</option>
                    <option value="leads">Meningkatkan Leads</option>
                    <option value="brand">Meningkatkan Brand Awareness</option>
                    <option value="skills">Meningkatkan Kompetensi Tim</option>
                    <option value="other">Lainnya</option>
                  </select>
                  <svg className="absolute right-2 top-3 w-5 h-5 text-gray-300 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Dropdown - Sumber */}
                <div className="relative">
                  <select
                    value={formData.sumber}
                    onChange={(e) => setFormData({ ...formData, sumber: e.target.value })}
                    className="w-full border-b-2 border-gray-200 focus:border-[#0A1E3F] py-3 px-1 text-sm outline-none transition-colors text-gray-400 bg-transparent appearance-none"
                  >
                    <option value="">Dimana mengetahui tentang Sekolah Digital Bisnis Indonesia</option>
                    <option value="google">Google Search</option>
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="referral">Rekomendasi</option>
                    <option value="other">Lainnya</option>
                  </select>
                  <svg className="absolute right-2 top-3 w-5 h-5 text-gray-300 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white py-4 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  Kirim via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
