/* Thiên Gia Food — invite.js (Thiệp Mời Online) */

const EVENT_TYPES = {
  cuoi: {
    palette: 'ruby', label: 'Đám Cưới', eyebrow: 'THIỆP MỜI',
    name1Label: 'Tên Chú Rể', name2Label: 'Tên Cô Dâu', showName2: true,
    defaultMsg: 'Trân trọng kính mời quý khách đến chung vui cùng gia đình chúng tôi trong ngày lễ thành hôn',
    defaultHost: 'Gia đình hai họ'
  },
  hoi: {
    palette: 'terracotta', label: 'Lễ Ăn Hỏi', eyebrow: 'THIỆP MỜI',
    name1Label: 'Tên Chú Rể', name2Label: 'Tên Cô Dâu', showName2: true,
    defaultMsg: 'Trân trọng kính mời quý khách đến dự lễ ăn hỏi của chúng tôi',
    defaultHost: 'Gia đình hai họ'
  },
  thoinoi: {
    palette: 'pastel', label: 'Thôi Nôi', eyebrow: 'THIỆP MỜI THÔI NÔI',
    name1Label: 'Tên Bé', name2Label: '', showName2: false,
    defaultMsg: 'Kính mời đến chung vui cùng gia đình trong ngày thôi nôi của bé',
    defaultHost: 'Gia đình bé'
  },
  sinhnhat: {
    palette: 'gold', label: 'Sinh Nhật', eyebrow: 'THIỆP MỜI SINH NHẬT',
    name1Label: 'Tên Nhân Vật Chính', name2Label: '', showName2: false,
    defaultMsg: 'Kính mời đến chung vui cùng gia đình trong ngày sinh nhật',
    defaultHost: ''
  },
  tangia: {
    palette: 'jade', label: 'Tân Gia', eyebrow: 'THIỆP MỜI TÂN GIA',
    name1Label: 'Tên Gia Chủ', name2Label: '', showName2: false,
    defaultMsg: 'Kính mời đến chung vui cùng gia đình trong ngày tân gia, chúc nhà mới an khang thịnh vượng',
    defaultHost: 'Gia đình'
  },
  khaitruong: {
    palette: 'royal', label: 'Khai Trương', eyebrow: 'THIỆP MỜI KHAI TRƯƠNG',
    name1Label: 'Tên Cửa Hàng / Công Ty', name2Label: '', showName2: false,
    defaultMsg: 'Trân trọng kính mời đến dự lễ khai trương, chúc buôn may bán đắt',
    defaultHost: ''
  }
};

const COLOR_PALETTES = {
  ruby:       { name: 'Đỏ Ruby',        bgFrom: '#3f0f15', bgTo: '#2b0a0e', accent: '#e9c26e', text: '#fdf6ea', sub: 'rgba(253,246,234,0.85)' },
  gold:       { name: 'Vàng Gold',      bgFrom: '#6b4a12', bgTo: '#3d2a08', accent: '#fdf6ea', text: '#fdf6ea', sub: 'rgba(253,246,234,0.85)' },
  pastel:     { name: 'Hồng Pastel',    bgFrom: '#fdf1f4', bgTo: '#f5d8e0', accent: '#c77b96', text: '#7a2f45', sub: 'rgba(122,47,69,0.75)' },
  jade:       { name: 'Xanh Ngọc',      bgFrom: '#0d3b34', bgTo: '#082720', accent: '#c9e8b8', text: '#eefaf1', sub: 'rgba(238,250,241,0.85)' },
  lavender:   { name: 'Tím Lavender',   bgFrom: '#3a2352', bgTo: '#211230', accent: '#e3c9f5', text: '#f5eeff', sub: 'rgba(245,238,255,0.85)' },
  royal:      { name: 'Xanh Hoàng Gia', bgFrom: '#0d2a4a', bgTo: '#081a30', accent: '#d9b968', text: '#f0f5fb', sub: 'rgba(240,245,251,0.85)' },
  terracotta: { name: 'Cam Đất',        bgFrom: '#7a3418', bgTo: '#4a1f0d', accent: '#f2c879', text: '#fdf1e4', sub: 'rgba(253,241,228,0.85)' },
  noir:       { name: 'Đen Sang Trọng', bgFrom: '#242220', bgTo: '#0a0908', accent: '#d4af37', text: '#fdf6ea', sub: 'rgba(253,246,234,0.8)' },
  ivory:      { name: 'Kem Thanh Lịch', bgFrom: '#fdf6ea', bgTo: '#f0e4c8', accent: '#a8791f', text: '#4a1a1a', sub: 'rgba(74,26,26,0.75)' }
};

