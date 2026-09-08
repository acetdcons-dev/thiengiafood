const SPREADSHEET_ID = '1IaS1Ex59MNrwg0y6Tk5Eiayp_zbiE2uS_75AMYtVPmw';
const NOTIFICATION_EMAIL = 'thiengiafood@gmail.com';
const SHEET_NAME = 'Leads';
const HEADERS = ['Thời gian', 'Họ tên', 'Số điện thoại', 'Ngày tổ chức', 'Khu vực', 'Loại tiệc', 'Số bàn/khách', 'Ngân sách', 'Ghi chú', 'Trang gửi'];

function doPost(e) {
  try {
    const payload = JSON.parse((e.postData && e.postData.contents) || '{}');
    const expectedSecret = PropertiesService.getScriptProperties().getProperty('LEAD_WEBHOOK_SECRET');
    if (!expectedSecret || payload.secret !== expectedSecret) return jsonResponse({ ok: false, error: 'unauthorized' });

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    const values = [
      new Date(), safeCell(payload.name), safeCell(payload.phone), safeCell(payload.eventDate), safeCell(payload.area),
      safeCell(payload.eventType), safeCell(payload.guestCount), safeCell(payload.budget), safeCell(payload.note), safeCell(payload.pageUrl)
    ];
    sheet.appendRow(values);

    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: `Yêu cầu tư vấn mới - ${payload.name}`,
      body: [
        `Họ tên: ${payload.name}`,
        `Số điện thoại: ${payload.phone}`,
        `Ngày tổ chức: ${payload.eventDate}`,
        `Khu vực: ${payload.area}`,
        `Loại tiệc: ${payload.eventType}`,
        `Số bàn/khách: ${payload.guestCount}`,
        `Ngân sách: ${payload.budget || 'Chưa cung cấp'}`,
        `Ghi chú: ${payload.note || 'Không có'}`
      ].join('\n')
    });
    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: 'server_error' });
  }
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function safeCell(value) {
  const text = String(value || '');
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}
