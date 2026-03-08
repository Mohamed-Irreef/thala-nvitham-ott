/* =====================================================
   Thala Nivitham — search-routing.js
   Smart search routing: search bar Enter key +
   dropdown suggestion clicks → correct result page.
   Auto-loaded by navbar.js on every page.
   ===================================================== */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────────
     KEYWORD MAPS
  ────────────────────────────────────────────────── */
  var MUSIC_KEYWORDS = [
    'music', 'song', 'songs', 'album', 'albums', 'playlist', 'playlists',
    'track', 'tracks', 'audio', 'rap', 'melody', 'beats', 'singer',
    'composer', 'artist', 'lofi', 'bgm', 'instrumental', 'tune',
    'lyrics', 'single', 'ep', 'mixtape', 'hip hop', 'hiphop',
    'carnatic', 'folk music', 'pop', 'edm', 'fusion music',
  ];

  var PODCAST_KEYWORDS = [
    'podcast', 'podcasts', 'episode', 'episodes', 'talk', 'show',
    'discussion', 'interview', 'tech talk', 'storytelling', 'series',
    'cast', 'listen', 'host', 'speaker', 'debate', 'conversation',
    'technology', 'cooking', 'entrepreneurship', 'health', 'education',
    'sports', 'entertainment', 'current affairs', 'news',
  ];

  /* ──────────────────────────────────────────────────
     SUGGESTION ROUTES
     Maps the text content of each .search-suggestion
     to its destination page.
  ────────────────────────────────────────────────── */
  var SUGGESTION_ROUTES = {
    'search podcasts':    'podcast-search-result.html?q=podcast',
    'search music':       'music-search-result.html',
    'search creators':    'creators.html',
    'search albums':      'music-search-result.html?tab=albums',
    'tech talk tamil':    'podcast-search-result.html?q=tech+talk+tamil',
    'rooftop sessions':   'music-search-result.html?q=rooftop+sessions',
  };

  /* ──────────────────────────────────────────────────
     ROUTING LOGIC
  ────────────────────────────────────────────────── */

  /** Resolve a free-text query to the best result page URL */
  function resolveQuery(query) {
    if (!query) return null;
    var q = query.toLowerCase().trim();

    var musicScore   = 0;
    var podcastScore = 0;

    MUSIC_KEYWORDS.forEach(function (kw) {
      if (q.includes(kw)) musicScore++;
    });
    PODCAST_KEYWORDS.forEach(function (kw) {
      if (q.includes(kw)) podcastScore++;
    });

    var encoded = encodeURIComponent(query.trim());

    if (musicScore === 0 && podcastScore === 0) {
      // Default: music page
      return 'music-search-result.html?q=' + encoded;
    }
    if (podcastScore > musicScore) {
      return 'podcast-search-result.html?q=' + encoded;
    }
    return 'music-search-result.html?q=' + encoded;
  }

  /** Resolve the base path prefix (handles pages in subdirs like details/) */
  function basePath() {
    var path = window.location.pathname;
    if (path.includes('/details/')) return '../';
    return '';
  }

  /* ──────────────────────────────────────────────────
     INIT — runs after DOM is ready so navbar is present
  ────────────────────────────────────────────────── */
  function init() {
    /* ── 1. Suggestion clicks ── */
    document.querySelectorAll('.search-suggestion').forEach(function (el) {
      if (el._routeBound) return;
      el._routeBound = true;

      el.addEventListener('mousedown', function (e) {
        // Use mousedown (fires before blur hides dropdown)
        e.preventDefault();
        // Get only the label text, ignoring the .sug-icon child element
        var iconEl  = el.querySelector('.sug-icon');
        var label   = iconEl
          ? el.textContent.replace(iconEl.textContent, '').trim()
          : el.textContent.trim();
        var text    = label.toLowerCase();
        var route   = SUGGESTION_ROUTES[text];
        var dest;

        if (route) {
          dest = basePath() + route;
        } else {
          // Fall back to keyword routing using the suggestion text
          dest = basePath() + (resolveQuery(text) || 'music-search-result.html');
        }
        window.location.href = dest;
      });
    });

    /* ── 2. Search input — Enter key ── */
    var input = document.getElementById('searchInput');
    if (input && !input._routeBound) {
      input._routeBound = true;

      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          var q = input.value.trim();
          if (!q) return;
          var dest = basePath() + resolveQuery(q);
          window.location.href = dest;
        }
      });
    }
  }

  /* Re-bind after any dynamic DOM update (e.g. navbar injected late) */
  function bindWhenReady() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      // Small delay to ensure navbar.js has injected HTML
      setTimeout(init, 50);
    }
  }

  bindWhenReady();

})();
