/* =====================================================
   Thala Nivitham — Global Navbar Component
   Injects the shared navbar and initialises all
   interactive behaviours across every page.
   ===================================================== */

(function () {

  /* ──────────────────────────────────────────────────────
     NAVBAR HTML TEMPLATE
     Single source of truth — mirrors navbar.html exactly.
  ────────────────────────────────────────────────────── */
  var NAVBAR_HTML = [
    '<nav class="navbar" id="main-navbar">',
    '  <a href="index.html" class="logo">',
    '    <img src="assets/logo.png" alt="Thala Nivitham" class="logo-img"/>',
    '  </a>',
    '  <ul class="nav-links">',
    '    <li class="nav-item">',
    '      <a class="nav-link" href="index.html" data-navpage="index">Home</a>',
    '    </li>',
    '    <li class="nav-item">',
    '      <a class="nav-link" href="podcast.html" data-navpage="podcast">Podcasts</a>',
    '      <div class="mega-menu">',
    '        <div class="mega-menu-content">',
    '          <div class="mega-column">',
    '            <h4>Genres</h4>',
    '            <a href="#">Technology</a>',
    '            <a href="#">Entrepreneurship</a>',
    '            <a href="#">Health Care</a>',
    '            <a href="#">Arts &amp; Science</a>',
    '            <a href="#">Education</a>',
    '            <a href="#">Sports</a>',
    '            <a href="#">Current Affairs</a>',
    '          </div>',
    '          <div class="mega-column">',
    '            <h4>Discover</h4>',
    '            <a href="#">Trending Podcasts</a>',
    '            <a href="#">Latest Episodes</a>',
    '            <a href="#">Top Shows</a>',
    '            <a href="#">Featured Podcasts</a>',
    '          </div>',
    '        </div>',
    '      </div>',
    '    </li>',
    '    <li class="nav-item">',
    '      <a class="nav-link" href="musics.html" data-navpage="musics">Music</a>',
    '      <div class="mega-menu">',
    '        <div class="mega-menu-content">',
    '          <div class="mega-column">',
    '            <h4>Categories</h4>',
    '            <a href="#">Songs</a>',
    '            <a href="#">Albums</a>',
    '            <a href="#">Rap</a>',
    '            <a href="#">BGM</a>',
    '            <a href="#">Instrumental</a>',
    '            <a href="#">Storytelling Audio</a>',
    '          </div>',
    '          <div class="mega-column">',
    '            <h4>Discover</h4>',
    '            <a href="#">Trending Songs</a>',
    '            <a href="#">New Releases</a>',
    '            <a href="#">Top Artists</a>',
    '            <a href="#">Featured Albums</a>',
    '          </div>',
    '        </div>',
    '      </div>',
    '    </li>',
    '    <li class="nav-item">',
    '      <a class="nav-link" href="creators.html" data-navpage="creators">Creators</a>',
    '    </li>',
    '    <li class="nav-item">',
    '      <a class="nav-link" href="production.html" data-navpage="production">Production</a>',
    '    </li>',
    '    <li class="nav-item">',
    '      <a class="nav-link" href="library.html" data-navpage="library">Library</a>',
    '    </li>',
    '  </ul>',
    '  <div class="nav-right">',
    '    <div class="search-wrapper">',
    '      <span class="search-icon">🔍</span>',
    '      <input id="searchInput" class="search-input" type="text" placeholder="Search podcasts, music, creators\u2026"/>',
    '      <div id="searchDropdown" class="search-dropdown">',
    '        <div class="search-section-title">Recent Searches</div>',
    '        <div class="search-suggestion"><div class="sug-icon">&#x2197;</div>Tech Talk Tamil</div>',
    '        <div class="search-suggestion"><div class="sug-icon">&#x2197;</div>Rooftop Sessions</div>',
    '        <div class="search-section-title" style="margin-top:8px">Suggestions</div>',
    '        <div class="search-suggestion"><div class="sug-icon">&#x2197;</div>Search Podcasts</div>',
    '        <div class="search-suggestion"><div class="sug-icon">&#x2197;</div>Search Music</div>',
    '        <div class="search-suggestion"><div class="sug-icon">&#x2197;</div>Search Creators</div>',
    '        <div class="search-suggestion"><div class="sug-icon">&#x2197;</div>Search Albums</div>',
    '      </div>',
    '    </div>',
    '    <button class="btn btn-outline">Get App</button>',
    '    <a href="subscription.html" class="btn btn-primary">⚡ Subscribe</a>',
    '    <div class="lang-btn-wrapper">',
    '      <button class="icon-btn" title="Language">🌐</button>',
    '      <div class="language-dropdown">',
    '        <div class="lang-option active" data-lang="en"><span class="lang-check">✓</span>English</div>',
    '        <div class="lang-option" data-lang="hi"><span class="lang-check"></span>हिंदी (Hindi)</div>',
    '        <div class="lang-option" data-lang="mr"><span class="lang-check"></span>मराठी (Marathi)</div>',
    '        <div class="lang-option" data-lang="te"><span class="lang-check"></span>తెలుగు (Telugu)</div>',
    '        <div class="lang-option" data-lang="ta"><span class="lang-check"></span>தமிழ் (Tamil)</div>',
    '      </div>',
    '    </div>',
    '    <div class="avatar-wrapper">',
    '      <div class="avatar">TN</div>',
    '      <div class="profile-dropdown">',
    '        <div class="profile-header">',
    '          <div class="profile-avatar-large">TN</div>',
    '          <div class="profile-greeting">',
    '            <span class="profile-hello">Hello, Guest</span>',
    '          </div>',
    '        </div>',
    '        <p class="profile-prompt">Choose a login method</p>',
    '        <div class="login-methods">',
    '          <a href="signup.html" class="login-btn"><span class="login-icon">G</span>Google</a>',
    '          <a href="signup.html" class="login-btn"><span class="login-icon">f</span>Facebook</a>',
    '          <a href="signup.html" class="login-btn"><span class="login-icon">✉</span>Email</a>',
    '          <a href="signup.html" class="login-btn"><span class="login-icon"></span>Apple</a>',
    '        </div>',
    '        <a href="signup.html" class="login-mobile-btn">Login with Mobile Number</a>',
    '      </div>',
    '    </div>',
    '  </div>',
    '</nav>'
  ].join('\n');

  /* ──────────────────────────────────────────────────────
     INJECT NAVBAR
     Replace #navbar-placeholder with the navbar HTML.
     Runs synchronously so the navbar is in the DOM
     before any subsequent scripts execute.
  ────────────────────────────────────────────────────── */
  var placeholder = document.getElementById('navbar-placeholder');
  if (placeholder) {
    placeholder.outerHTML = NAVBAR_HTML;
  }

  /* ──────────────────────────────────────────────────────
     INIT ALL NAVBAR BEHAVIOURS
     Runs after DOM is ready.
  ────────────────────────────────────────────────────── */
  function initNavbar() {

    /* ── 1. ACTIVE NAV LINK ── */
    var filename = window.location.pathname.split('/').pop() || 'index.html';
    // Strip query strings / hashes
    filename = filename.split('?')[0].split('#')[0];

    document.querySelectorAll('.nav-link[data-navpage]').forEach(function (link) {
      var href = (link.getAttribute('href') || '').split('#')[0].split('?')[0];
      var page = href.split('/').pop();
      link.classList.toggle('active', page === filename);
    });

    // Fallback: mark Home active on root URL
    if (filename === '' || filename === 'index.html') {
      var homeLink = document.querySelector('.nav-link[data-navpage="index"]');
      if (homeLink) homeLink.classList.add('active');
    }

    /* ── 2. NAVBAR SCROLL: transparent → solid ── */
    var navbar = document.getElementById('main-navbar');
    if (navbar && !navbar._scrollBound) {
      navbar._scrollBound = true;
      function handleScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
      }
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    /* ── 3. SEARCH DROPDOWN ── */
    var searchInput = document.getElementById('searchInput');
    var searchDropdown = document.getElementById('searchDropdown');
    if (searchInput && searchDropdown && !searchInput._navbarBound) {
      searchInput._navbarBound = true;
      searchInput.addEventListener('focus', function () {
        searchDropdown.classList.add('show');
      });
      searchInput.addEventListener('blur', function () {
        setTimeout(function () { searchDropdown.classList.remove('show'); }, 200);
      });
      searchInput.addEventListener('input', function () {
        var q = searchInput.value.trim().toLowerCase();
        searchDropdown.querySelectorAll('.search-suggestion').forEach(function (s) {
          s.style.display = (q === '' || s.textContent.toLowerCase().includes(q)) ? '' : 'none';
        });
      });
    }

    /* ── 4. LANGUAGE SELECTOR ── */
    document.querySelectorAll('.lang-option').forEach(function (option) {
      if (option._langBound) return;
      option._langBound = true;
      option.addEventListener('click', function () {
        var dropdown = this.closest('.language-dropdown');
        // Update active state
        dropdown.querySelectorAll('.lang-option').forEach(function (o) {
          o.classList.remove('active');
          o.querySelector('.lang-check').textContent = '';
        });
        this.classList.add('active');
        this.querySelector('.lang-check').textContent = '✓';
        // Store selection
        try { localStorage.setItem('tn-lang', this.getAttribute('data-lang')); } catch (e) {}
        // Briefly force-close the dropdown then restore normal hover
        var wrapper = dropdown.closest('.lang-btn-wrapper');
        if (wrapper) {
          wrapper.style.pointerEvents = 'none';
          setTimeout(function () { wrapper.style.pointerEvents = ''; }, 400);
        }
      });
    });

    // Restore saved language selection
    try {
      var savedLang = localStorage.getItem('tn-lang');
      if (savedLang) {
        var match = document.querySelector('.lang-option[data-lang="' + savedLang + '"]');
        if (match) {
          document.querySelectorAll('.lang-option').forEach(function (o) {
            o.classList.remove('active');
            o.querySelector('.lang-check').textContent = '';
          });
          match.classList.add('active');
          match.querySelector('.lang-check').textContent = '✓';
        }
      }
    } catch (e) {}

    /* ── 5. MOBILE ACCORDION FOR MEGA MENUS ── */
    document.querySelectorAll('.nav-item').forEach(function (item) {
      var link = item.querySelector('.nav-link');
      var menu = item.querySelector('.mega-menu');
      if (link && menu && !link._mobileBound) {
        link._mobileBound = true;
        link.addEventListener('click', function (e) {
          if (window.innerWidth <= 1024) {
            e.preventDefault();
            item.classList.toggle('mobile-open');
          }
        });
      }
    });

    /* ── 6. CLOSE ALL DROPDOWNS ON OUTSIDE CLICK ── */
    document.addEventListener('click', function (e) {
      // Close search
      if (searchDropdown && !e.target.closest('.search-wrapper')) {
        searchDropdown.classList.remove('show');
      }
    });
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
  } else {
    initNavbar();
  }

  /* ──────────────────────────────────────────────────────
     AUTO-LOAD: search-routing.js
     Inject once per page so smart search routing is
     available on every page that includes navbar.js.
  ────────────────────────────────────────────────────── */
  (function loadSearchRouting() {
    if (document.querySelector('script[src*="search-routing.js"]')) return;
    var base = (function () {
      var scripts = document.querySelectorAll('script[src*="navbar.js"]');
      if (scripts.length) {
        var src = scripts[scripts.length - 1].getAttribute('src');
        return src.replace('navbar.js', '');
      }
      return 'js/';
    })();
    var s = document.createElement('script');
    s.src = base + 'search-routing.js';
    document.head.appendChild(s);
  })();

})();
