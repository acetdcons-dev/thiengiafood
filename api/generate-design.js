// api/generate-design.js
// Vercel Serverless Function — vẽ nền thiệp mời theo mô tả của khách bằng Gemini.
//
// Cần biến môi trường GEMINI_API_KEY (Vercel → Project Settings → Environment
// Variables). Đây phải là API key lấy từ Google AI Studio (aistudio.google.com),
// KHÔNG phải gói thuê bao Gemini App/Google AI Pro.
//
// Lưu ý: tên model image-gen của Google có thể thay đổi theo thời gian — nếu
// gọi bị lỗi "model not found", vào aistudio.google.com kiểm tra tên model
// hiện hành và cập nhật GEMINI_MODEL bên dưới.
const GEMINI_MODEL = 'gemini-2.5-flash-image';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(501).json({
      error: 'not_configured',
      message: 'Tính năng thiết kế AI chưa được kích hoạt. Vui lòng thêm GEMINI_API_KEY trong Environment Variables của Vercel.'
    });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  const prompt = String(body.prompt || '').trim().slice(0, 400);
  const eventLabel = String(body.eventLabel || 'thiệp mời').trim().slice(0, 60);
  const phone = String(body.phone || '').trim().slice(0, 30);

  if (!prompt) {
    res.status(400).json({ error: 'missing_prompt', message: 'Vui lòng nhập mô tả phong cách bạn muốn.' });
    return;
  }

  // Ghi log lượt dùng để theo dõi chi phí (Vercel function logs). Chưa có
  // database nên số điện thoại chỉ nằm trong log, chưa được lưu trữ lâu dài.
  console.log(`[generate-design] event="${eventLabel}" phone="${phone}" prompt="${prompt}"`);

  const fullPrompt = `Vẽ một hình nền trang trí cho ${eventLabel}, khổ dọc, phong cách sang trọng, tinh tế, KHÔNG chứa bất kỳ chữ hay văn bản nào trong ảnh. Bố cục để trống rõ ràng ở giữa để có thể phủ chữ lên trên. Phong cách mong muốn theo mô tả sau: ${prompt}.`;

  try {
    const apiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }]
        })
      }
    );

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      res.status(502).json({
        error: 'gemini_error',
        message: 'Gemini API trả lỗi, vui lòng thử lại sau.',
        detail: errText.slice(0, 500)
      });
      return;
    }

    const data = await apiRes.json();
    const parts = (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) || [];
    const imagePart = parts.find(p => p.inlineData && p.inlineData.data);

    if (!imagePart) {
      res.status(502).json({ error: 'no_image', message: 'Không tạo được ảnh, vui lòng thử mô tả khác.' });
      return;
    }

    const mime = imagePart.inlineData.mimeType || 'image/png';
    res.status(200).json({ image: `data:${mime};base64,${imagePart.inlineData.data}` });
  } catch (err) {
    res.status(500).json({ error: 'server_error', message: 'Có lỗi máy chủ, vui lòng thử lại.' });
  }
};
