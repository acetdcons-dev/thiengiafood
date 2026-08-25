/* Thiên Gia Food — wedding-ai.js (Ghép Ảnh Cưới Bằng AI) */

const STYLE_PRESETS = [
  { id: 'co-dien', name: 'Cổ Điển Sang Trọng', icon: '👑', gradient: ['#3f0f15', '#2b0a0e'],
    prompt: 'phong cách cổ điển sang trọng, cô dâu mặc váy cưới trắng, chú rể mặc vest đen, background phòng tiệc lộng lẫy với ánh đèn vàng ấm' },
  { id: 'bai-bien', name: 'Bãi Biển Hoàng Hôn', icon: '🌅', gradient: ['#7a3418', '#4a1f0d'],
    prompt: 'chụp ngoài trời trên bãi biển lúc hoàng hôn, tông màu cam vàng ấm áp, gió nhẹ tung tà áo cưới' },
  { id: 'ao-dai', name: 'Áo Dài Truyền Thống', icon: '🌸', gradient: ['#7a2f45', '#4a1a2e'],
    prompt: 'trang phục áo dài cưới truyền thống Việt Nam, phông nền không gian nhà cổ, hoa sen, tông màu đỏ và vàng' },
  { id: 'vintage-eu', name: 'Vintage Châu Âu', icon: '🏛️', gradient: ['#3a2352', '#211230'],
    prompt: 'phong cách vintage châu Âu, kiến trúc cổ điển, tông màu phim ảnh xưa, ánh sáng mềm mại' },
  { id: 'studio', name: 'Studio Tối Giản', icon: '📷', gradient: ['#242220', '#0a0908'],
    prompt: 'chụp trong studio nền trắng be tối giản, ánh sáng chuyên nghiệp, phong cách hiện đại, thanh lịch' },
  { id: 'vuon-hoa', name: 'Vườn Hoa Lãng Mạn', icon: '🌷', gradient: ['#0d3b34', '#082720'],
    prompt: 'giữa vườn hoa hồng lãng mạn, ánh nắng nhẹ xuyên qua tán lá, tông màu pastel dịu dàng' }
];

const MAX_DIM = 768;
const QUALITY = 0.82;
const FREE_LIMIT = 2;
const COUNT_KEY = 'tgf_wedding_ai_count';

let groomPhoto = null;
let bridePhoto = null;
let lastResultImage = null;

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : str;
  return div.innerHTML;
}

let toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

function resizeImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        const scale = Math.min(1, MAX_DIM / Math.max(width, height));
        width = Math.round(width * scale);
        height = Math.round(height * scale);
        canvas.width = width; canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', QUALITY));
      };
      img.onerror = () => reject(new Error('image_load_failed'));
      img.src = ev.target.result;
    };
    reader.onerror = () => reject(new Error('file_read_failed'));
    reader.readAsDataURL(file);
  });
}

function bindUpload(inputId, previewId, setter) {
  document.getElementById(inputId).addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { showToast('Vui lòng chọn file ảnh.'); return; }
    try {
      const dataUrl = await resizeImageFile(file);
      setter(dataUrl);
      const preview = document.getElementById(previewId);
      preview.style.backgroundImage = `url(${dataUrl})`;
      preview.classList.add('has-photo');
    } catch (err) {
      showToast('Không đọc được ảnh, vui lòng thử ảnh khác.');
    }
  });
}

function buildStyleGrid() {
  const grid = document.getElementById('styleGrid');
  grid.innerHTML = STYLE_PRESETS.map(s => `
    <article class="wai-style-card" style="background:linear-gradient(160deg, ${s.gradient[0]}, ${s.gradient[1]})">
      <span class="wai-style-card__icon" aria-hidden="true">${s.icon}</span>
      <h3 class="wai-style-card__name">${escapeHtml(s.name)}</h3>
      <button type="button" class="btn btn--outline btn--sm" data-style="${s.id}">Dùng Phong Cách Này</button>
    </article>
  `).join('');
  grid.querySelectorAll('[data-style]').forEach(btn => {
    btn.addEventListener('click', () => {
      const style = STYLE_PRESETS.find(s => s.id === btn.dataset.style);
      if (!style) return;
      document.getElementById('waiPrompt').value = style.prompt;
      document.querySelector('.wai-generator').scrollIntoView({ behavior: 'smooth', block: 'start' });
      showToast(`Đã chọn phong cách "${style.name}" — bạn có thể chỉnh sửa thêm mô tả nếu muốn.`);
    });
  });
}

