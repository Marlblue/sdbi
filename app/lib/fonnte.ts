const FONNTE_TARGET = process.env.FONNTE_TARGET || '6285211436032';

export async function sendFonnteMessage(message: string): Promise<void> {
  const token = process.env.FONNTE_TOKEN;
  if (!token) {
    console.error('FONNTE_TOKEN belum diset — notifikasi WhatsApp tidak terkirim.');
    return;
  }

  const res = await fetch('https://api.fonnte.com/send', {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ target: FONNTE_TARGET, message }),
  });

  if (!res.ok) {
    throw new Error(`Fonnte Error ${res.status}: ${await res.text()}`);
  }
}
