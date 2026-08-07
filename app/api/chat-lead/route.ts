import { NextRequest, NextResponse } from 'next/server';
import { sendFonnteMessage } from '../../lib/fonnte';
import { getClientIp, isRateLimited } from '../../lib/rateLimit';

const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;

function buildLeadMessage({
  nama,
  phone,
  email,
  layanan,
  sumber,
  page,
}: {
  nama: string;
  phone: string;
  email: string;
  layanan: string;
  sumber: string;
  page: string;
}): string {
  return (
    `*Lead Baru dari Website SDBI*\n\n` +
    `Nama: ${nama}\n` +
    `WhatsApp: ${phone || '-'}\n` +
    `Email: ${email || '-'}\n` +
    `Layanan: ${layanan || '-'}\n` +
    `Sumber: ${sumber || '-'}\n` +
    `Halaman: ${page || '-'}`
  );
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(`chat-lead:${ip}`, RATE_LIMIT, RATE_LIMIT_WINDOW_MS)) {
    return NextResponse.json(
      { error: 'Terlalu banyak percobaan. Silakan coba lagi beberapa menit lagi.' },
      { status: 429 }
    );
  }

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: 'Integrasi spreadsheet belum dikonfigurasi.' },
      { status: 500 }
    );
  }

  let body: { page?: unknown; nama?: unknown; phone?: unknown; email?: unknown; layanan?: unknown; sumber?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
  }

  const nama = typeof body.nama === 'string' ? body.nama.trim() : '';
  if (!nama) {
    return NextResponse.json({ error: 'Nama tidak boleh kosong.' }, { status: 400 });
  }
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const email = typeof body.email === 'string' ? body.email : '';
  const layanan = typeof body.layanan === 'string' ? body.layanan : '';
  const sumber = typeof body.sumber === 'string' ? body.sumber : '';
  const page = typeof body.page === 'string' ? body.page : '';

  sendFonnteMessage(buildLeadMessage({ nama, phone, email, layanan, sumber, page })).catch((err) =>
    console.error('Fonnte Fetch Error:', err)
  );

  try {
    const scriptResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nama: nama || '-',
        phone: phone || '-',
        page,
        timestamp: new Date().toISOString(),
        email,
        layanan,
        sumber,
      }),
      // Vercel Kadang rewel dengan redirect, kita set manual
      redirect: 'manual', 
    });

    // Google Apps Script merespon dengan 302 Redirect jika berhasil
    if (!scriptResponse.ok && scriptResponse.status !== 302 && scriptResponse.status !== 303) {
      console.error('Spreadsheet Error:', scriptResponse.status, scriptResponse.statusText);
      return NextResponse.json({ error: 'Gagal mengirim ke spreadsheet.' }, { status: 502 });
    }
  } catch (err) {
    console.error('Fetch Error:', err);
    // Karena Google eksekusi POST sebelum return response,
    // kalau timeout/error network di Vercel tapi data sering masuk,
    // kita anggap sukses asalkan fetch sempat terkirim.
    // Tapi untuk aman, kita log saja.
  }

  return NextResponse.json({ ok: true });
}
