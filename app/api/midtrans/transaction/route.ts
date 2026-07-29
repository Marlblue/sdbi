import { NextRequest, NextResponse } from 'next/server';
import { getCourseBySlug } from '../../../lib/courses';
import { createOrder, updateOrderStatus } from '../../../lib/orders';

const IS_PRODUCTION = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true';
const SNAP_API_URL = IS_PRODUCTION
  ? 'https://app.midtrans.com/snap/v1/transactions'
  : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) {
    return NextResponse.json({ error: 'Midtrans belum dikonfigurasi.' }, { status: 500 });
  }

  let body: { slug?: unknown; email?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
  }

  const slug = typeof body.slug === 'string' ? body.slug : '';
  const course = slug ? getCourseBySlug(slug) : undefined;
  if (!course) {
    return NextResponse.json({ error: 'Kelas tidak ditemukan.' }, { status: 404 });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Email tidak valid.' }, { status: 400 });
  }

  // Price/name are looked up server-side from the slug so the client can't tamper with the amount charged.
  const orderId = `ECOURSE-${course.slug}-${Date.now()}`;

  try {
    await createOrder({
      orderId,
      slug: course.slug,
      courseTitle: course.title,
      amount: course.price,
      customerEmail: email,
    });
  } catch (err) {
    console.error('Order Create Error:', err);
    return NextResponse.json({ error: 'Gagal menyimpan data order.' }, { status: 500 });
  }

  try {
    const snapResponse = await fetch(SNAP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Basic ${Buffer.from(`${serverKey}:`).toString('base64')}`,
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: orderId,
          gross_amount: course.price,
        },
        item_details: [
          {
            id: course.slug,
            price: course.price,
            quantity: 1,
            name: course.title.slice(0, 50),
          },
        ],
        customer_details: {
          first_name: 'Peserta E-Course',
          email,
        },
        callbacks: {
          finish: `https://sekolahdigitalbisnis.com/e-course/${course.slug}?status=selesai`,
        },
      }),
    });

    const data = await snapResponse.json();

    if (!snapResponse.ok) {
      console.error('Midtrans Error:', snapResponse.status, data);
      await updateOrderStatus(orderId, 'failed').catch((err) =>
        console.error('Order Status Update Error:', err)
      );
      const message = Array.isArray(data?.error_messages)
        ? data.error_messages.join(', ')
        : 'Gagal membuat transaksi pembayaran.';
      return NextResponse.json({ error: message }, { status: 502 });
    }

    return NextResponse.json({ token: data.token, redirectUrl: data.redirect_url, orderId });
  } catch (err) {
    console.error('Midtrans Fetch Error:', err);
    await updateOrderStatus(orderId, 'failed').catch((updateErr) =>
      console.error('Order Status Update Error:', updateErr)
    );
    return NextResponse.json({ error: 'Tidak dapat terhubung ke layanan pembayaran.' }, { status: 502 });
  }
}
