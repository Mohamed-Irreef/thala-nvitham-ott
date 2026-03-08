/* =====================================================
   Thala Nivitham — music-search-result.js
   Music Search Result page.
   Reads ?q= and ?tab= from URL, renders tabs + card
   grid, supports Load More (18 per page).
   ===================================================== */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────
     CONFIG
  ───────────────────────────────────────────────── */
  var PAGE_SIZE = 18;

  var TABS = [
    { id: 'your-results', label: 'Your Results', icon: '⭐' },
    { id: 'all',          label: 'All',          icon: '🎵' },
    { id: 'songs',        label: 'Songs',        icon: '🎤' },
    { id: 'albums',       label: 'Albums',       icon: '💿' },
    { id: 'rap',          label: 'Rap',          icon: '🎙️' },
    { id: 'instrumental', label: 'Instrumental', icon: '🎹' },
    { id: 'bgm',          label: 'BGM',          icon: '🎬' },
    { id: 'storytelling', label: 'Storytelling', icon: '📖' },
  ];

  /* ─────────────────────────────────────────────────
     IMAGE POOLS  (used when cards.js mc/pc not avail)
  ───────────────────────────────────────────────── */
  var MC = [
    'assets/music-cover1.png', 'assets/music-cover2.png',
    'assets/music-cover3.png', 'assets/music-cover4.png',
    'assets/music-cover5.png',
  ];
  var PC = [
    'assets/podcast-cover1.png', 'assets/podcast-cover2.png',
    'assets/podcast-cover3.png', 'assets/podcast-cover4.png',
    'assets/podcast-cover5.png',
  ];
  function mc(i) { return MC[i % MC.length]; }
  function pc(i) { return PC[i % PC.length]; }

  /* ─────────────────────────────────────────────────
     DATA POOLS
  ───────────────────────────────────────────────── */

  /* ── Your Results ── */
  var YOUR_RESULTS = [
    { id:'yr01', title:'Kannazhaga',              artist:'AR Rahman',           dur:'4:18', kind:'song'    },
    { id:'yr02', title:'Nenjukkul Peidhidum',     artist:'Harris Jayaraj',      dur:'5:02', kind:'song'    },
    { id:'yr03', title:'Anirudh Hits Vol.2',      artist:'Anirudh Ravichander', dur:'',     kind:'album'   },
    { id:'yr04', title:'Marana Mass',             artist:'Anirudh Ravichander', dur:'3:43', kind:'song'    },
    { id:'yr05', title:'Vaathi Coming',           artist:'Anirudh / Vijay',     dur:'3:21', kind:'rap'     },
    { id:'yr06', title:'Vikram Theme',            artist:'Anirudh Ravichander', dur:'2:50', kind:'bgm'     },
    { id:'yr07', title:'Ilamai Thirumbuthu',      artist:'Ilayaraja',           dur:'4:30', kind:'song'    },
    { id:'yr08', title:'Harris Jayaraj Gold',     artist:'Harris Jayaraj',      dur:'',     kind:'album'   },
    { id:'yr09', title:'Vinnai Thandi Varuvaya',  artist:'AR Rahman',           dur:'5:15', kind:'song'    },
    { id:'yr10', title:'Usilampatti Penkutti',    artist:'Ilayaraja',           dur:'4:05', kind:'song'    },
    { id:'yr11', title:'Lofi Tamil Beats',        artist:'Studio TN',           dur:'3:30', kind:'instrumental' },
    { id:'yr12', title:'Enthiran BGM',            artist:'AR Rahman',           dur:'3:40', kind:'bgm'     },
    { id:'yr13', title:'Gully Boy Tamil',         artist:'Arivu',               dur:'3:55', kind:'rap'     },
    { id:'yr14', title:'Paravai Un Mela',         artist:'Yuvan Shankar Raja',  dur:'4:48', kind:'song'    },
    { id:'yr15', title:'Carnatic Crossover',      artist:'TM Krishna',          dur:'',     kind:'album'   },
    { id:'yr16', title:'Ponniyin Selvan Audio',   artist:'Heritage Voice',      dur:'35 min', kind:'storytelling' },
    { id:'yr17', title:'Nee Paartha Vizhigal',    artist:'AR Rahman',           dur:'4:22', kind:'song'    },
    { id:'yr18', title:'Midnight Piano',          artist:'Yuvan',               dur:'4:45', kind:'instrumental' },
    { id:'yr19', title:'Kaithi BGM',              artist:'Sam C.S.',            dur:'3:15', kind:'bgm'     },
    { id:'yr20', title:'Namma Veetu Pillai',      artist:'D. Imman',            dur:'3:50', kind:'song'    },
  ];

  /* ── Songs ── */
  var SONGS = [
    { id:'s01', title:'Uyire Uyire',            artist:'AR Rahman',           dur:'4:32' },
    { id:'s02', title:'Vaaney Vaaney',           artist:'Sid Sriram',          dur:'5:10' },
    { id:'s03', title:'Rowdy Baby',              artist:'Dhanush',             dur:'3:50' },
    { id:'s04', title:'Kannaana Kanney',         artist:'D. Imman',            dur:'5:20' },
    { id:'s05', title:'Inaindha Kaigal',         artist:'Sid Sriram',          dur:'4:40' },
    { id:'s06', title:'Machi Open The Bottle',   artist:'Anirudh',             dur:'3:15' },
    { id:'s07', title:'City Nights',             artist:'Yuvan',               dur:'4:05' },
    { id:'s08', title:'Kaatru Veliyidai',        artist:'AR Rahman',           dur:'6:00' },
    { id:'s09', title:'Nenjukku Needhi',         artist:'Anirudh Ravichander', dur:'4:55' },
    { id:'s10', title:'Aalaporan Tamizhan',      artist:'AR Rahman',           dur:'3:30' },
    { id:'s11', title:'En Kadhal Solla',         artist:'Yuvan',               dur:'4:35' },
    { id:'s12', title:'Ottagatha Kattiko',       artist:'AR Rahman',           dur:'4:12' },
    { id:'s13', title:'Boom Boom',               artist:'Anirudh',             dur:'3:38' },
    { id:'s14', title:'Kutti Story',             artist:'Anirudh / Vijay',     dur:'3:25' },
    { id:'s15', title:'Mila Kaligiratha',        artist:'Yuvan Shankar',       dur:'5:44' },
    { id:'s16', title:'Chennai Nights',          artist:'G.V. Prakash',        dur:'4:18' },
    { id:'s17', title:'Naan Ready',              artist:'Anirudh / Dhanush',   dur:'3:20' },
    { id:'s18', title:'Kurumba Kurumba',         artist:'Yuvan Shankar',       dur:'3:48' },
    { id:'s19', title:'Vaazhga Valamudan',       artist:'AR Rahman',           dur:'4:50' },
    { id:'s20', title:'Thangamey Thangamey',     artist:'Anirudh Ravichander', dur:'4:22' },
    { id:'s21', title:'Nee Singam Dhan',         artist:'G.V. Prakash',        dur:'3:55' },
    { id:'s22', title:'Maryan Title Track',      artist:'AR Rahman',           dur:'5:05' },
    { id:'s23', title:'Usure Poguthey',          artist:'AR Rahman',           dur:'4:48' },
    { id:'s24', title:'Enai Noki Paayum Thota',  artist:'Darbuka Siva',        dur:'5:30' },
  ];

  /* ── Albums ── */
  var ALBUMS = [
    { id:'al01', title:'Ilayaraja Classics',      artist:'Ilayaraja',           tracks:'24 tracks' },
    { id:'al02', title:'Anirudh Hits Vol.1',      artist:'Anirudh Ravichander', tracks:'18 tracks' },
    { id:'al03', title:'AR Rahman Best',          artist:'AR Rahman',           tracks:'20 tracks' },
    { id:'al04', title:'Yuvan Melodies',          artist:'Yuvan Shankar Raja',  tracks:'15 tracks' },
    { id:'al05', title:'Darbuka Fusion',          artist:'Darbuka Siva',        tracks:'10 tracks' },
    { id:'al06', title:'Vision 2025',             artist:'G.V. Prakash',        tracks:'14 tracks' },
    { id:'al07', title:'Tamil Acoustic Vol.1',    artist:'Sid Sriram',          tracks:'8 tracks'  },
    { id:'al08', title:'Naadha Deva',             artist:'Santhosh Narayanan',  tracks:'16 tracks' },
    { id:'al09', title:'Urban Sounds TN',         artist:'Various',             tracks:'20 tracks' },
    { id:'al10', title:'Folk Revived',            artist:'Gana Bala',           tracks:'11 tracks' },
    { id:'al11', title:'India Sounds',            artist:'Various Artists',     tracks:'25 tracks' },
    { id:'al12', title:'Midnight Moods',          artist:'Yuvan',               tracks:'13 tracks' },
    { id:'al13', title:'Party Anthems TN',        artist:'DJ Vijay',            tracks:'17 tracks' },
    { id:'al14', title:'Carnatic Crossover',      artist:'TM Krishna',          tracks:'9 tracks'  },
    { id:'al15', title:'Romantic TN',             artist:'Harris Jayaraj',      tracks:'18 tracks' },
    { id:'al16', title:'D. Imman Scores',         artist:'D. Imman',            tracks:'21 tracks' },
    { id:'al17', title:'Tamil Indie Sounds',      artist:'Various Indies',      tracks:'16 tracks' },
    { id:'al18', title:'Beats of Tamil',          artist:'Kalidas',             tracks:'14 tracks' },
    { id:'al19', title:'Harris Jayaraj Gold',     artist:'Harris Jayaraj',      tracks:'22 tracks' },
    { id:'al20', title:'Vinnaithaandi Varuvaaya', artist:'AR Rahman',           tracks:'12 tracks' },
    { id:'al21', title:'3 — Anirudh',             artist:'Anirudh Ravichander', tracks:'10 tracks' },
    { id:'al22', title:'Mankatha',                artist:'Yuvan Shankar Raja',  tracks:'8 tracks'  },
  ];

  /* ── Rap ── */
  var RAP = [
    { id:'r01', title:'Street Code',              artist:'Arivu',               dur:'3:45' },
    { id:'r02', title:'Rooftop Sessions',          artist:'Blaaze',              dur:'3:58' },
    { id:'r03', title:'Urban Pulse',               artist:'Hiphop Tamizha',      dur:'3:22' },
    { id:'r04', title:'Paneer Raj Beat',           artist:'Paneer Raj',          dur:'4:02' },
    { id:'r05', title:'Kadhal Munnetra Kazhagam',  artist:'Hiphop Tamizha',      dur:'3:55' },
    { id:'r06', title:'Vaadi Machan',              artist:'Arivu',               dur:'4:10' },
    { id:'r07', title:'Tamil Anthem',              artist:'Dhanush',             dur:'3:30' },
    { id:'r08', title:'Naan Sirithal',             artist:'Hiphop Tamizha',      dur:'3:48' },
    { id:'r09', title:'City Lights',               artist:'Blaaze',              dur:'4:20' },
    { id:'r10', title:'Machi Machaan',             artist:'Dhanush',             dur:'3:15' },
    { id:'r11', title:'Otha Sollakata',            artist:'Arivu',               dur:'4:05' },
    { id:'r12', title:'Free Tamil',                artist:'Paneer Raj',          dur:'3:50' },
    { id:'r13', title:'Nenjame Nenjame',           artist:'Hiphop Tamizha',      dur:'4:30' },
    { id:'r14', title:'Chennai Gully',             artist:'Blaaze',              dur:'3:40' },
    { id:'r15', title:'Block Patta',               artist:'Arivu',               dur:'3:55' },
    { id:'r16', title:'Remo Flow',                 artist:'Various Rappers',     dur:'5:12' },
    { id:'r17', title:'South Side Story',          artist:'Dhanush / Arivu',     dur:'4:18' },
    { id:'r18', title:'Tamil Hip Hop Cypher',      artist:'Various Artists',     dur:'6:00' },
    { id:'r19', title:'Kaaney Kaaney Rap',         artist:'Blaaze',              dur:'3:28' },
    { id:'r20', title:'Fire in the South',         artist:'Paneer Raj',          dur:'3:45' },
    { id:'r21', title:'Naa Ready',                 artist:'Hiphop Tamizha',      dur:'3:32' },
    { id:'r22', title:'Streetlight',               artist:'Arivu',               dur:'4:00' },
  ];

  /* ── Instrumental ── */
  var INSTRUMENTAL = [
    { id:'i01', title:'Piano Dreams',              artist:'AR Rahman',            dur:'5:20' },
    { id:'i02', title:'Carnatic Strings',          artist:'TM Krishna',           dur:'8:40' },
    { id:'i03', title:'Veena Raga',                artist:'Bombay Jayashri',      dur:'6:55' },
    { id:'i04', title:'Flute Meditations',         artist:'Hariprasad Chaurasia', dur:'9:10' },
    { id:'i05', title:'Guitar Tamil',              artist:'Darbuka Siva',         dur:'4:30' },
    { id:'i06', title:'Nadaswaram',                artist:'Traditional',          dur:'7:20' },
    { id:'i07', title:'Violin Concerto Tamil',     artist:'L. Subramaniam',       dur:'12:00' },
    { id:'i08', title:'Tabla Rhythm',              artist:'Zakir Hussain',        dur:'10:15' },
    { id:'i09', title:'Midnight Piano',            artist:'Yuvan',                dur:'4:45' },
    { id:'i10', title:'Lofi Tamil Beats',          artist:'Studio TN',            dur:'3:30' },
    { id:'i11', title:'Saxophone Raga',            artist:'Kadri Gopalnath',      dur:'8:00' },
    { id:'i12', title:'Harmonium Sessions',        artist:'Classical Studio',     dur:'6:20' },
    { id:'i13', title:'Sitar Echoes',              artist:'Ravi Shankar Comp.',   dur:'9:50' },
    { id:'i14', title:'Electronic Ragas',          artist:'Kalidas',              dur:'5:40' },
    { id:'i15', title:'Morning Raga',              artist:'TM Krishna',           dur:'15:00' },
    { id:'i16', title:'Nadai Rhythms',             artist:'Percussionist Vikku',  dur:'7:30' },
    { id:'i17', title:'Bass & Strings',            artist:'Santhosh Narayanan',   dur:'4:55' },
    { id:'i18', title:'Kanjira Solo',              artist:'Selvaganesh',          dur:'6:10' },
    { id:'i19', title:'Acoustic Sunrise',          artist:'Sid Sriram',           dur:'3:45' },
    { id:'i20', title:'Deep Focus Tamil',          artist:'Studio Mix',           dur:'4:00' },
  ];

  /* ── BGM ── */
  var BGM = [
    { id:'b01', title:'Vikram BGM',                artist:'Anirudh Ravichander',  dur:'2:45' },
    { id:'b02', title:'Varisu Theme',              artist:'Thaman S',             dur:'3:10' },
    { id:'b03', title:'Master BGM',                artist:'Anirudh',              dur:'2:30' },
    { id:'b04', title:'Ponniyin Selvan Theme',     artist:'AR Rahman',            dur:'4:20' },
    { id:'b05', title:'Vada Chennai BGM',          artist:'Santhosh Narayanan',   dur:'3:40' },
    { id:'b06', title:'Mersal Theme',              artist:'AR Rahman',            dur:'2:55' },
    { id:'b07', title:'Kaithi BGM',                artist:'Sam C.S.',             dur:'3:15' },
    { id:'b08', title:'Viswaasam BGM',             artist:'D. Imman',             dur:'2:50' },
    { id:'b09', title:'Asuran Theme',              artist:'G.V. Prakash',         dur:'3:30' },
    { id:'b10', title:'Pariyerum Perumal BGM',     artist:'Santhosh Narayanan',   dur:'2:40' },
    { id:'b11', title:'Ratchasan BGM',             artist:'Ghibran',              dur:'3:05' },
    { id:'b12', title:'Doctor Theme',              artist:'Anirudh',              dur:'2:20' },
    { id:'b13', title:'Bigil Action BGM',          artist:'AR Rahman',            dur:'3:50' },
    { id:'b14', title:'Soorarai Pottru BGM',       artist:'G.V. Prakash',         dur:'2:58' },
    { id:'b15', title:'Jai Bhim Theme',            artist:'Sean Roldan',          dur:'3:22' },
    { id:'b16', title:'Dasara BGM',                artist:'Santhosh Narayanan',   dur:'2:48' },
    { id:'b17', title:'Bheeshma Parvam BGM',       artist:'Deepak Dev',           dur:'3:38' },
    { id:'b18', title:'Mani Ratnam Hits BGM',      artist:'AR Rahman',            dur:'5:00' },
    { id:'b19', title:'Leo BGM',                   artist:'Anirudh Ravichander',  dur:'2:35' },
    { id:'b20', title:'Indian 2 Theme',            artist:'Anirudh',              dur:'3:00' },
  ];

  /* ── Storytelling ── */
  var STORYTELLING = [
    { id:'st01', title:'Ponniyin Selvan Audio Story',  artist:'Kalki Krishnamurthy', dur:'45 min' },
    { id:'st02', title:'Sivagamiyin Sabatham',         artist:'Kalki',               dur:'38 min' },
    { id:'st03', title:'Tamil Folklore Tales',         artist:'Folk Narrators',      dur:'22 min' },
    { id:'st04', title:'Vikramadithan Stories',        artist:'Classic Narration',   dur:'30 min' },
    { id:'st05', title:'Thirukkural Explained',        artist:'Scholar Sundaram',    dur:'18 min' },
    { id:'st06', title:'Ilamaiyil Oru Kaathal',        artist:'Sujatha Rangarajan',  dur:'55 min' },
    { id:'st07', title:'Narasimha Puranam',            artist:'Temple Stories',      dur:'28 min' },
    { id:'st08', title:'Tamil Epics Retold',           artist:'Heritage Voice',      dur:'35 min' },
    { id:'st09', title:'Bedtime Stories Tamil',        artist:'Kids Narration',      dur:'15 min' },
    { id:'st10', title:'Mahabharatam Tamil',           artist:'Classical Voice',     dur:'60 min' },
    { id:'st11', title:'Horror Stories Tamil',         artist:'Scary Voice',         dur:'25 min' },
    { id:'st12', title:'Love Stories of Tamil Nadu',   artist:'Romantic Tales',      dur:'32 min' },
    { id:'st13', title:'Detective Vikram Series',      artist:'Mystery Narration',   dur:'40 min' },
    { id:'st14', title:'Manimekalai Audio',            artist:'Classical Scholar',   dur:'50 min' },
    { id:'st15', title:'Cheran Stories',               artist:'History Narrators',   dur:'20 min' },
    { id:'st16', title:'Short Stories Tamil',          artist:'Sundara Ramasamy',    dur:'12 min' },
    { id:'st17', title:'Ramayanam Audio',              artist:'Devotional Voice',    dur:'55 min' },
    { id:'st18', title:'Valluvar Varalaru',            artist:'Scholar Murugan',     dur:'42 min' },
    { id:'st19', title:'Science Fiction Tamil',        artist:'SciFi Narrators',     dur:'35 min' },
    { id:'st20', title:'Mystery of Sigiriya',          artist:'Adventure Tales',     dur:'30 min' },
  ];

  /* ─────────────────────────────────────────────────
     STATE
  ───────────────────────────────────────────────── */
  var activeTab   = 'all';
  var currentPage = 1;
  var searchQuery = '';

  /* ─────────────────────────────────────────────────
     DATA HELPERS
  ───────────────────────────────────────────────── */
  function getDataForTab(tab) {
    switch (tab) {
      case 'your-results': return { items: YOUR_RESULTS, kind: 'your-results' };
      case 'songs':        return { items: SONGS,        kind: 'song'         };
      case 'albums':       return { items: ALBUMS,       kind: 'album'        };
      case 'rap':          return { items: RAP,          kind: 'rap'          };
      case 'instrumental': return { items: INSTRUMENTAL, kind: 'instrumental' };
      case 'bgm':          return { items: BGM,          kind: 'bgm'          };
      case 'storytelling': return { items: STORYTELLING, kind: 'storytelling' };
      default:             return { items: buildAll(),   kind: 'mixed'        };
    }
  }

  function buildAll() {
    var all    = [];
    var maxLen = Math.max(
      SONGS.length, ALBUMS.length, RAP.length,
      INSTRUMENTAL.length, BGM.length, STORYTELLING.length
    );
    for (var i = 0; i < maxLen; i++) {
      if (SONGS[i])        all.push({ kind: 'song',         data: SONGS[i]        });
      if (ALBUMS[i])       all.push({ kind: 'album',        data: ALBUMS[i]       });
      if (RAP[i])          all.push({ kind: 'rap',          data: RAP[i]          });
      if (INSTRUMENTAL[i]) all.push({ kind: 'instrumental', data: INSTRUMENTAL[i] });
      if (BGM[i])          all.push({ kind: 'bgm',          data: BGM[i]          });
      if (STORYTELLING[i]) all.push({ kind: 'storytelling', data: STORYTELLING[i] });
    }
    return all;
  }

  /* Only filter when query is a meaningful keyword (3+ chars).
     Generic nav words like "music" show all cards. */
  function applyQueryFilter(items, kind) {
    if (!searchQuery || searchQuery.length < 3) return items;
    var q = searchQuery.toLowerCase();
    return items.filter(function (item) {
      var d      = kind === 'mixed' ? item.data : item;
      var name   = (d.title  || d.name || '').toLowerCase();
      var artist = (d.artist || d.type || '').toLowerCase();
      var genre  = (d.genre  || '').toLowerCase();
      return name.includes(q) || artist.includes(q) || genre.includes(q);
    });
  }

  /* ─────────────────────────────────────────────────
     CARD BUILDERS
  ───────────────────────────────────────────────── */
  function buildSongCard(d, i) {
    return makeContentCard({
      type: 'song', id: d.id, img: mc(i), title: d.title,
      creator: d.artist, extra: { label: d.dur + ' · Songs' },
    });
  }
  function buildAlbumCard(d, i) {
    return makeContentCard({
      type: 'album', id: d.id, img: mc(i), title: d.title,
      creator: d.artist, extra: { label: d.tracks + ' · Albums' },
    });
  }
  function buildRapCard(d, i) {
    return makeContentCard({
      type: 'song', id: d.id, img: mc(i), title: d.title,
      creator: d.artist, extra: { label: d.dur + ' · Rap' },
    });
  }
  function buildInstCard(d, i) {
    return makeContentCard({
      type: 'song', id: d.id, img: pc(i), title: d.title,
      creator: d.artist, extra: { label: d.dur + ' · Instrumental' },
    });
  }
  function buildBgmCard(d, i) {
    return makeContentCard({
      type: 'song', id: d.id, img: mc(i), title: d.title,
      creator: d.artist, extra: { label: d.dur + ' · BGM' },
    });
  }
  function buildStoryCard(d, i) {
    return makeContentCard({
      type: 'episode', id: d.id, img: pc(i), title: d.title,
      creator: d.artist, extra: { label: d.dur + ' · Storytelling' },
    });
  }

  function buildYourResultCard(d, i) {
    var type = (d.kind === 'album') ? 'album'
             : (d.kind === 'storytelling') ? 'episode'
             : 'song';
    var img  = (d.kind === 'instrumental' || d.kind === 'storytelling') ? pc(i) : mc(i);
    var extra = d.dur ? d.dur + ' · ' + d.kind.charAt(0).toUpperCase() + d.kind.slice(1) : d.kind.charAt(0).toUpperCase() + d.kind.slice(1);
    return makeContentCard({
      type: type, id: d.id, img: img, title: d.title,
      creator: d.artist, extra: { label: extra },
    });
  }

  function buildCardByKind(kind, data, idx) {
    switch (kind) {
      case 'your-results': return buildYourResultCard(data, idx);
      case 'song':         return buildSongCard(data, idx);
      case 'album':        return buildAlbumCard(data, idx);
      case 'rap':          return buildRapCard(data, idx);
      case 'instrumental': return buildInstCard(data, idx);
      case 'bgm':          return buildBgmCard(data, idx);
      case 'storytelling': return buildStoryCard(data, idx);
      default:             return '';
    }
  }

  /* ─────────────────────────────────────────────────
     RENDER: TABS
  ───────────────────────────────────────────────── */
  function renderTabs() {
    var container = document.getElementById('msr-tabs');
    if (!container) return;

    container.innerHTML = TABS.map(function (tab) {
      var cls = 'msr-tab-btn' + (tab.id === activeTab ? ' active' : '');
      return '<button class="' + cls + '" data-tab="' + tab.id + '">'
           + tab.icon + ' ' + tab.label + '</button>';
    }).join('');

    container.querySelectorAll('.msr-tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var newTab = btn.getAttribute('data-tab');
        if (newTab === activeTab) return;
        activeTab   = newTab;
        currentPage = 1;
        renderTabs();
        updateHeader();
        renderGrid(true);
        // reflect tab in URL without reload
        var url = new URL(window.location.href);
        if (newTab === 'all') { url.searchParams.delete('tab'); }
        else                  { url.searchParams.set('tab', newTab); }
        window.history.replaceState(null, '', url.toString());
      });
    });
  }

  /* ─────────────────────────────────────────────────
     RENDER: HEADER
  ───────────────────────────────────────────────── */
  function updateHeader() {
    var heading = document.getElementById('msr-heading');
    var subtext = document.getElementById('msr-subtext');
    if (!heading || !subtext) return;

    var tabLabel = '';
    TABS.forEach(function (t) { if (t.id === activeTab) tabLabel = t.label; });

    if (activeTab === 'your-results') {
      heading.textContent = 'Your Results';
      subtext.textContent = 'Personalised picks based on your listening history';
    } else if (searchQuery) {
      heading.textContent = '"' + searchQuery + '"';
      subtext.textContent = 'Showing results for: ' + searchQuery
        + (activeTab !== 'all' ? ' · ' + tabLabel : '');
    } else {
      heading.textContent = activeTab === 'all' ? 'All Music' : tabLabel;
      subtext.textContent = 'Browse ' + (activeTab === 'all' ? 'all music' : tabLabel.toLowerCase())
        + ' on Thala Nivitham';
    }
  }

  /* ─────────────────────────────────────────────────
     RENDER: GRID
  ───────────────────────────────────────────────── */
  function renderGrid(reset) {
    var grid  = document.getElementById('msr-grid');
    var btnLM = document.getElementById('msr-load-more');
    if (!grid) return;

    var dataObj  = getDataForTab(activeTab);
    var filtered = applyQueryFilter(dataObj.items, dataObj.kind);
    var total    = filtered.length;
    var shown    = currentPage * PAGE_SIZE;
    var start    = reset ? 0 : (currentPage - 1) * PAGE_SIZE;
    var batch    = filtered.slice(start, shown);

    if (reset) grid.innerHTML = '';

    if (batch.length === 0 && grid.children.length === 0) {
      grid.innerHTML =
        '<div class="msr-empty">' +
        '<i class="fa-solid fa-music"></i>' +
        '<p>No results found. Try a different search or tab.</p>' +
        '</div>';
    } else {
      batch.forEach(function (item, relIdx) {
        var idx  = start + relIdx;
        var html = dataObj.kind === 'mixed'
          ? buildCardByKind(item.kind, item.data, idx)
          : buildCardByKind(dataObj.kind, item, idx);

        var wrap  = document.createElement('div');
        wrap.innerHTML = html;
        var card = wrap.firstElementChild;
        if (card) grid.appendChild(card);
      });
    }

    if (btnLM) {
      if (shown >= total) {
        btnLM.disabled    = true;
        btnLM.textContent = 'No More Results';
      } else {
        btnLM.disabled    = false;
        btnLM.textContent = 'Load More';
      }
    }
  }

  /* ─────────────────────────────────────────────────
     LOAD MORE
  ───────────────────────────────────────────────── */
  function initLoadMore() {
    var btn = document.getElementById('msr-load-more');
    if (!btn) return;
    btn.addEventListener('click', function () {
      currentPage++;
      renderGrid(false);
    });
  }

  /* ─────────────────────────────────────────────────
     INIT
  ───────────────────────────────────────────────── */
  function init() {
    var params  = new URLSearchParams(window.location.search);
    searchQuery = (params.get('q') || '').trim();
    var rawTab  = (params.get('tab') || '').toLowerCase();

    // Validate tab against known ids
    var valid = false;
    TABS.forEach(function (t) { if (t.id === rawTab) valid = true; });
    activeTab   = valid ? rawTab : 'all';
    currentPage = 1;

    renderTabs();
    updateHeader();
    renderGrid(true);
    initLoadMore();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());