const LAYOUT_STYLES = {
  classic: { name: 'Cổ Điển' },
  floral:  { name: 'Hoa Văn' },
  minimal: { name: 'Tối Giản' }
};

const CATEGORIES = [
  { key: 'all', label: 'Tất cả', short: '' },
  { key: 'cuoihoi', label: '💍 Cưới & Ăn Hỏi', short: 'Cưới & Ăn Hỏi' },
  { key: 'thoinoisinhnhat', label: '🎂 Thôi Nôi & Sinh Nhật', short: 'Thôi Nôi & Sinh Nhật' },
  { key: 'sukien', label: '🎉 Tân Gia & Khai Trương', short: 'Tân Gia & Khai Trương' }
];

// Danh sách mẫu thiệp cho thư viện chọn mẫu. Mỗi mẫu = 1 tổ hợp loại thiệp +
// màu + kiểu trình bày có sẵn. Trường "thumbnail" hiện để trống (null) nên
// gallery tự vẽ bản xem trước "sống" bằng đúng hệ màu/kiểu chữ thật của
// thiệp. KHI CÓ ẢNH MẪU THIẾT KẾ RIÊNG: chỉ cần điền đường dẫn ảnh vào
// "thumbnail" (ví dụ: 'assets/img/templates/cuoi-ruby.jpg') — ảnh đó sẽ tự
// động thay thế bản xem trước, không cần sửa gì khác.
const TEMPLATES = [
  { id: 'cuoi-ruby',        type: 'cuoi',       palette: 'ruby',       layout: 'classic', category: 'cuoihoi',          name: 'Cổ Điển — Đỏ Ruby',        desc: 'Sang trọng, ấm cúng, tông đỏ ruby ánh vàng truyền thống.', sample1: 'Văn A', sample2: 'Thị B', thumbnail: null },
  { id: 'cuoi-ivory',       type: 'cuoi',       palette: 'ivory',      layout: 'floral',  category: 'cuoihoi',          name: 'Hoa Văn — Kem Thanh Lịch', desc: 'Nền kem nhẹ nhàng, hoạ tiết góc tinh tế, hiện đại.',       sample1: 'Văn A', sample2: 'Thị B', thumbnail: null },
  { id: 'hoi-terracotta',   type: 'hoi',        palette: 'terracotta', layout: 'classic', category: 'cuoihoi',          name: 'Lễ Ăn Hỏi — Cam Đất',      desc: 'Tông cam đất ấm áp, phong cách truyền thống.',             sample1: 'Văn A', sample2: 'Thị B', thumbnail: null },
  { id: 'thoinoi-pastel',   type: 'thoinoi',    palette: 'pastel',     layout: 'floral',  category: 'thoinoisinhnhat',  name: 'Thôi Nôi — Hồng Pastel',   desc: 'Dịu dàng, đáng yêu, phù hợp cho bé trai lẫn bé gái.',      sample1: 'Bé Bin', sample2: '', thumbnail: null },
  { id: 'sinhnhat-gold',    type: 'sinhnhat',   palette: 'gold',       layout: 'classic', category: 'thoinoisinhnhat',  name: 'Sinh Nhật — Vàng Rực Rỡ',  desc: 'Nổi bật, vui tươi, hợp mọi lứa tuổi.',                     sample1: 'Minh Khuê', sample2: '', thumbnail: null },
  { id: 'sinhnhat-lavender',type: 'sinhnhat',   palette: 'lavender',   layout: 'minimal', category: 'thoinoisinhnhat',  name: 'Sinh Nhật — Tím Lavender', desc: 'Phong cách tối giản, hiện đại, thanh lịch.',               sample1: 'Minh Khuê', sample2: '', thumbnail: null },
  { id: 'tangia-jade',      type: 'tangia',     palette: 'jade',       layout: 'classic', category: 'sukien',           name: 'Tân Gia — Xanh Ngọc',      desc: 'Tươi mới, mang ý nghĩa an khang thịnh vượng.',             sample1: 'Gia Đình Anh Khoa', sample2: '', thumbnail: null },
  { id: 'khaitruong-royal', type: 'khaitruong', palette: 'royal',      layout: 'classic', category: 'sukien',           name: 'Khai Trương — Hoàng Gia',  desc: 'Sang trọng, chuyên nghiệp cho cửa hàng/công ty mới.',      sample1: 'Cửa Hàng ABC', sample2: '', thumbnail: null },
  { id: 'khaitruong-noir',  type: 'khaitruong', palette: 'noir',       layout: 'minimal', category: 'sukien',           name: 'Khai Trương — Đen Sang Trọng', desc: 'Tối giản, đẳng cấp, hiện đại.',                        sample1: 'Công Ty XYZ', sample2: '', thumbnail: null }
];