function getCount() { return parseInt(localStorage.getItem(COUNT_KEY) || '0', 10); }
function incCount() { localStorage.setItem(COUNT_KEY, String(getCount() + 1)); }

function showResult(imageDataUrl) {
  document.getElementById('resultPlaceholder').hidden = true;
  const img = document.getElementById('resultImage');
  img.src = imageDataUrl;
  img.hidden = false;
  document.getElementById('resultActions').hidden = false;
  lastResultImage = imageDataUrl;
}

async function onGenerateWedding() {
  const prompt = document.getElementById('waiPrompt').value.trim();
  const phone = document.getElementById('waiPhone').value.trim();
  const statusEl = document.getElementById('waiStatus');

  if (!groomPhoto || !bridePhoto) { statusEl.textContent = 'Vui lòng tải đủ ảnh chú rể và cô dâu.'; return; }
  if (!phone) { statusEl.textContent = 'Vui lòng nhập số điện thoại/Zalo để nhận lượt tạo miễn phí.'; return; }
  if (!prompt) { statusEl.textContent = 'Vui lòng nhập hoặc chọn ý tưởng phong cách.'; return; }
  if (getCount() >= FREE_LIMIT) {
    statusEl.textContent = `Bạn đã dùng hết ${FREE_LIMIT} lượt tạo miễn phí trên trình duyệt này. Liên hệ Zalo Thiên Gia Food để được hỗ trợ thêm.`;
    return;
  }

  const btn = document.getElementById('btnGenerateWedding');
  const original = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'AI đang thiết kế ảnh cưới... (có thể mất 20-30 giây)';
  statusEl.textContent = '';

  try {
    const resp = await fetch('/api/generate-wedding-photo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, phone, groomPhoto, bridePhoto })
    });
    const result = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      if (result.error === 'not_configured') {
        statusEl.textContent = 'Tính năng ghép ảnh AI chưa được kích hoạt (chưa gắn API key Gemini). Vui lòng liên hệ quản trị viên web.';
      } else {
        statusEl.textContent = result.message || 'Có lỗi khi tạo ảnh, vui lòng thử lại.';
      }
      return;
    }

    incCount();
    showResult(result.image);
    statusEl.textContent = `Tạo thành công! (còn ${Math.max(0, FREE_LIMIT - getCount())} lượt miễn phí trên trình duyệt này)`;
  } catch (err) {
    statusEl.textContent = 'Không kết nối được máy chủ AI, vui lòng thử lại sau.';
  } finally {
    btn.disabled = false;
    btn.textContent = original;
  }
}

function onDownloadWedding() {
  if (!lastResultImage) return;
  const a = document.createElement('a');
  a.href = lastResultImage;
  a.download = 'anh-cuoi-ai-thiengiafood.png';
  document.body.appendChild(a);
  a.click();
  a.remove();
  showToast('Đã tải ảnh về!');
}

document.addEventListener('DOMContentLoaded', () => {
  buildStyleGrid();
  bindUpload('groomInput', 'groomPreview', v => { groomPhoto = v; });
  bindUpload('brideInput', 'bridePreview', v => { bridePhoto = v; });
  document.getElementById('btnGenerateWedding').addEventListener('click', onGenerateWedding);
  document.getElementById('btnDownloadWedding').addEventListener('click', onDownloadWedding);
  document.getElementById('btnRegenerateWedding').addEventListener('click', onGenerateWedding);
});
