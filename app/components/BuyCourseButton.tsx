'use client';

import { useState } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        options?: {
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

const SNAP_SRC =
  process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true'
    ? 'https://app.midtrans.com/snap/snap.js'
    : 'https://app.sandbox.midtrans.com/snap/snap.js';

const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? '';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(\+62|62|0)8[0-9]{7,11}$/;

interface BuyCourseButtonProps {
  slug: string;
  className?: string;
}

export default function BuyCourseButton({ slug, className }: BuyCourseButtonProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nameValid = name.trim().length >= 2;
  const emailValid = EMAIL_REGEX.test(email.trim());
  const phoneValid = PHONE_REGEX.test(phone.trim().replace(/[\s-]/g, ''));
  const formValid = nameValid && emailValid && phoneValid;

  const handleBuy = async () => {
    if (loading) return;
    if (!nameValid) {
      setError('Masukkan nama lengkap Anda.');
      return;
    }
    if (!emailValid) {
      setError('Masukkan alamat email yang valid.');
      return;
    }
    if (!phoneValid) {
      setError('Masukkan nomor WhatsApp yang valid (contoh: 081234567890).');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/midtrans/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim().replace(/[\s-]/g, ''),
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.token) {
        throw new Error(data.error || 'Gagal membuat transaksi.');
      }

      if (!window.snap) {
        throw new Error('Layanan pembayaran belum siap, silakan coba lagi sesaat lagi.');
      }

      window.snap.pay(data.token, {
        onSuccess: () => {
          window.location.href = `/e-course/${slug}?status=berhasil`;
        },
        onPending: () => {
          window.location.href = `/e-course/${slug}?status=pending`;
        },
        onError: () => {
          setError('Pembayaran gagal diproses. Silakan coba lagi.');
          setLoading(false);
        },
        onClose: () => {
          setLoading(false);
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan, silakan coba lagi.');
      setLoading(false);
    }
  };

  return (
    <div>
      <Script src={SNAP_SRC} data-client-key={MIDTRANS_CLIENT_KEY} strategy="afterInteractive" />
      <label htmlFor={`name-${slug}`} className="block text-xs font-bold text-[#6B7280] mb-1.5">
        Nama Lengkap
      </label>
      <input
        id={`name-${slug}`}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama Anda"
        disabled={loading}
        className="w-full mb-3 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5821F] disabled:opacity-60"
      />
      <label htmlFor={`email-${slug}`} className="block text-xs font-bold text-[#6B7280] mb-1.5">
        Email untuk pengiriman akses kelas
      </label>
      <input
        id={`email-${slug}`}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="nama@email.com"
        disabled={loading}
        className="w-full mb-3 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5821F] disabled:opacity-60"
      />
      <label htmlFor={`phone-${slug}`} className="block text-xs font-bold text-[#6B7280] mb-1.5">
        Nomor WhatsApp
      </label>
      <input
        id={`phone-${slug}`}
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="081234567890"
        disabled={loading}
        className="w-full mb-3 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5821F] disabled:opacity-60"
      />
      <button
        type="button"
        onClick={handleBuy}
        disabled={loading || !formValid}
        className={`${className ?? ''} disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {loading ? 'Memproses...' : 'Beli Sekarang'}
      </button>
      <p className="text-[11px] text-[#6B7280] mt-2 text-center">
        Link akses kelas akan dikirim ke email ini setelah pembayaran dikonfirmasi.
      </p>
      {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
    </div>
  );
}