const WEEKDAYS = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

const ORNAMENT_TOP = '<svg class="invite-card__ornament" viewBox="0 0 200 40" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M0 20 H74 M126 20 H200"/><circle cx="100" cy="20" r="13"/><path d="M100 9 V31 M89 20 H111" stroke-width="0.8" opacity="0.6"/></svg>';
const ORNAMENT_BOTTOM = '<svg class="invite-card__ornament invite-card__ornament--bottom" viewBox="0 0 200 40" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M0 20 H74 M126 20 H200"/><circle cx="100" cy="20" r="6"/></svg>';
const CORNER_FLOURISH = '<svg viewBox="0 0 46 46" fill="none" stroke="currentColor" stroke-width="1.1" aria-hidden="true"><path d="M2 2 V20 M2 2 H20"/><path d="M2 2 C 14 4, 20 10, 22 22" stroke-width="0.8" opacity="0.7"/><circle cx="9" cy="9" r="1.6" fill="currentColor" stroke="none"/></svg>';

const MAX_PHOTO_DIM = 220;
const PHOTO_QUALITY = 0.65;
const AI_FREE_LIMIT = 3;
const AI_COUNT_KEY = 'tgf_ai_generate_count';
const PHOTO_DATA_RE = /^data:image\/(png|jpe?g|webp);base64,[A-Za-z0-9+/=]+$/;

let currentType = 'cuoi';
let currentPalette = 'ruby';
let currentLayout = 'classic';
let currentPhotoData = null;
let currentAIBackground = null;
let currentCategory = 'all';
let demoTplId = null;

/* ===== HELPERS ===== */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : str;
  return div.innerHTML;
}

function isValidPhotoData(str) {
  return typeof str === 'string' && str.length < 200000 && PHOTO_DATA_RE.test(str);
}

function formatDateVN(dateStr, timeStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T' + (timeStr || '00:00'));
  if (isNaN(d)) return '';
  const wd = WEEKDAYS[d.getDay()];
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  let out = `${wd}, ngày ${dd}/${mm}/${yyyy}`;
  if (timeStr) out += ` lúc ${timeStr}`;
  return out;
}

