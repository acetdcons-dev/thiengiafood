// api/generate-wedding-photo.js
// Vercel Serverless Function — ghép ảnh cưới bằng AI (Gemini, nhận 2 ảnh đầu vào).
//
// Cần biến môi trường GEMINI_API_KEY (Vercel → Project Settings → Environment
// Variables), lấy từ Google AI Studio (aistudio.google.com), KHÔNG phải gói
// thuê bao Gemini App/Google AI Pro.
//
// Lưu ý: tên model image-gen của Google có thể thay đổi theo thời gian — nếu
// gọi bị lỗi "model not found", vào aistudio.google.com kiểm tra tên model
// hiện hành và cập nhật GEMINI_MODEL bên dưới.
const GEMINI_MODEL = 'gemini-2.5-flash-image';
const MAX_IMAGE_CHARS = 3000000; // giới hạn an toàn cho ảnh base64 (ảnh đã resize phía client)
const DATA_URL_RE = /^data:image\/(png|jpe?g|webp);base64,([A-Za-z0-9+/=]+)$/;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(501).json({
      error: 'not_configured',
      message: 'Tính năng ghép ảnh AI chưa được kích hoạt. Vui lòng thêm GEMINI_API_KEY trong Environment Variables của Vercel.'
    });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  const prompt = String(body.prompt || '').trim().slice(0, 500);
  const phone = String(body.phone || '').trim().slice(0, 30);
  const groomPhoto = body.groomPhoto;
  const bridePhoto = body.bridePhoto;

  if (!prompt) {
    res.status(400).json({ error: 'missing_prompt', message: 'Vui lòng nhập ý tưởng phong cách.' });
    return;
  }

  const groomMatch = (typeof groomPhoto === 'string' && groomPhoto.length < MAX_IMAGE_CHARS) ? groomPhoto.match(DATA_URL_RE) : null;
  const brideMatch = (typeof bridePhoto === 'string' && bridePhoto.length < MAX_IMAGE_CHARS) ? bridePhoto.match(DATA_URL_RE) : null;

  if (!groomMatch || !brideMatch) {
    res.status(400).json({ error: 'missing_photos', message: 'Vui lòng tải đủ ảnh chú rể và cô dâu hợp lệ.' });
    return;
  }

  // Ghi log lượt dùng để theo dõi chi phí (Vercel function logs). Chưa có
  // database nên số điện thoại chỉ nằm trong log, chưa được lưu trữ lâu dài.
  console.log(`[generate-wedding-photo] phone="${phone}" prompt="${prompt}"`);

  const fullPrompt = `Đây là 2 ảnh chân dung: ảnh thứ nhất là chú rể, ảnh thứ hai là cô dâu. Hãy tạo một bức ảnh cưới nghệ thuật, chân thực, giữ đúng đặc điểm khuôn mặt của cả hai người trong ảnh gốc, cả hai mặc trang phục cưới lịch lãm, đứng cạnh nhau tình cảm. Phong cách mong muốn: ${prompt}. Ảnh chất lượng cao như chụp studio chuyên nghiệp, không chứa bất kỳ chữ hay watermark nào.`;

  try {
    const apiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: fullPrompt },
              { inlineData: { mimeType: `image/${groomMatch[1]}`, data: groomMatch[2] } },
              { inlineData: { mimeType: `image/${brideMatch[1]}`, data: brideMatch[2] } }
            ]
          }]
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
      res.status(502).json({ error: 'no_image', message: 'Không tạo được ảnh, vui lòng thử ý tưởng khác hoặc ảnh khác.' });
      return;
    }

    const mime = imagePart.inlineData.mimeType || 'image/png';
    res.status(200).json({ image: `data:${mime};base64,${imagePart.inlineData.data}` });
  } catch (err) {
    res.status(500).json({ error: 'server_error', message: 'Có lỗi máy chủ, vui lòng thử lại.' });
  }
};
