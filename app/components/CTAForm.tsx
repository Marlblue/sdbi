'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { countries } from './countryCodes';

const layananLabels: Record<string, string> = {
  'digital-marketing': 'Digital Marketing Management',
  seo: 'SEO & AI Search Optimization',
  ads: 'Digital Ads Management',
  training: 'Corporate Training & Workshop',
  consulting: 'Business & Digital Consulting',
  webdev: 'Website Development',
  speaker: 'Speaker & Corporate Event',
  mpp: 'Program Masa Persiapan Pensiun (MPP)',
};

const sumberLabels: Record<string, string> = {
  google: 'Google Search',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
  referral: 'Rekomendasi',
  other: 'Lainnya',
};

export default function CTAForm() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    countryCode: 'ID',
    phone: '',
    layanan: '',
    sumber: '',
  });

  const [errors, setErrors] = useState<{ nama?: string; email?: string; phone?: string; layanan?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [countryOpen, setCountryOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);
  const namaRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const layananRef = useRef<HTMLSelectElement>(null);
  const selectedCountry =
    countries.find((c) => c.iso2 === formData.countryCode) ?? countries.find((c) => c.iso2 === 'ID')!;

  useEffect(() => {
    if (!countryOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [countryOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const nama = formData.nama.trim();
    const email = formData.email.trim();
    const phoneDigits = formData.phone.replace(/\D/g, '').replace(/^0+/, '');
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const newErrors: typeof errors = {};
    if (!nama) newErrors.nama = 'Nama lengkap wajib diisi.';
    if (!email) newErrors.email = 'Email wajib diisi.';
    else if (!emailValid) newErrors.email = 'Format email tidak valid.';
    if (!phoneDigits) newErrors.phone = 'Nomor HP wajib diisi.';
    if (!formData.layanan) newErrors.layanan = 'Pilih salah satu pelayanan.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstInvalidRef = newErrors.nama
        ? namaRef
        : newErrors.email
          ? emailRef
          : newErrors.phone
            ? phoneRef
            : layananRef;
      firstInvalidRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstInvalidRef.current?.focus();
      return;
    }

    const country = countries.find((c) => c.iso2 === formData.countryCode) ?? countries.find((c) => c.iso2 === 'ID')!;
    const fullPhone = `+${country.dial}${phoneDigits}`;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/chat-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama,
          phone: fullPhone,
          page: window.location.pathname,
          email,
          layanan: layananLabels[formData.layanan] ?? formData.layanan,
          sumber: formData.sumber ? (sumberLabels[formData.sumber] ?? formData.sumber) : '-',
        }),
      });

      if (!res.ok) throw new Error('failed');
      
      setIsSuccess(true);
    } catch (err) {
      alert('Maaf, terjadi kesalahan saat mengirim data. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
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
                  src="/ctaform-image/Website SDBI (3).webp"
                  alt="Alumni Sekolah Digital Bisnis Indonesia"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Right - Form */}
            <div className="min-w-0 bg-white p-8 md:p-10 lg:p-12 rounded-t-3xl md:rounded-t-none md:rounded-r-3xl flex flex-col justify-center">
              {isSuccess ? (
                <div className="text-center py-10 animate-[fadeIn_0.5s_ease-out]">
                  <div className="w-16 h-16 bg-[#DCF8C6] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-[#25D366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Terima Kasih!</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Data Anda telah berhasil dikirim. Tim SDBI akan segera menghubungi Anda melalui WhatsApp atau Email.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        nama: '',
                        email: '',
                        countryCode: 'ID',
                        phone: '',
                        layanan: '',
                        sumber: '',
                      });
                    }}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-colors"
                  >
                    Kirim Data Lainnya
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Nama */}
                <div className="relative">
                  <input
                    ref={namaRef}
                    type="text"
                    placeholder="Nama Lengkap"
                    value={formData.nama}
                    onChange={(e) => {
                      setFormData({ ...formData, nama: e.target.value });
                      if (errors.nama) setErrors({ ...errors, nama: undefined });
                    }}
                    className={`w-full border-b-2 ${errors.nama ? 'border-red-400' : 'border-gray-200'} focus:border-[#0A1E3F] py-3 px-1 text-sm outline-none transition-colors placeholder:text-gray-400`}
                  />
                  <svg className="absolute right-2 top-3 w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {errors.nama && <p className="mt-1 text-xs text-red-500">{errors.nama}</p>}
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    ref={emailRef}
                    type="email"
                    placeholder="Masukkan Email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    className={`w-full border-b-2 ${errors.email ? 'border-red-400' : 'border-gray-200'} focus:border-[#0A1E3F] py-3 px-1 text-sm outline-none transition-colors placeholder:text-gray-400`}
                  />
                  <svg className="absolute right-2 top-3 w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className={`relative flex items-center border-b-2 ${errors.phone ? 'border-red-400' : 'border-gray-200'} focus-within:border-[#0A1E3F] transition-colors`}>
                  <div className="relative shrink-0" ref={countryRef}>
                    <button
                      type="button"
                      onClick={() => setCountryOpen((o) => !o)}
                      className="flex items-center gap-1.5 py-3 pl-1 pr-3 text-sm text-gray-600 outline-none cursor-pointer"
                      aria-label="Pilih kode negara"
                      aria-expanded={countryOpen}
                    >
                      <img
                        src={`https://flagcdn.com/${selectedCountry.iso2.toLowerCase()}.svg`}
                        alt={selectedCountry.name}
                        className="w-5 h-3.5 object-cover rounded-sm shrink-0"
                      />
                      <span>+{selectedCountry.dial}</span>
                      <svg
                        className={`w-3 h-3 text-gray-300 transition-transform ${countryOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {countryOpen && (
                      <div className="absolute z-20 top-full left-0 mt-2 w-64 max-h-64 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg py-1">
                        {countries.map((c) => (
                          <button
                            key={c.iso2}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, countryCode: c.iso2 });
                              setCountryOpen(false);
                            }}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 ${c.iso2 === formData.countryCode ? 'bg-gray-50' : ''
                              }`}
                          >
                            <img
                              src={`https://flagcdn.com/${c.iso2.toLowerCase()}.svg`}
                              alt={c.name}
                              className="w-5 h-3.5 object-cover rounded-sm shrink-0"
                            />
                            <span className="flex-1 truncate text-gray-700">{c.name}</span>
                            <span className="text-gray-400">+{c.dial}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <input
                    ref={phoneRef}
                    type="tel"
                    inputMode="numeric"
                    placeholder="8123456789"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value.replace(/[^\d]/g, '') });
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    className="flex-1 py-3 px-1 text-sm outline-none placeholder:text-gray-400 border-none"
                  />
                  <svg className="w-5 h-5 text-gray-300 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                {errors.phone && <p className="-mt-3 text-xs text-red-500">{errors.phone}</p>}

                {/* Dropdown - Layanan */}
                <div className="relative">
                  <select
                    ref={layananRef}
                    value={formData.layanan}
                    onChange={(e) => {
                      setFormData({ ...formData, layanan: e.target.value });
                      if (errors.layanan) setErrors({ ...errors, layanan: undefined });
                    }}
                    className={`w-full border-b-2 ${errors.layanan ? 'border-red-400' : 'border-gray-200'} focus:border-[#0A1E3F] py-3 px-1 text-sm outline-none transition-colors text-gray-400 bg-transparent appearance-none`}
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
                  {errors.layanan && <p className="mt-1 text-xs text-red-500">{errors.layanan}</p>}
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
                  disabled={isSubmitting}
                  className="w-full bg-[#0A1E3F] hover:bg-[#1A365D] disabled:opacity-70 text-white py-4 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Mengirim...
                    </>
                  ) : (
                    'Kirim Data'
                  )}
                </button>
              </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
