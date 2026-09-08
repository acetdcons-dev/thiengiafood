/* Thiên Gia Food - tương tác trang chủ, không gửi dữ liệu ra ngoài. */
document.addEventListener('DOMContentLoaded', () => {
  const config = window.THIEN_GIA_CONFIG;
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const navDropdown = document.getElementById('navDropdown');
  const navDropdownToggle = document.getElementById('navDropdownToggle');

  const setLink = (id, href, text) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.href = href;
    element.textContent = text;
    element.hidden = false;
  };
  const phoneHref = `tel:${config.contact.phone}`;
  setLink('floatCall', phoneHref, '☎');
  setLink('floatZalo', config.contact.zaloUrl, 'Zalo');
  setLink('headerPhone', phoneHref, config.contact.phoneDisplay);
  setLink('bookingPhone', phoneHref, `Hotline: ${config.contact.phoneDisplay}`);
  setLink('bookingZalo', config.contact.zaloUrl, `Zalo: ${config.contact.phoneDisplay}`);
  setLink('bookingEmail', `mailto:${config.contact.email}`, config.contact.email);
  setLink('footerPhone', phoneHref, config.contact.phoneDisplay);
  setLink('footerEmail', `mailto:${config.contact.email}`, config.contact.email);
  setLink('footerFacebook', config.contact.socialLinks[0].url, config.contact.socialLinks[0].name);
  document.getElementById('footerAddress').textContent = config.contact.address;
  document.getElementById('bookingAreas').textContent = `Khu vực phục vụ: ${config.serviceAreas.join(', ')}.`;
  document.getElementById('serviceAreaOptions').innerHTML = config.serviceAreas.map(area => `<option value="${area}"></option>`).join('');
  document.getElementById('bkType').insertAdjacentHTML('beforeend', config.eventTypes.map(type => `<option>${type}</option>`).join(''));

  const featuredMenuGrid = document.getElementById('homeFeaturedMenus');
  if (featuredMenuGrid && window.PARTY_MENUS) {
    featuredMenuGrid.innerHTML = window.PARTY_MENUS.filter(menu => menu.featured).map(menu => `<article class="home-menu-card"><img src="${menu.image}" alt="${menu.imageAlt}" width="1200" height="900" loading="lazy" decoding="async"><div class="home-menu-card__body"><h3>${menu.name}</h3><p>${menu.totalPrice}/bàn</p><a class="btn btn--outline btn--block" href="thuc-don-dai-tiec.html?menu=${menu.number}">Xem Chi Tiết</a></div></article>`).join('');
  }

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
    backToTop.classList.toggle('is-visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const closeMobileNav = () => {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  };
  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobileNav));

  navDropdownToggle.addEventListener('click', event => {
    event.stopPropagation();
    const isOpen = navDropdown.classList.toggle('is-open');
    navDropdownToggle.setAttribute('aria-expanded', String(isOpen));
  });
  document.addEventListener('click', event => {
    if (!navDropdown.contains(event.target)) {
      navDropdown.classList.remove('is-open');
      navDropdownToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.querySelectorAll('.faq__item').forEach(item => {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');
    question.addEventListener('click', () => {
      const willOpen = !item.classList.contains('is-open');
      document.querySelectorAll('.faq__item').forEach(other => {
        other.classList.remove('is-open');
        other.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq__answer').style.maxHeight = null;
      });
      if (willOpen) {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });

  const revealTargets = document.querySelectorAll('.usp__item, .service-card, .process__step, .pricing__card, .gallery__grid figure, .about__content, .about__media, .faq__item, .utility');
  if ('IntersectionObserver' in window) {
    revealTargets.forEach(element => element.classList.add('reveal'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(element => observer.observe(element));
  }

  const bookingForm = document.getElementById('bookingForm');
  const bookingStatus = document.getElementById('bookingStatus');
  const bookingSubmit = document.getElementById('bookingSubmit');
  const formStartedAt = Date.now();
  bookingForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (!bookingForm.checkValidity()) {
      bookingStatus.textContent = 'Vui lòng điền đầy đủ các trường bắt buộc trước khi kiểm tra.';
      bookingForm.reportValidity();
      return;
    }
    const phone = document.getElementById('bkPhone').value.trim().replace(/[\s.-]/g, '');
    if (!/^(0|\+84)[0-9]{9,10}$/.test(phone)) {
      bookingStatus.textContent = 'Số điện thoại chưa đúng định dạng. Vui lòng kiểm tra lại.';
      document.getElementById('bkPhone').focus();
      return;
    }
    if (!config.leadEndpoint) {
      bookingStatus.textContent = 'Hệ thống tiếp nhận đang được cấu hình. Vui lòng liên hệ qua hotline hoặc Zalo.';
      return;
    }

    const data = Object.fromEntries(new FormData(bookingForm).entries());
    data.pageUrl = window.location.href;
    data.formStartedAt = formStartedAt;
    bookingSubmit.disabled = true;
    bookingSubmit.textContent = 'Đang gửi...';
    bookingStatus.textContent = 'Đang gửi yêu cầu tư vấn.';

    try {
      const response = await fetch(config.leadEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Không thể gửi yêu cầu lúc này.');
      bookingStatus.textContent = 'Thiên Gia Food đã nhận thông tin và sẽ liên hệ tư vấn.';
      bookingForm.reset();
    } catch (error) {
      bookingStatus.textContent = error.message || 'Không thể gửi yêu cầu. Vui lòng liên hệ qua hotline hoặc Zalo.';
    } finally {
      bookingSubmit.disabled = false;
      bookingSubmit.textContent = 'Gửi Yêu Cầu Tư Vấn';
    }
  });

  document.getElementById('year').textContent = new Date().getFullYear();
});
