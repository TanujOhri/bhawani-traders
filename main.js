document.addEventListener('DOMContentLoaded', () => {

  // 1. Hide Loader
  const loader = document.getElementById('loader');
  setTimeout(() => {
    if (loader) loader.classList.add('hide');
  }, 1000);

  // 2. Dynamic Year in Footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 3. Scroll Progress & Header State & Back to Top visibility
  const progress = document.getElementById('progress');
  const header = document.getElementById('site-header');
  const toTop = document.getElementById('to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progress) progress.style.width = scrollPercent + '%';

    if (header) {
      if (scrollTop > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (toTop) {
      if (scrollTop > 300) {
        toTop.classList.add('show');
      } else {
        toTop.classList.remove('show');
      }
    }
  });

  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Desktop Cursor Glow Effect
  const glow = document.getElementById('cursor-glow');
  if (glow && window.innerWidth > 900) {
    window.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  // 5. Dark Mode Toggle
  const darkToggle = document.getElementById('dark-toggle');
  const darkIcon = document.getElementById('dark-icon');
  const html = document.documentElement;

  const sunSVG = `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;
  const moonSVG = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;

  // Check saved theme
  const savedTheme = localStorage.getItem('bhawani_theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
    if (darkIcon) darkIcon.innerHTML = sunSVG;
  }

  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      const isDark = html.classList.contains('dark');
      localStorage.setItem('bhawani_theme', isDark ? 'dark' : 'light');
      if (darkIcon) darkIcon.innerHTML = isDark ? sunSVG : moonSVG;
    });
  }

  // 6. Mobile Menu Toggle
  const menuOpen = document.getElementById('menu-open');
  const menuClose = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuOpen && mobileMenu) {
    menuOpen.addEventListener('click', () => mobileMenu.classList.add('open'));
  }
  if (menuClose && mobileMenu) {
    menuClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  }
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // 7. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 8. Number Counter Animation
  const counterElements = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10) || 0;
        let count = 0;
        const duration = 1600;
        const increment = Math.ceil(target / (duration / 16));

        const updateCount = () => {
          count += increment;
          if (count >= target) {
            el.textContent = target.toLocaleString();
          } else {
            el.textContent = count.toLocaleString();
            requestAnimationFrame(updateCount);
          }
        };

        requestAnimationFrame(updateCount);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => counterObserver.observe(el));

  // 9. Catalogue Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-cat');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          setTimeout(() => { card.style.opacity = '1'; }, 50);
        } else {
          card.classList.add('hidden');
          card.style.opacity = '0';
        }
      });
    });
  });

  // 10. Magnetic Button Hover Effect
  const magnetics = document.querySelectorAll('.magnetic');
  magnetics.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });

  // 12. Google Reviews Filter Handler
  const rFilterBtns = document.querySelectorAll('.review-filter-btn');
  const reviewCards = document.querySelectorAll('.google-card');

  rFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      rFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-rfilter');

      reviewCards.forEach(card => {
        const categories = (card.getAttribute('data-rcat') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
          setTimeout(() => { card.style.opacity = '1'; }, 50);
        } else {
          card.classList.add('hidden');
          card.style.opacity = '0';
        }
      });
    });
  });

});
