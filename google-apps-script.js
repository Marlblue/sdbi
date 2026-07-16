/**
 * Google Apps Script — Chat Lead Webhook
 * ========================================
 * Script ini menerima POST request dari website SDBI,
 * menyimpan data ke spreadsheet, dan mengirim email notifikasi ke admin.
 *
 * SETUP:
 * 1. Buat Google Sheet baru
 * 2. Rename sheet pertama jadi "ChatLeads"
 * 3. Buat header di baris 1: Timestamp | Nama | Nomor HP | Email | Layanan | Mengetahui Dari | Halaman | Status
 * 4. Buka Extensions → Apps Script
 * 5. Hapus semua kode default, paste seluruh kode ini
 * 6. Ganti ADMIN_EMAIL di bawah dengan email admin SDBI
 * 7. Save (Ctrl+S)
 * 8. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 9. Copy URL deployment → paste di .env.local sebagai GOOGLE_SHEET_WEBHOOK_URL
 */

// ============================================================
// KONFIGURASI — Ganti sesuai kebutuhan
// ============================================================
const ADMIN_EMAIL = 'sdbiofficial2023@gmail.com'; // <-- GANTI email admin di sini
const SHEET_NAME = 'ChatLeads';

// ============================================================
// Handler POST
// ============================================================
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Sheet "' + SHEET_NAME + '" tidak ditemukan.' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Tulis data ke baris baru
    var timestamp = data.timestamp || new Date().toISOString();
    var nama = data.nama || '-';
    var phone = data.phone || '-';
    var email = data.email || '-';
    var layanan = data.layanan || '-';
    var sumber = data.sumber || '-';
    var page = data.page || '/';

    sheet.appendRow([timestamp, nama, phone, email, layanan, sumber, page, 'Baru']);

    // Kirim email notifikasi ke admin
    var subject = '💬 Lead Baru dari Website SDBI';
    var body = [
      'Ada pesan/form baru dari website SDBI!\n',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'Waktu           : ' + timestamp,
      'Nama            : ' + nama,
      'No HP           : ' + phone,
      'Email           : ' + email,
      'Layanan         : ' + layanan,
      'Mengetahui Dari : ' + sumber,
      'Halaman         : ' + page,
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n',
      'Buka spreadsheet untuk melihat semua pesan:',
      SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    ].join('\n');

    MailApp.sendEmail(ADMIN_EMAIL, subject, body);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================
// Handler GET (untuk test di browser)
// ============================================================
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Chat Lead webhook aktif ✅' }))
    .setMimeType(ContentService.MimeType.JSON);
}
