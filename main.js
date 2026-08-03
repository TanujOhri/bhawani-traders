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

  // 13. FormSubmit AJAX Inquiry Form Handler
  const inquiryForm = document.getElementById('inquiry-form');
  const formStatusMsg = document.getElementById('form-status-msg');
  const submitBtn = document.getElementById('submit-btn');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btnSpan = submitBtn ? submitBtn.querySelector('span') : null;
      const originalText = btnSpan ? btnSpan.textContent : 'Submit Inquiry';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        if (btnSpan) btnSpan.textContent = 'Sending Inquiry...';
      }

      if (formStatusMsg) formStatusMsg.style.display = 'none';

      try {
        const formData = new FormData(inquiryForm);
        const response = await fetch('https://formsubmit.co/ajax/05fd9d16829fcc09d3f5be0077e112e4', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        const result = await response.json();

        if (response.ok || result.success === "true") {
          if (formStatusMsg) {
            formStatusMsg.style.display = 'block';
            formStatusMsg.innerHTML = `
              <div style="background:rgba(34,197,94,0.12); border:1px solid rgba(34,197,94,0.3); color:#15803d; padding:14px 16px; border-radius:12px; font-weight:700; font-size:14px; text-align:center; line-height:1.5;">
                ✅ Inquiry Sent Successfully!
                <div style="font-size:12.5px; font-weight:500; margin-top:4px; opacity:0.9;">
                  Thank you! Your details have been sent to <strong>bhawanitraders@ymail.com</strong>. Our Dinanagar sales desk will call you shortly.
                </div>
              </div>
            `;
          }
          inquiryForm.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        if (formStatusMsg) {
          formStatusMsg.style.display = 'block';
          formStatusMsg.innerHTML = `
            <div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); color:#b91c1c; padding:12px 14px; border-radius:12px; font-weight:700; font-size:13px; text-align:center;">
              ⚠️ Could not send inquiry. Please call us directly at +91 9417070994.
            </div>
          `;
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          if (btnSpan) btnSpan.textContent = originalText;
        }
      }
    });
  }

});
