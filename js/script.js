/* =====================================================
   Thala Nivitham — JavaScript
   ===================================================== */

/* ──────────────────────────────────────────────────────
   HERO BANNER AUTO-ROTATION (CINEMATIC)
   Initialises a crossfade slider on every .hero-banner
   that contains at least two .hero-slide children.
────────────────────────────────────────────────────── */
(function initHeroBanners() {
  function setupBanners() {
    document.querySelectorAll('.hero-banner').forEach(function (banner) {
      var slides = banner.querySelectorAll('.hero-slide');
      var dots   = banner.querySelectorAll('.hero-dot');
      if (slides.length < 2) return;

      var current = 0;
      var timer;

      function goTo(index) {
        slides[current].classList.remove('active');
        if (dots[current]) dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        if (dots[current]) dots[current].classList.add('active');
      }

      function next() { goTo(current + 1); }

      function startTimer() {
        clearInterval(timer);
        timer = setInterval(next, 6000);
      }

      dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () { goTo(i); startTimer(); });
      });

      banner.addEventListener('mouseenter', function () { clearInterval(timer); });
      banner.addEventListener('mouseleave', startTimer);

      startTimer();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupBanners);
  } else {
    setupBanners();
  }
})();


/* ──────────────────────────────────────────────────────
   HORIZONTAL SCROLL ROW BUTTONS
────────────────────────────────────────────────────── */
document.querySelectorAll('.row-wrapper').forEach(wrapper => {
  const row  = wrapper.querySelector('.cards-row');
  const prev = wrapper.querySelector('.row-nav.prev');
  const next = wrapper.querySelector('.row-nav.next');
  if (!row) return;

  const SCROLL_AMOUNT = 440;

  if (prev) prev.addEventListener('click', () => {
    row.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
  });
  if (next) next.addEventListener('click', () => {
    row.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
  });

  // Show/hide nav buttons based on scroll position
  function updateNavVisibility() {
    if (prev) prev.style.display = row.scrollLeft > 10 ? 'flex' : 'none';
    if (next) next.style.display =
      (row.scrollLeft + row.clientWidth) < (row.scrollWidth - 10) ? 'flex' : 'none';
  }

  row.addEventListener('scroll', updateNavVisibility, { passive: true });
  updateNavVisibility();
});


/* ──────────────────────────────────────────────────────
   SEARCH BAR — DROPDOWN SUGGESTIONS
────────────────────────────────────────────────────── */
(function initSearch() {
  const input    = document.getElementById('searchInput');
  const dropdown = document.getElementById('searchDropdown');
  if (!input || !dropdown) return;

  input.addEventListener('focus', () => dropdown.classList.add('show'));
  input.addEventListener('blur', () => {
    setTimeout(() => dropdown.classList.remove('show'), 200);
  });

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    const suggestions = dropdown.querySelectorAll('.search-suggestion');
    suggestions.forEach(s => {
      const text = s.textContent.toLowerCase();
      s.style.display = (q === '' || text.includes(q)) ? '' : 'none';
    });
  });
})();


/* ──────────────────────────────────────────────────────
   SUBSECTION TABS
────────────────────────────────────────────────────── */
document.querySelectorAll('.subsection-tabs').forEach(tabGroup => {
  const buttons = tabGroup.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});


/* ──────────────────────────────────────────────────────
   FOLLOW BUTTON TOGGLE
────────────────────────────────────────────────────── */
document.querySelectorAll('.btn-follow').forEach(btn => {
  btn.addEventListener('click', function () {
    if (this.textContent.trim() === 'Follow') {
      this.textContent = 'Following ✓';
      this.style.background = 'rgba(124,58,237,.3)';
      this.style.color = '#c084fc';
    } else {
      this.textContent = 'Follow';
      this.style.background = '';
      this.style.color = '';
    }
  });
});


/* ──────────────────────────────────────────────────────
   PLAY BUTTON RIPPLE
────────────────────────────────────────────────────── */
document.querySelectorAll('.play-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      width:100%; height:100%; top:0; left:0;
      background: rgba(255,255,255,0.25);
      animation: ripple-anim 0.5s ease-out forwards;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple-anim {
    from { transform: scale(0); opacity: 1; }
    to   { transform: scale(2.5); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);


/* ──────────────────────────────────────────────────────
   SMOOTH SCROLL ANCHOR LINKS
────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ──────────────────────────────────────────────────────
   NAVIGATION LOGIC (MEGA DROPDOWN & ACTIVE STATE)
────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Active State Highlighting
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    
    // Explicit match
    if (href && href !== '#' && path.includes(href)) {
      link.classList.add('active');
    }
    // Handle home specifically
    if ((path.endsWith('/') || path.endsWith('index.html')) && link.textContent.trim() === 'Home') {
      link.classList.add('active');
    }
  });

  // Mobile Accordion Toggle for Mega Dropdowns
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.mega-menu');
    
    if (link && dropdown) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          e.preventDefault(); // Prevent jump on mobile
          item.classList.toggle('mobile-open');
        }
      });
    }
  });
});

/* ──────────────────────────────────────────────────────
   SCROLLING NAVBAR (TRANSPARENT -> SOLID)
────────────────────────────────────────────────────── */
(function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function handleScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Init on load
})();