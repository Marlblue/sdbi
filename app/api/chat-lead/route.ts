import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
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

  try {
    const scriptResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nama: nama || '-',
        phone: phone || '-',
        page: typeof body.page === 'string' ? body.page : '',
        timestamp: new Date().toISOString(),
        email: typeof body.email === 'string' ? body.email : '',
        layanan: typeof body.layanan === 'string' ? body.layanan : '',
        sumber: typeof body.sumber === 'string' ? body.sumber : '',
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
