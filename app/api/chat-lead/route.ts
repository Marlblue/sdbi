import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: 'Integrasi spreadsheet belum dikonfigurasi.' },
      { status: 500 }
    );
  }

  let body: { message?: unknown; page?: unknown; nama?: unknown; phone?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message) {
    return NextResponse.json({ error: 'Pesan tidak boleh kosong.' }, { status: 400 });
  }

  const nama = typeof body.nama === 'string' ? body.nama.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';

  try {
    const scriptResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        nama: nama || '-',
        phone: phone || '-',
        page: typeof body.page === 'string' ? body.page : '',
        timestamp: new Date().toISOString(),
      }),
    });

    if (!scriptResponse.ok) {
      return NextResponse.json({ error: 'Gagal mengirim ke spreadsheet.' }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: 'Gagal menghubungi layanan spreadsheet.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
