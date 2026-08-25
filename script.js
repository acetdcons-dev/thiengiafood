/* Thiên Gia Food — script.js */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== HEADER SCROLL + STICKY ===== */
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');
  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    header.classList.toggle('is-scrolled', scrolled);
    backToTop.classList.toggle('is-visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ===== MOBILE NAV ===== */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  burger.addEventListener('click', () => nav.classList.toggle('is-open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('is-open')));

  /* ===== NAV DROPDOWN (Tiện Ích) ===== */
  const navDropdown = document.getElementById('navDropdown');
  const navDropdownToggle = document.getElementById('navDropdownToggle');
  if (navDropdown && navDropdownToggle) {
    navDropdownToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navDropdown.classList.toggle('is-open');
    });
    document.addEventListener('click', (e) => {
      if (!navDropdown.contains(e.target)) navDropdown.classList.remove('is-open');
    });
  }

  /* ===== MENU TABS ===== */
  const tabs = document.querySelectorAll('.menu__tab');
  const panels = document.querySelectorAll('.menu__panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      panels.forEach(p => p.classList.remove('is-active'));
      tab.classList.add('is-active');
      document.getElementById(tab.dataset.tab).classList.add('is-active');
    });
  });

  /* ===== FAQ ACCORDION ===== */
  document.querySelectorAll('.faq__item').forEach(item => {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq__item').forEach(other => {
        other.classList.remove('is-open');
        other.querySelector('.faq__answer').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ===== TESTIMONIAL CAROUSEL (mobile) ===== */
  const track = document.getElementById('testiTrack');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');
  let testiIndex = 0;

  function updateCarousel() {
    if (window.innerWidth > 768) {
      track.style.transform = 'none';
      return;
    }
    const slideWidth = track.children[0].getBoundingClientRect().width + 22;
    track.style.transform = `translateX(-${testiIndex * slideWidth}px)`;
  }
  prevBtn.addEventListener('click', () => {
    testiIndex = Math.max(0, testiIndex - 1);
    updateCarousel();
  });
  nextBtn.addEventListener('click', () => {
    testiIndex = Math.min(track.children.length - 1, testiIndex + 1);
    updateCarousel();
  });
  window.addEventListener('resize', updateCarousel);

  function toggleCarouselNav() {
    const isMobile = window.innerWidth <= 768;
    document.querySelector('.testimonials__nav').style.display = isMobile ? 'flex' : 'none';
    if (!isMobile) { testiIndex = 0; }
    updateCarousel();
  }
  window.addEventListener('resize', toggleCarouselNav);
  toggleCarouselNav();

  /* ===== SCROLL REVEAL ===== */
  const revealTargets = document.querySelectorAll(
    '.usp__item, .service-card, .process__step, .pricing__card, .gallery__grid img, .about__content, .about__media, .faq__item'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => revealObserver.observe(el));

  /* ===== STAT COUNTERS ===== */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1400;
      const startTime = performance.now();
      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString('vi-VN');
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterObserver.observe(c));

  /* ===== BOOKING FORM ===== */
  const bookingForm = document.getElementById('bookingForm');
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3800);
  }

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('bkName').value.trim();
    const phone = document.getElementById('bkPhone').value.trim();
    const phonePattern = /^(0|\+84)[0-9]{9,10}$/;

    if (!name) {
      showToast('Vui lòng nhập họ tên của bạn.');
      return;
    }
    if (!phonePattern.test(phone)) {
      showToast('Số điện thoại chưa hợp lệ, vui lòng kiểm tra lại.');
      return;
    }
    showToast(`Cảm ơn ${name}! Thiên Gia Food sẽ gọi lại trong 5 phút.`);
    bookingForm.reset();
  });

  /* ===== FOOTER YEAR ===== */
  document.getElementById('year').textContent = new Date().getFullYear();
});
