const REQUIRED_FIELDS = ['name', 'phone', 'eventDate', 'area', 'eventType', 'guestCount'];

function clean(value, maxLength = 300) {
  return String(value || '').trim().slice(0, maxLength);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed', message: 'Phương thức không được hỗ trợ.' });
    return;
  }

  const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const webhookSecret = process.env.LEAD_WEBHOOK_SECRET;
  if (!webhookUrl || !webhookSecret) {
    res.status(501).json({ error: 'not_configured', message: 'Hệ thống tiếp nhận đang được cấu hình. Vui lòng liên hệ qua hotline hoặc Zalo.' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (error) { body = {}; }
  }
  body = body || {};

  if (clean(body.website)) {
    res.status(400).json({ error: 'spam_detected', message: 'Yêu cầu không hợp lệ.' });
    return;
  }

  const startedAt = Number(body.formStartedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2500) {
    res.status(400).json({ error: 'submitted_too_fast', message: 'Vui lòng kiểm tra lại thông tin trước khi gửi.' });
    return;
  }

  const lead = {
    name: clean(body.name, 100),
    phone: clean(body.phone, 30),
    eventDate: clean(body.eventDate, 20),
    area: clean(body.area, 150),
    eventType: clean(body.eventType, 100),
    guestCount: clean(body.guestCount, 100),
    budget: clean(body.budget, 100),
    note: clean(body.note, 1000),
    pageUrl: clean(body.pageUrl, 500),
    submittedAt: new Date().toISOString()
  };

  if (REQUIRED_FIELDS.some(field => !lead[field])) {
    res.status(400).json({ error: 'missing_fields', message: 'Vui lòng điền đầy đủ các trường bắt buộc.' });
    return;
  }
  if (!/^(0|\+84)[0-9\s.-]{8,13}$/.test(lead.phone)) {
    res.status(400).json({ error: 'invalid_phone', message: 'Số điện thoại chưa đúng định dạng.' });
    return;
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, secret: webhookSecret })
    });
    const result = await upstream.json().catch(() => ({}));
    if (!upstream.ok || result.ok !== true) throw new Error('Lead webhook rejected request');
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(502).json({ error: 'delivery_failed', message: 'Chưa thể gửi yêu cầu. Vui lòng liên hệ qua hotline hoặc Zalo.' });
  }
};
