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

interface BuyCourseButtonProps {
  slug: string;
  className?: string;
}

export default function BuyCourseButton({ slug, className }: BuyCourseButtonProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailValid = EMAIL_REGEX.test(email.trim());

  const handleBuy = async () => {
    if (loading) return;
    if (!emailValid) {
      setError('Masukkan alamat email yang valid.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/midtrans/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, email: email.trim() }),
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
      <button
        type="button"
        onClick={handleBuy}
        disabled={loading || !emailValid}
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