function encodeData(obj) {
  const json = JSON.stringify(obj);
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  bytes.forEach(b => { binary += String.fromCharCode(b); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function decodeData(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const json = new TextDecoder().decode(bytes);
  return JSON.parse(json);
}

function wrapText(ctx, text, maxWidth) {
  const words = String(text || '').split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawImageCover(ctx, img, x, y, w, h) {
  const ir = img.width / img.height;
  const r = w / h;
  let sx, sy, sw, sh;
  if (ir > r) {
    sh = img.height; sw = sh * r; sx = (img.width - sw) / 2; sy = 0;
  } else {
    sw = img.width; sh = sw / r; sx = 0; sy = (img.height - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

/* ===== CARD RENDER (HTML preview) ===== */
function renderCardHTML(data) {
  const cfg = EVENT_TYPES[data.type] || EVENT_TYPES.cuoi;
  const layout = data.layout || 'classic';
  const title = (cfg.showName2 && data.name2)
    ? `${escapeHtml(data.name1 || '...')} <span class="invite-amp">&amp;</span> ${escapeHtml(data.name2)}`
    : escapeHtml(data.name1 || cfg.label);
  const dateStr = formatDateVN(data.eventDate, data.eventTime);
  const msg = data.message || cfg.defaultMsg;
  const host = data.hostName || cfg.defaultHost;
  const photoHTML = isValidPhotoData(data.photo)
    ? `<img class="invite-card__photo" src="${data.photo}" alt="">`
    : '';
  const cornersHTML = layout === 'floral'
    ? `<span class="invite-card__corner invite-card__corner--tl">${CORNER_FLOURISH}</span><span class="invite-card__corner invite-card__corner--br">${CORNER_FLOURISH}</span>`
    : '';

  return `
    ${cornersHTML}
    ${ORNAMENT_TOP}
    ${photoHTML}
    <span class="invite-card__eyebrow">${escapeHtml(cfg.eyebrow)}</span>
    <h2 class="invite-card__title">${title}</h2>
    <p class="invite-card__message">${escapeHtml(msg)}</p>
    <div class="invite-card__divider" aria-hidden="true"></div>
    ${dateStr ? `<div class="invite-card__datetime">${escapeHtml(dateStr)}</div>` : ''}
    ${data.venue ? `<div class="invite-card__venue">${escapeHtml(data.venue)}</div>` : ''}
    ${data.address ? `<div class="invite-card__address">${escapeHtml(data.address)}</div>` : ''}
    ${host ? `<div class="invite-card__host">${escapeHtml(host)}</div>` : ''}
    ${ORNAMENT_BOTTOM}
    <div class="invite-card__brand">Thiệp được tạo bởi <a href="index.html" target="_blank" rel="noopener">Thiên Gia Food</a></div>
  `;
}

function applyPaletteAndLayout(card, paletteKey, layoutKey) {
  const pal = COLOR_PALETTES[paletteKey || currentPalette] || COLOR_PALETTES.ruby;
  const layout = layoutKey || currentLayout;
  card.style.setProperty('--card-bg-from', pal.bgFrom);
  card.style.setProperty('--card-bg-to', pal.bgTo);
  card.style.setProperty('--card-accent', pal.accent);
  card.style.setProperty('--card-text', pal.text);
  card.style.setProperty('--card-sub', pal.sub);
  card.classList.remove('layout-classic', 'layout-floral', 'layout-minimal');
  card.classList.add(`layout-${layout}`);
}

function applyAIBackground(card) {
  if (currentAIBackground) {
    card.style.backgroundImage = `url(${currentAIBackground})`;
    card.classList.add('has-ai-bg');
  } else {
    card.style.backgroundImage = '';
    card.classList.remove('has-ai-bg');
  }
}

/* ===== CARD RENDER (Canvas → tải ảnh) ===== */
function drawGradientBg(ctx, th, W, H) {
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, th.bgFrom);
  grad.addColorStop(1, th.bgTo);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
}

async function drawCardToCanvas(canvas, data, aiBg) {
  if (document.fonts && document.fonts.ready) {
    try { await document.fonts.ready; } catch (e) { /* ignore */ }
  }
  const cfg = EVENT_TYPES[data.type] || EVENT_TYPES.cuoi;
  const th = COLOR_PALETTES[data.palette] || COLOR_PALETTES[cfg.palette] || COLOR_PALETTES.ruby;
  const layout = data.layout || 'classic';
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  let usedAIBg = false;
  if (aiBg) {
    try {
      const bgImg = await loadImage(aiBg);
      drawImageCover(ctx, bgImg, 0, 0, W, H);
      ctx.fillStyle = 'rgba(20,8,8,0.45)';
      ctx.fillRect(0, 0, W, H);
      usedAIBg = true;
    } catch (e) {
      drawGradientBg(ctx, th, W, H);
    }
  } else {
    drawGradientBg(ctx, th, W, H);
  }

  const textColor = usedAIBg ? '#fdf6ea' : th.text;
  const subColor = usedAIBg ? 'rgba(253,246,234,0.88)' : th.sub;
  const accentColor = usedAIBg ? '#f6e3a3' : th.accent;

  if (layout !== 'minimal') {
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = layout === 'floral' ? 1.5 : 3;
    ctx.globalAlpha = layout === 'floral' ? 0.6 : 1;
    ctx.strokeRect(40, 40, W - 80, H - 80);
    ctx.globalAlpha = 1;
    if (layout === 'classic') {
      ctx.lineWidth = 1;
      ctx.strokeRect(58, 58, W - 116, H - 116);
    }
  }

  ctx.textAlign = 'center';
  let y = H * 0.13;

  if (isValidPhotoData(data.photo)) {
    try {
      const photoImg = await loadImage(data.photo);
      const r = 78;
      const cx = W / 2, cy = y + r;
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      drawImageCover(ctx, photoImg, cx - r, cy - r, r * 2, r * 2);
      ctx.restore();
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      y = cy + r + 46;
    } catch (e) { /* ảnh lỗi, bỏ qua */ }
  }

  ctx.fillStyle = accentColor;
  ctx.font = '600 22px "Be Vietnam Pro", sans-serif';
  ctx.fillText(cfg.eyebrow.split('').join('  '), W / 2, y);
  y += 66;

  const title = (cfg.showName2 && data.name2) ? `${data.name1 || '...'}   &   ${data.name2}` : (data.name1 || cfg.label);
  ctx.fillStyle = textColor;
  ctx.font = '800 56px "Playfair Display", serif';
  wrapText(ctx, title, W - 180).forEach(line => { ctx.fillText(line, W / 2, y); y += 68; });
  y += 20;

  ctx.font = 'italic 400 25px "Playfair Display", serif';
  ctx.fillStyle = subColor;
  const msg = data.message || cfg.defaultMsg;
  wrapText(ctx, msg, W - 240).forEach(line => { ctx.fillText(line, W / 2, y); y += 34; });
  y += 28;

  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(W / 2 - 60, y); ctx.lineTo(W / 2 + 60, y); ctx.stroke();
  y += 50;

  const dateStr = formatDateVN(data.eventDate, data.eventTime);
  if (dateStr) {
    ctx.font = '700 28px "Be Vietnam Pro", sans-serif';
    ctx.fillStyle = textColor;
    ctx.fillText(dateStr, W / 2, y);
    y += 44;
  }

  if (data.venue) {
    ctx.font = '600 24px "Be Vietnam Pro", sans-serif';
    ctx.fillStyle = textColor;
    ctx.fillText(data.venue, W / 2, y);
    y += 36;
  }

  if (data.address) {
    ctx.font = '400 21px "Be Vietnam Pro", sans-serif';
    ctx.fillStyle = subColor;
    wrapText(ctx, data.address, W - 220).forEach(line => { ctx.fillText(line, W / 2, y); y += 28; });
    y += 6;
  }

  const host = data.hostName || cfg.defaultHost;
  if (host) {
    y += 20;
    ctx.font = 'italic 400 23px "Playfair Display", serif';
    ctx.fillStyle = accentColor;
    ctx.fillText(host, W / 2, y);
  }

  ctx.font = '500 17px "Be Vietnam Pro", sans-serif';
  ctx.fillStyle = subColor;
  ctx.fillText('Được tạo bởi Thiên Gia Food · Đặt tiệc tại nhà trọn gói', W / 2, H - 60);
}

/* ===== FORM / STATE ===== */
function collectFormData() {
  const data = {
    type: currentType,
    palette: currentPalette,
    layout: currentLayout,
    name1: document.getElementById('name1').value.trim(),
    name2: document.getElementById('name2').value.trim(),
    eventDate: document.getElementById('eventDate').value,
    eventTime: document.getElementById('eventTime').value,
    venue: document.getElementById('venue').value.trim(),
    address: document.getElementById('address').value.trim(),
    message: document.getElementById('message').value.trim(),
    hostName: document.getElementById('hostName').value.trim()
  };
  if (currentPhotoData) data.photo = currentPhotoData;
  return data;
}

function updatePreview() {
  const data = collectFormData();
  const card = document.getElementById('inviteCard');
  card.innerHTML = renderCardHTML(data);
  applyPaletteAndLayout(card);
  applyAIBackground(card);
}

function buildTypeGrid() {
  const grid = document.getElementById('typeGrid');
  grid.innerHTML = Object.entries(EVENT_TYPES).map(([key, cfg]) =>
    `<button type="button" class="invite-type-btn" data-type="${key}">${cfg.label}</button>`
  ).join('');
  grid.querySelectorAll('.invite-type-btn').forEach(btn => {
    btn.addEventListener('click', () => selectType(btn.dataset.type));
  });
}

function buildPaletteGrid() {
  const grid = document.getElementById('paletteGrid');
  grid.innerHTML = Object.entries(COLOR_PALETTES).map(([key, pal]) =>
    `<button type="button" class="invite-palette-btn" data-palette="${key}" title="${pal.name}" style="background:linear-gradient(135deg, ${pal.bgFrom}, ${pal.bgTo})"></button>`
  ).join('');
  grid.querySelectorAll('.invite-palette-btn').forEach(btn => {
    btn.addEventListener('click', () => selectPalette(btn.dataset.palette));
  });
}

function buildLayoutGrid() {
  const grid = document.getElementById('layoutGrid');
  grid.innerHTML = Object.entries(LAYOUT_STYLES).map(([key, st]) =>
    `<button type="button" class="invite-layout-btn" data-layout="${key}">${st.name}</button>`
  ).join('');
  grid.querySelectorAll('.invite-layout-btn').forEach(btn => {
    btn.addEventListener('click', () => selectLayout(btn.dataset.layout));
  });
}

function selectPalette(key) {
  currentPalette = key;
  document.querySelectorAll('.invite-palette-btn').forEach(b => b.classList.toggle('is-active', b.dataset.palette === key));
  updatePreview();
}

function selectLayout(key) {
  currentLayout = key;
  document.querySelectorAll('.invite-layout-btn').forEach(b => b.classList.toggle('is-active', b.dataset.layout === key));
  updatePreview();
}

function applyTypeUI(key) {
  const cfg = EVENT_TYPES[key];
  document.getElementById('name1Label').textContent = cfg.name1Label;
  document.getElementById('name2Group').style.display = cfg.showName2 ? '' : 'none';
  document.getElementById('message').placeholder = cfg.defaultMsg;
  document.getElementById('hostName').placeholder = cfg.defaultHost || 'VD: Gia đình...';
  document.getElementById('shareResult').hidden = true;
  currentAIBackground = null;
  document.getElementById('btnResetAI').hidden = true;
  document.getElementById('aiStatus').textContent = '';
}

function selectType(key) {
  currentType = key;
  document.querySelectorAll('.invite-type-btn').forEach(b => b.classList.toggle('is-active', b.dataset.type === key));
  applyTypeUI(key);
  const cfg = EVENT_TYPES[key];
  selectPalette(cfg.palette);
  selectLayout('classic');
}

/* ===== THƯ VIỆN MẪU (gallery) ===== */
function buildCategoryPills() {
  const wrap = document.getElementById('categoryPills');
  wrap.innerHTML = CATEGORIES.map(c => `<button type="button" class="invite-pill" data-cat="${c.key}">${c.label}</button>`).join('');
  wrap.querySelectorAll('.invite-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.cat;
      wrap.querySelectorAll('.invite-pill').forEach(b => b.classList.toggle('is-active', b === btn));
      renderGallery();
    });
  });
  wrap.querySelector('[data-cat="all"]').classList.add('is-active');
}

function sampleDataFor(tpl) {
  return {
    type: tpl.type, palette: tpl.palette, layout: tpl.layout,
    name1: tpl.sample1 || '', name2: tpl.sample2 || '',
    eventDate: '', eventTime: '', venue: '', address: '', message: '', hostName: ''
  };
}

function templateCardHTML(tpl) {
  const cat = CATEGORIES.find(c => c.key === tpl.category);
  const thumb = tpl.thumbnail
    ? `<img class="template-card__thumb-img" src="${tpl.thumbnail}" alt="${escapeHtml(tpl.name)}">`
    : `<div class="invite-card invite-card--thumb" data-thumb="${tpl.id}" aria-hidden="true"></div>`;
  return `
    <article class="template-card">
      <div class="template-card__thumb-wrap">${thumb}</div>
      <span class="template-card__badge">${escapeHtml(cat ? cat.short : '')}</span>
      <h3 class="template-card__name">${escapeHtml(tpl.name)}</h3>
      <p class="template-card__desc">${escapeHtml(tpl.desc)}</p>
      <div class="template-card__actions">
        <button type="button" class="btn btn--outline" data-demo="${tpl.id}">👁 Xem Demo</button>
        <button type="button" class="btn btn--primary" data-use="${tpl.id}">Dùng Mẫu Này</button>
      </div>
    </article>
  `;
}

function renderGallery() {
  const grid = document.getElementById('templateGrid');
  const list = currentCategory === 'all' ? TEMPLATES : TEMPLATES.filter(t => t.category === currentCategory);
  grid.innerHTML = list.map(templateCardHTML).join('');

  list.forEach(tpl => {
    if (tpl.thumbnail) return;
    const holder = grid.querySelector(`[data-thumb="${tpl.id}"]`);
    if (!holder) return;
    holder.innerHTML = renderCardHTML(sampleDataFor(tpl));
    applyPaletteAndLayout(holder, tpl.palette, tpl.layout);
  });

  grid.querySelectorAll('[data-use]').forEach(btn => btn.addEventListener('click', () => useTemplate(btn.dataset.use)));
  grid.querySelectorAll('[data-demo]').forEach(btn => btn.addEventListener('click', () => showDemo(btn.dataset.demo)));
}

function useTemplate(id) {
  const tpl = TEMPLATES.find(t => t.id === id);
  if (!tpl) return;
  currentType = tpl.type;
  document.querySelectorAll('.invite-type-btn').forEach(b => b.classList.toggle('is-active', b.dataset.type === tpl.type));
  applyTypeUI(tpl.type);
  currentPalette = tpl.palette;
  currentLayout = tpl.layout;
  document.querySelectorAll('.invite-palette-btn').forEach(b => b.classList.toggle('is-active', b.dataset.palette === tpl.palette));
  document.querySelectorAll('.invite-layout-btn').forEach(b => b.classList.toggle('is-active', b.dataset.layout === tpl.layout));
  updatePreview();
  showCreateMode();
  const n1 = document.getElementById('name1');
  if (n1) n1.focus();
}

function showDemo(id) {
  const tpl = TEMPLATES.find(t => t.id === id);
  if (!tpl) return;
  demoTplId = id;
  const card = document.getElementById('demoCard');
  card.innerHTML = renderCardHTML(sampleDataFor(tpl));
  card.className = 'invite-card invite-card--large';
  applyPaletteAndLayout(card, tpl.palette, tpl.layout);
  document.getElementById('demoModal').hidden = false;
}

function closeDemo() {
  document.getElementById('demoModal').hidden = true;
  demoTplId = null;
}

function showCreateMode() {
  document.getElementById('galleryMode').hidden = true;
  document.getElementById('createMode').hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showGalleryMode() {
  document.getElementById('createMode').hidden = true;
  document.getElementById('galleryMode').hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ===== ẢNH CÁ NHÂN ===== */
function handlePhotoInput(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { showToast('Vui lòng chọn file ảnh.'); return; }

  const reader = new FileReader();
  reader.onload = (ev) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      const scale = Math.min(1, MAX_PHOTO_DIM / Math.max(width, height));
      width = Math.round(width * scale);
      height = Math.round(height * scale);
      canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      currentPhotoData = canvas.toDataURL('image/jpeg', PHOTO_QUALITY);

      const preview = document.getElementById('photoPreview');
      preview.style.backgroundImage = `url(${currentPhotoData})`;
      preview.classList.add('has-photo');
      document.getElementById('btnRemovePhoto').hidden = false;
      updatePreview();
    };
    img.onerror = () => showToast('Không đọc được ảnh, vui lòng thử ảnh khác.');
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

function removePhoto() {
  currentPhotoData = null;
  const preview = document.getElementById('photoPreview');
  preview.style.backgroundImage = '';
  preview.classList.remove('has-photo');
  document.getElementById('btnRemovePhoto').hidden = true;
  document.getElementById('photoInput').value = '';
  updatePreview();
}

/* ===== TOAST ===== */
let toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

/* ===== CHIA SẺ / TẢI ẢNH ===== */
function onShare() {
  const data = collectFormData();
  if (!data.name1 || !data.eventDate) {
    showToast('Vui lòng nhập tối thiểu tên và ngày tổ chức.');
    return;
  }
  const encoded = encodeData(data);
  const url = `${location.origin}${location.pathname}?d=${encoded}`;
  const shareLink = document.getElementById('shareLink');
  shareLink.value = url;
  document.getElementById('shareResult').hidden = false;
  shareLink.select();
  if (currentAIBackground) {
    showToast('Lưu ý: link chia sẻ dùng mẫu nền gốc — nền AI chỉ có trong ảnh tải về.');
  }
}

function onCopy() {
  const input = document.getElementById('shareLink');
  input.select();
  input.setSelectionRange(0, 99999);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(input.value)
      .then(() => showToast('Đã sao chép link thiệp!'))
      .catch(legacyCopy);
  } else {
    legacyCopy();
  }
  function legacyCopy() {
    try { document.execCommand('copy'); showToast('Đã sao chép link thiệp!'); }
    catch (e) { showToast('Không sao chép được, vui lòng copy thủ công.'); }
  }
}

async function onDownload() {
  const data = collectFormData();
  const canvas = document.getElementById('renderCanvas');
  await drawCardToCanvas(canvas, data, currentAIBackground);
  canvas.toBlob(blob => {
    if (!blob) { showToast('Có lỗi khi tạo ảnh, vui lòng thử lại.'); return; }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `thiep-moi-${data.type || 'thiep'}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('Đã tải ảnh thiệp!');
  }, 'image/png');
}

/* ===== THIẾT KẾ NỀN BẰNG AI (Gemini qua /api/generate-design) ===== */
function getAICount() { return parseInt(localStorage.getItem(AI_COUNT_KEY) || '0', 10); }
function incAICount() { localStorage.setItem(AI_COUNT_KEY, String(getAICount() + 1)); }

async function onGenerateAI() {
  const prompt = document.getElementById('aiPrompt').value.trim();
  const phone = document.getElementById('aiPhone').value.trim();
  const statusEl = document.getElementById('aiStatus');

  if (!phone) { statusEl.textContent = 'Vui lòng nhập số điện thoại/Zalo để nhận lượt tạo miễn phí.'; return; }
  if (!prompt) { statusEl.textContent = 'Vui lòng mô tả phong cách bạn muốn.'; return; }
  if (getAICount() >= AI_FREE_LIMIT) {
    statusEl.textContent = `Bạn đã dùng hết ${AI_FREE_LIMIT} lượt tạo AI miễn phí trên trình duyệt này. Liên hệ Zalo Thiên Gia Food để được hỗ trợ thêm.`;
    return;
  }

  const btn = document.getElementById('btnGenerateAI');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Đang vẽ nền AI...';
  statusEl.textContent = '';

  try {
    const cfg = EVENT_TYPES[currentType] || EVENT_TYPES.cuoi;
    const resp = await fetch('/api/generate-design', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, eventLabel: cfg.label, phone })
    });
    const result = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      if (result.error === 'not_configured') {
        statusEl.textContent = 'Tính năng AI chưa được kích hoạt (chưa gắn API key Gemini). Vui lòng liên hệ quản trị viên web.';
      } else {
        statusEl.textContent = result.message || 'Có lỗi khi tạo ảnh, vui lòng thử lại.';
      }
      return;
    }

    currentAIBackground = result.image;
    incAICount();
    document.getElementById('btnResetAI').hidden = false;
    statusEl.textContent = `Đã tạo nền AI thành công! (còn ${Math.max(0, AI_FREE_LIMIT - getAICount())} lượt miễn phí trên trình duyệt này)`;
    updatePreview();
  } catch (err) {
    statusEl.textContent = 'Không kết nối được máy chủ AI, vui lòng thử lại sau.';
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

function onResetAI() {
  currentAIBackground = null;
  document.getElementById('btnResetAI').hidden = true;
  document.getElementById('aiStatus').textContent = '';
  updatePreview();
}

/* ===== VIEW MODE (mở qua link chia sẻ) ===== */
function showViewMode(data) {
  document.getElementById('galleryMode').hidden = true;
  document.getElementById('createMode').hidden = true;
  document.getElementById('viewMode').hidden = false;
  const cfg = EVENT_TYPES[data.type] || EVENT_TYPES.cuoi;
  currentPalette = (data.palette && COLOR_PALETTES[data.palette]) ? data.palette : cfg.palette;
  currentLayout = (data.layout && LAYOUT_STYLES[data.layout]) ? data.layout : 'classic';
  const card = document.getElementById('viewCard');
  card.innerHTML = renderCardHTML(data);
  applyPaletteAndLayout(card);
  const titleName = (cfg.showName2 && data.name2) ? `${data.name1} & ${data.name2}` : (data.name1 || cfg.label);
  document.title = `${titleName} — Thiệp Mời · Thiên Gia Food`;
}

/* ===== INIT ===== */
function initCreateMode() {
  buildTypeGrid();
  buildPaletteGrid();
  buildLayoutGrid();
  selectType('cuoi');
  document.getElementById('inviteForm').addEventListener('input', updatePreview);
  document.getElementById('btnShare').addEventListener('click', onShare);
  document.getElementById('btnCopy').addEventListener('click', onCopy);
  document.getElementById('btnDownload').addEventListener('click', onDownload);
  document.getElementById('photoInput').addEventListener('change', handlePhotoInput);
  document.getElementById('btnRemovePhoto').addEventListener('click', removePhoto);
  document.getElementById('btnGenerateAI').addEventListener('click', onGenerateAI);
  document.getElementById('btnResetAI').addEventListener('click', onResetAI);
  document.getElementById('btnBackGallery').addEventListener('click', showGalleryMode);
}

function initGallery() {
  buildCategoryPills();
  renderGallery();
  document.getElementById('btnFreeDesign').addEventListener('click', () => {
    selectType('cuoi');
    showCreateMode();
  });
  document.getElementById('demoClose').addEventListener('click', closeDemo);
  document.getElementById('demoBackdrop').addEventListener('click', closeDemo);
  document.getElementById('demoUseBtn').addEventListener('click', () => {
    const id = demoTplId;
    closeDemo();
    if (id) useTemplate(id);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const encoded = params.get('d');
  if (encoded) {
    try {
      const data = decodeData(encoded);
      showViewMode(data);
      return;
    } catch (e) {
      /* link lỗi/hỏng -> rơi về thư viện mẫu */
    }
  }
  initCreateMode();
  initGallery();
});
