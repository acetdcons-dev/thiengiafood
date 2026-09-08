/* Trang 38 thực đơn Thiên Gia Food. */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const menus = window.PARTY_MENUS || [];
  const config = window.THIEN_GIA_CONFIG;
  const grid = document.getElementById('menuGrid');
  const filters = document.getElementById('menuFilters');
  const search = document.getElementById('menuSearch');
  const priceFilter = document.getElementById('priceFilter');
  const dishCountFilter = document.getElementById('dishCountFilter');
  const featuredFilter = document.getElementById('featuredFilter');
  const sort = document.getElementById('sortMenus');
  const resultCount = document.getElementById('resultCount');
  const emptyState = document.getElementById('emptyState');
  const modal = document.getElementById('menuModal');
  const modalDialog = modal.querySelector('.menu-modal__dialog');
  const modalContent = document.getElementById('menuModalContent');
  let lastFocused = null;

  const publicDishName = name => name.replace(/Naifood/gi, '[tên món chờ xác nhận]');
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const money = value => `${value.toLocaleString('vi-VN')}đ`;
  const caption = 'Hình ảnh món ăn tham khảo từ mẫu thực đơn nguồn.';

  [...new Set(menus.map(menu => menu.priceTier))].forEach(tier => priceFilter.add(new Option(tier, tier)));
  [...new Set(menus.map(menu => menu.dishes.length))].sort((a, b) => a - b).forEach(count => dishCountFilter.add(new Option(`${count} món`, count)));

  const cardTemplate = menu => `
    <article class="party-menu-card" id="${menu.slug}">
      <div class="party-menu-card__media">
        <img src="${menu.image}" alt="${menu.imageAlt}" width="1200" height="900" loading="lazy" decoding="async">
        ${menu.featured ? '<span class="party-menu-card__badge">Nổi bật</span>' : ''}
      </div>
      <p class="party-menu-card__caption">${caption}</p>
      <div class="party-menu-card__body">
        <div class="party-menu-card__heading"><h3>${menu.name}</h3><p class="party-menu-card__price">${menu.totalPrice}/bàn</p></div>
        <p class="party-menu-card__meta">${menu.dishes.length} món · Giá cần xác nhận theo điều kiện phục vụ</p>
        <ol class="party-menu-card__dishes">${menu.dishes.slice(0, 3).map(dish => `<li><span>${publicDishName(dish.dishName)}</span><strong>${dish.dishPrice}</strong></li>`).join('')}</ol>
        <div class="party-menu-card__actions">
          <button class="btn btn--outline" type="button" data-detail="${menu.number}">Xem Chi Tiết</button>
          <button class="btn btn--primary" type="button" data-select="${menu.number}">Chọn Thực Đơn Này</button>
          <button class="btn btn--ghost" type="button" data-adjust="${menu.number}">Tư Vấn Điều Chỉnh Món</button>
        </div>
      </div>
    </article>`;

  const getFiltered = () => {
    const query = normalize(search.value.trim());
    const list = menus.filter(menu => {
      const matchesSearch = !query || menu.dishes.some(dish => normalize(publicDishName(dish.dishName)).includes(query));
      return matchesSearch && (!priceFilter.value || menu.priceTier === priceFilter.value) && (!dishCountFilter.value || menu.dishes.length === Number(dishCountFilter.value)) && (!featuredFilter.checked || menu.featured);
    });
    if (sort.value === 'price-asc') list.sort((a, b) => a.totalPriceNumeric - b.totalPriceNumeric || a.number - b.number);
    if (sort.value === 'price-desc') list.sort((a, b) => b.totalPriceNumeric - a.totalPriceNumeric || a.number - b.number);
    return list;
  };

  const render = () => {
    const list = getFiltered();
    if (!grid.children.length) grid.innerHTML = menus.map(cardTemplate).join('');
    const visibleIds = new Set(list.map(menu => menu.id));
    [...grid.children].forEach(card => { card.hidden = !visibleIds.has(card.id.replace('thuc-don-', 'menu-')); });
    list.forEach(menu => grid.appendChild(document.getElementById(menu.slug)));
    resultCount.textContent = `${list.length} thực đơn được tìm thấy`;
    emptyState.hidden = list.length !== 0;
  };

  const modalTemplate = menu => {
    const dishTotal = menu.dishes.reduce((total, dish) => total + dish.dishPriceNumeric, 0);
    return `<img class="menu-detail__image" src="${menu.image}" alt="${menu.imageAlt}" width="1200" height="900" decoding="async">
      <div class="menu-detail__body"><p class="party-menu-card__caption">${caption}</p><div class="menu-detail__head"><h2 id="modalTitle">${menu.name}</h2><p class="menu-detail__price">${menu.totalPrice}/bàn</p></div>
      <ol class="menu-detail__dishes">${menu.dishes.map(dish => `<li><span>${publicDishName(dish.dishName)}</span><strong>${dish.dishPrice}</strong></li>`).join('')}</ol>
      <p class="menu-detail__total"><span>Tổng giá món tính lại</span><span>${money(dishTotal)}</span></p>
      <p class="menu-detail__note">Có thể trao đổi điều chỉnh món theo nhu cầu thực tế. Giá và phạm vi phục vụ cần được Thiên Gia Food xác nhận trước khi đặt.</p>
      <div class="menu-detail__actions"><button class="btn btn--primary" type="button" data-select="${menu.number}">Nhận Menu &amp; Báo Giá</button><button class="btn btn--outline" type="button" data-adjust="${menu.number}">Tư Vấn Điều Chỉnh Món</button></div></div>`;
  };

  const setUrlMenu = number => {
    const url = new URL(window.location.href);
    if (number) url.searchParams.set('menu', number); else url.searchParams.delete('menu');
    history.replaceState({}, '', url);
  };
  const openModal = (number, updateUrl = true) => {
    const menu = menus.find(item => item.number === Number(number));
    if (!menu) return;
    lastFocused = document.activeElement;
    modalContent.innerHTML = modalTemplate(menu);
    modal.hidden = false;
    document.body.classList.add('has-modal');
    if (updateUrl) setUrlMenu(menu.number);
    modal.querySelector('[data-close-modal]').focus();
  };
  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove('has-modal');
    setUrlMenu(null);
    if (lastFocused) lastFocused.focus();
  };
  const selectMenu = (number, adjust = false) => {
    const menu = menus.find(item => item.number === Number(number));
    if (!menu) return;
    document.getElementById('mfMenu').value = `${menu.name} - ${menu.totalPrice}/bàn`;
    closeModal();
    document.getElementById('nhan-tu-van').scrollIntoView({ behavior: 'smooth' });
    if (adjust) setTimeout(() => document.getElementById('mfChanges').focus(), 450);
  };

  filters.addEventListener('input', render);
  filters.addEventListener('change', render);
  filters.addEventListener('reset', () => setTimeout(render));
  document.addEventListener('click', event => {
    const detail = event.target.closest('[data-detail]');
    const select = event.target.closest('[data-select]');
    const adjust = event.target.closest('[data-adjust]');
    if (detail) openModal(detail.dataset.detail);
    if (select) selectMenu(select.dataset.select);
    if (adjust) selectMenu(adjust.dataset.adjust, true);
    if (event.target.closest('[data-close-modal]')) closeModal();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
    if (event.key === 'Tab' && !modal.hidden) {
      const focusable = [...modalDialog.querySelectorAll('button, a[href]')];
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const dropdown = document.getElementById('navDropdown');
  const dropdownToggle = document.getElementById('navDropdownToggle');
  burger.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); burger.setAttribute('aria-expanded', String(open)); });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); }));
  dropdownToggle.addEventListener('click', () => { const open = dropdown.classList.toggle('is-open'); dropdownToggle.setAttribute('aria-expanded', String(open)); });

  document.getElementById('menuServiceAreas').innerHTML = config.serviceAreas.map(area => `<option value="${area}"></option>`).join('');
  document.getElementById('mfType').insertAdjacentHTML('beforeend', config.eventTypes.map(type => `<option>${type}</option>`).join(''));
  const setLink = (id, href, label) => { const link = document.getElementById(id); link.href = href; link.textContent = label; };
  setLink('footerPhone', `tel:${config.contact.phone}`, config.contact.phoneDisplay);
  setLink('footerEmail', `mailto:${config.contact.email}`, config.contact.email);
  setLink('footerFacebook', config.contact.socialLinks[0].url, config.contact.socialLinks[0].name);
  document.getElementById('footerAddress').textContent = config.contact.address;
  document.getElementById('year').textContent = new Date().getFullYear();

  const canonical = document.getElementById('canonical');
  if (config.siteUrl) canonical.href = `${config.siteUrl.replace(/\/$/, '')}/thuc-don-dai-tiec.html`; else canonical.remove();

  const form = document.getElementById('menuBookingForm');
  const submit = document.getElementById('menuBookingSubmit');
  const status = document.getElementById('menuBookingStatus');
  const startedAt = Date.now();
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.checkValidity()) { status.textContent = 'Vui lòng điền đầy đủ các trường bắt buộc.'; form.reportValidity(); return; }
    const phone = document.getElementById('mfPhone').value.trim().replace(/[\s.-]/g, '');
    if (!/^(0|\+84)[0-9]{9,10}$/.test(phone)) { status.textContent = 'Số điện thoại chưa đúng định dạng.'; document.getElementById('mfPhone').focus(); return; }
    if (!config.leadEndpoint) { status.textContent = 'Hệ thống tiếp nhận đang được cấu hình. Vui lòng liên hệ hotline hoặc Zalo.'; return; }
    const data = Object.fromEntries(new FormData(form).entries());
    data.pageUrl = window.location.href; data.formStartedAt = startedAt;
    submit.disabled = true; submit.textContent = 'Đang gửi...'; status.textContent = 'Đang gửi yêu cầu tư vấn.';
    try {
      const response = await fetch(config.leadEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Không thể gửi yêu cầu lúc này.');
      status.textContent = 'Thiên Gia Food đã nhận thông tin và sẽ liên hệ tư vấn.'; form.reset();
    } catch (error) { status.textContent = error.message || 'Không thể gửi yêu cầu. Vui lòng liên hệ hotline hoặc Zalo.'; }
    finally { submit.disabled = false; submit.textContent = 'Nhận Menu & Báo Giá'; }
  });

  render();
  const directMenu = Number(new URLSearchParams(window.location.search).get('menu'));
  if (directMenu >= 1 && directMenu <= 38) openModal(directMenu, false);

  const itemList = document.createElement('script');
  itemList.type = 'application/ld+json';
  itemList.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: menus.map(menu => ({ '@type': 'ListItem', position: menu.number, name: menu.name, ...(config.siteUrl ? { url: `${config.siteUrl.replace(/\/$/, '')}/thuc-don-dai-tiec.html?menu=${menu.number}` } : {}) })) });
  document.head.appendChild(itemList);
});
