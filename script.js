/* Thiên Gia Food - tương tác trang chủ, không gửi dữ liệu ra ngoài. */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const navDropdown = document.getElementById('navDropdown');
  const navDropdownToggle = document.getElementById('navDropdownToggle');

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
  bookingForm.addEventListener('submit', event => {
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
    bookingStatus.textContent = 'Thông tin đã hợp lệ nhưng chưa được gửi. Hệ thống tiếp nhận đang được cấu hình.';
  });

  document.getElementById('year').textContent = new Date().getFullYear();
});
