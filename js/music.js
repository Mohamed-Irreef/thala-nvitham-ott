(function () {
  'use strict';

  /* ── Image pools ── */
  var MC = ['assets/music-cover1.png','assets/music-cover2.png','assets/music-cover3.png','assets/music-cover4.png','assets/music-cover5.png'];
  var PC = ['assets/podcast-cover1.png','assets/podcast-cover2.png','assets/podcast-cover3.png','assets/podcast-cover4.png','assets/podcast-cover5.png'];
  function mc(i) { return MC[i % MC.length]; }
  function pc(i) { return PC[i % PC.length]; }

  /* ─────────────────────────────────────────────────
     DATA  (20 items per tab)
  ───────────────────────────────────────────────── */
  var SONGS = [
    {id:'ms01', title:'Uyire Uyire',            artist:'AR Rahman',           dur:'4:32'},
    {id:'ms02', title:'Vaaney Vaaney',           artist:'Sid Sriram',          dur:'5:10'},
    {id:'ms03', title:'Rowdy Baby',              artist:'Dhanush',             dur:'3:50'},
    {id:'ms04', title:'Kannaana Kanney',         artist:'D. Imman',            dur:'5:20'},
    {id:'ms05', title:'Inaindha Kaigal',         artist:'Sid Sriram',          dur:'4:40'},
    {id:'ms06', title:'Machi Open The Bottle',   artist:'Anirudh',             dur:'3:15'},
    {id:'ms07', title:'City Nights',             artist:'Yuvan',               dur:'4:05'},
    {id:'ms08', title:'Kaatru Veliyidai',        artist:'AR Rahman',           dur:'6:00'},
    {id:'ms09', title:'Nenjukku Needhi',         artist:'Anirudh Ravichander', dur:'4:55'},
    {id:'ms10', title:'Aalaporan Tamizhan',      artist:'AR Rahman',           dur:'3:30'},
    {id:'ms11', title:'En Kadhal Solla',         artist:'Yuvan',               dur:'4:35'},
    {id:'ms12', title:'Ottagatha Kattiko',       artist:'AR Rahman',           dur:'4:12'},
    {id:'ms13', title:'Boom Boom',               artist:'Anirudh',             dur:'3:38'},
    {id:'ms14', title:'Kutti Story',             artist:'Anirudh / Vijay',     dur:'3:25'},
    {id:'ms15', title:'Mila Kaligiratha',        artist:'Yuvan Shankar',       dur:'5:44'},
    {id:'ms16', title:'Chennai Nights',          artist:'G.V. Prakash',        dur:'4:18'},
    {id:'ms17', title:'Naan Ready',              artist:'Anirudh / Dhanush',   dur:'3:20'},
    {id:'ms18', title:'Vaazhga Valamudan',       artist:'AR Rahman',           dur:'4:50'},
    {id:'ms19', title:'Thangamey Thangamey',     artist:'Anirudh Ravichander', dur:'4:22'},
    {id:'ms20', title:'Maryan Title Track',      artist:'AR Rahman',           dur:'5:05'},
  ];

  var ALBUMS = [
    {id:'ma01', title:'Ilayaraja Classics',       artist:'Ilayaraja',           tracks:'24 tracks'},
    {id:'ma02', title:'Anirudh Hits Vol.1',       artist:'Anirudh Ravichander', tracks:'18 tracks'},
    {id:'ma03', title:'AR Rahman Best',           artist:'AR Rahman',           tracks:'20 tracks'},
    {id:'ma04', title:'Yuvan Melodies',           artist:'Yuvan Shankar Raja',  tracks:'15 tracks'},
    {id:'ma05', title:'Darbuka Fusion',           artist:'Darbuka Siva',        tracks:'10 tracks'},
    {id:'ma06', title:'Vision 2025',              artist:'G.V. Prakash',        tracks:'14 tracks'},
    {id:'ma07', title:'Tamil Acoustic Vol.1',     artist:'Sid Sriram',          tracks:'8 tracks'},
    {id:'ma08', title:'Naadha Deva',              artist:'Santhosh Narayanan',  tracks:'16 tracks'},
    {id:'ma09', title:'Urban Sounds TN',          artist:'Various',             tracks:'20 tracks'},
    {id:'ma10', title:'Folk Revived',             artist:'Gana Bala',           tracks:'11 tracks'},
    {id:'ma11', title:'India Sounds',             artist:'Various Artists',     tracks:'25 tracks'},
    {id:'ma12', title:'Midnight Moods',           artist:'Yuvan',               tracks:'13 tracks'},
    {id:'ma13', title:'Party Anthems TN',         artist:'DJ Vijay',            tracks:'17 tracks'},
    {id:'ma14', title:'Carnatic Crossover',       artist:'TM Krishna',          tracks:'9 tracks'},
    {id:'ma15', title:'Romantic TN',              artist:'Harris Jayaraj',      tracks:'18 tracks'},
    {id:'ma16', title:'D. Imman Scores',          artist:'D. Imman',            tracks:'21 tracks'},
    {id:'ma17', title:'Tamil Indie Sounds',       artist:'Various Indies',      tracks:'16 tracks'},
    {id:'ma18', title:'Beats of Tamil',           artist:'Kalidas',             tracks:'14 tracks'},
    {id:'ma19', title:'Harris Jayaraj Gold',      artist:'Harris Jayaraj',      tracks:'22 tracks'},
    {id:'ma20', title:'Vinnaithaandi Varuvaaya',  artist:'AR Rahman',           tracks:'12 tracks'},
  ];

  var RAP = [
    {id:'mr01', title:'Street Code',              artist:'Arivu',               dur:'3:45'},
    {id:'mr02', title:'Rooftop Sessions',          artist:'Blaaze',              dur:'3:58'},
    {id:'mr03', title:'Urban Pulse',               artist:'Hiphop Tamizha',      dur:'3:22'},
    {id:'mr04', title:'Paneer Raj Beat',           artist:'Paneer Raj',          dur:'4:02'},
    {id:'mr05', title:'Kadhal Munnetra Kazhagam',  artist:'Hiphop Tamizha',      dur:'3:55'},
    {id:'mr06', title:'Vaadi Machan',              artist:'Arivu',               dur:'4:10'},
    {id:'mr07', title:'Tamil Anthem',              artist:'Dhanush',             dur:'3:30'},
    {id:'mr08', title:'Naan Sirithal',             artist:'Hiphop Tamizha',      dur:'3:48'},
    {id:'mr09', title:'City Lights',               artist:'Blaaze',              dur:'4:20'},
    {id:'mr10', title:'Machi Machaan',             artist:'Dhanush',             dur:'3:15'},
    {id:'mr11', title:'Otha Sollakata',            artist:'Arivu',               dur:'4:05'},
    {id:'mr12', title:'Free Tamil',                artist:'Paneer Raj',          dur:'3:50'},
    {id:'mr13', title:'Nenjame Nenjame',           artist:'Hiphop Tamizha',      dur:'4:30'},
    {id:'mr14', title:'Chennai Gully',             artist:'Blaaze',              dur:'3:40'},
    {id:'mr15', title:'Block Patta',               artist:'Arivu',               dur:'3:55'},
    {id:'mr16', title:'Remo Flow',                 artist:'Various Rappers',     dur:'5:12'},
    {id:'mr17', title:'South Side Story',          artist:'Dhanush / Arivu',     dur:'4:18'},
    {id:'mr18', title:'Tamil Hip Hop Cypher',      artist:'Various Artists',     dur:'6:00'},
    {id:'mr19', title:'Kaaney Kaaney Rap',         artist:'Blaaze',              dur:'3:28'},
    {id:'mr20', title:'Fire in the South',         artist:'Paneer Raj',          dur:'3:45'},
  ];

  var INSTRUMENTAL = [
    {id:'mi01', title:'Piano Dreams',              artist:'AR Rahman',            dur:'5:20'},
    {id:'mi02', title:'Carnatic Strings',          artist:'TM Krishna',           dur:'8:40'},
    {id:'mi03', title:'Veena Raga',                artist:'Bombay Jayashri',      dur:'6:55'},
    {id:'mi04', title:'Flute Meditations',         artist:'Hariprasad Chaurasia', dur:'9:10'},
    {id:'mi05', title:'Guitar Tamil',              artist:'Darbuka Siva',         dur:'4:30'},
    {id:'mi06', title:'Nadaswaram',                artist:'Traditional',          dur:'7:20'},
    {id:'mi07', title:'Violin Concerto Tamil',     artist:'L. Subramaniam',       dur:'12:00'},
    {id:'mi08', title:'Tabla Rhythm',              artist:'Zakir Hussain',        dur:'10:15'},
    {id:'mi09', title:'Midnight Piano',            artist:'Yuvan',                dur:'4:45'},
    {id:'mi10', title:'Lofi Tamil Beats',          artist:'Studio TN',            dur:'3:30'},
    {id:'mi11', title:'Saxophone Raga',            artist:'Kadri Gopalnath',      dur:'8:00'},
    {id:'mi12', title:'Harmonium Sessions',        artist:'Classical Studio',     dur:'6:20'},
    {id:'mi13', title:'Sitar Echoes',              artist:'Ravi Shankar Comp.',   dur:'9:50'},
    {id:'mi14', title:'Electronic Ragas',          artist:'Kalidas',              dur:'5:40'},
    {id:'mi15', title:'Morning Raga',              artist:'TM Krishna',           dur:'15:00'},
    {id:'mi16', title:'Nadai Rhythms',             artist:'Percussionist Vikku',  dur:'7:30'},
    {id:'mi17', title:'Bass & Strings',            artist:'Santhosh Narayanan',   dur:'4:55'},
    {id:'mi18', title:'Kanjira Solo',              artist:'Selvaganesh',          dur:'6:10'},
    {id:'mi19', title:'Acoustic Sunrise',          artist:'Sid Sriram',           dur:'3:45'},
    {id:'mi20', title:'Deep Focus Tamil',          artist:'Studio Mix',           dur:'4:00'},
  ];

  var BGM = [
    {id:'mb01', title:'Vikram BGM',                artist:'Anirudh Ravichander',  dur:'2:45'},
    {id:'mb02', title:'Varisu Theme',              artist:'Thaman S',             dur:'3:10'},
    {id:'mb03', title:'Master BGM',                artist:'Anirudh',              dur:'2:30'},
    {id:'mb04', title:'Ponniyin Selvan Theme',     artist:'AR Rahman',            dur:'4:20'},
    {id:'mb05', title:'Vada Chennai BGM',          artist:'Santhosh Narayanan',   dur:'3:40'},
    {id:'mb06', title:'Mersal Theme',              artist:'AR Rahman',            dur:'2:55'},
    {id:'mb07', title:'Kaithi BGM',                artist:'Sam C.S.',             dur:'3:15'},
    {id:'mb08', title:'Viswaasam BGM',             artist:'D. Imman',             dur:'2:50'},
    {id:'mb09', title:'Asuran Theme',              artist:'G.V. Prakash',         dur:'3:30'},
    {id:'mb10', title:'Pariyerum Perumal BGM',     artist:'Santhosh Narayanan',   dur:'2:40'},
    {id:'mb11', title:'Ratchasan BGM',             artist:'Ghibran',              dur:'3:05'},
    {id:'mb12', title:'Doctor Theme',              artist:'Anirudh',              dur:'2:20'},
    {id:'mb13', title:'Bigil Action BGM',          artist:'AR Rahman',            dur:'3:50'},
    {id:'mb14', title:'Soorarai Pottru BGM',       artist:'G.V. Prakash',         dur:'2:58'},
    {id:'mb15', title:'Jai Bhim Theme',            artist:'Sean Roldan',          dur:'3:22'},
    {id:'mb16', title:'Dasara BGM',                artist:'Santhosh Narayanan',   dur:'2:48'},
    {id:'mb17', title:'Bheeshma Parvam BGM',       artist:'Deepak Dev',           dur:'3:38'},
    {id:'mb18', title:'Mani Ratnam Hits BGM',      artist:'AR Rahman',            dur:'5:00'},
    {id:'mb19', title:'Leo BGM',                   artist:'Anirudh Ravichander',  dur:'2:35'},
    {id:'mb20', title:'Indian 2 Theme',            artist:'Anirudh',              dur:'3:00'},
  ];

  var STORYTELLING = [
    {id:'mst01', title:'Ponniyin Selvan Audio Story',  artist:'Kalki Krishnamurthy', dur:'45 min'},
    {id:'mst02', title:'Sivagamiyin Sabatham',         artist:'Kalki',               dur:'38 min'},
    {id:'mst03', title:'Tamil Folklore Tales',         artist:'Folk Narrators',      dur:'22 min'},
    {id:'mst04', title:'Vikramadithan Stories',        artist:'Classic Narration',   dur:'30 min'},
    {id:'mst05', title:'Thirukkural Explained',        artist:'Scholar Sundaram',    dur:'18 min'},
    {id:'mst06', title:'Ilamaiyil Oru Kaathal',        artist:'Sujatha Rangarajan',  dur:'55 min'},
    {id:'mst07', title:'Narasimha Puranam',            artist:'Temple Stories',      dur:'28 min'},
    {id:'mst08', title:'Tamil Epics Retold',           artist:'Heritage Voice',      dur:'35 min'},
    {id:'mst09', title:'Bedtime Stories Tamil',        artist:'Kids Narration',      dur:'15 min'},
    {id:'mst10', title:'Mahabharatam Tamil',           artist:'Classical Voice',     dur:'60 min'},
    {id:'mst11', title:'Horror Stories Tamil',         artist:'Scary Voice',         dur:'25 min'},
    {id:'mst12', title:'Love Stories of Tamil Nadu',   artist:'Romantic Tales',      dur:'32 min'},
    {id:'mst13', title:'Detective Vikram Series',      artist:'Mystery Narration',   dur:'40 min'},
    {id:'mst14', title:'Manimekalai Audio',            artist:'Classical Scholar',   dur:'50 min'},
    {id:'mst15', title:'Cheran Stories',               artist:'History Narrators',   dur:'20 min'},
    {id:'mst16', title:'Short Stories Tamil',          artist:'Sundara Ramasamy',    dur:'12 min'},
    {id:'mst17', title:'Ramayanam Audio',              artist:'Devotional Voice',    dur:'55 min'},
    {id:'mst18', title:'Valluvar Varalaru',            artist:'Scholar Murugan',     dur:'42 min'},
    {id:'mst19', title:'Science Fiction Tamil',        artist:'SciFi Narrators',     dur:'35 min'},
    {id:'mst20', title:'Mystery of Sigiriya',          artist:'Adventure Tales',     dur:'30 min'},
  ];

  var TAB_POOLS = {
    songs:        { items: SONGS,        type: 'song',    imgFn: mc },
    albums:       { items: ALBUMS,       type: 'album',   imgFn: mc },
    rap:          { items: RAP,          type: 'song',    imgFn: mc },
    instrumental: { items: INSTRUMENTAL, type: 'song',    imgFn: pc },
    bgm:          { items: BGM,          type: 'song',    imgFn: mc },
    storytelling: { items: STORYTELLING, type: 'episode', imgFn: pc },
  };

  /* ─────────────────────────────────────────────────
     CARD BUILDER
  ───────────────────────────────────────────────── */
  function buildTabCard(pool, d, i) {
    var label = d.tracks ? d.tracks : d.dur;
    return makeContentCard({
      type: pool.type, id: d.id, img: pool.imgFn(i),
      title: d.title, creator: d.artist,
      extra: { label: label },
    });
  }

  /* ─────────────────────────────────────────────────
     TAB SWITCHING + LOAD MORE
  ───────────────────────────────────────────────── */
  var activeTab = 'all';
  var tabPage   = 1;
  var PAGE_SIZE = 10;

  function renderTabGrid(reset) {
    var tabPanel = document.getElementById('music-tab-panel');
    if (!tabPanel) return;
    var pool = TAB_POOLS[activeTab];
    if (!pool) return;

    if (reset) {
      tabPage = 1;
      tabPanel.innerHTML =
        '<div class="tab-cards-grid" id="music-tab-grid"></div>' +
        '<div class="tab-load-more-wrap">' +
        '<button class="tab-load-more-btn" id="music-tab-load-more">Load More</button>' +
        '</div>';
      document.getElementById('music-tab-load-more').addEventListener('click', function () {
        tabPage++;
        renderTabGrid(false);
      });
    }

    var grid  = document.getElementById('music-tab-grid');
    var btn   = document.getElementById('music-tab-load-more');
    if (!grid) return;

    var items = pool.items;
    var start = (tabPage - 1) * PAGE_SIZE;
    var shown = tabPage * PAGE_SIZE;
    var batch = items.slice(start, shown);

    if (reset) {
      grid.innerHTML = batch.map(function (d, i) {
        return buildTabCard(pool, d, i);
      }).join('');
    } else {
      batch.forEach(function (d, i) {
        grid.insertAdjacentHTML('beforeend', buildTabCard(pool, d, start + i));
      });
    }

    if (btn) {
      if (shown >= items.length) {
        btn.disabled    = true;
        btn.textContent = 'No More Results';
      } else {
        btn.disabled    = false;
        btn.textContent = 'Load More';
      }
    }
  }

  function switchTab(tab) {
    activeTab = tab;
    var allSections = document.getElementById('music-all-sections');
    var tabPanel    = document.getElementById('music-tab-panel');

    document.querySelectorAll('.category-filters .tab-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
    });

    if (tab === 'all') {
      if (allSections) allSections.style.display = '';
      if (tabPanel)    tabPanel.style.display = 'none';
    } else {
      if (allSections) allSections.style.display = 'none';
      if (tabPanel) {
        tabPanel.style.display = '';
        renderTabGrid(true);
      }
    }
  }

  /* ─────────────────────────────────────────────────
     ALL-TAB ROW RENDERING
  ───────────────────────────────────────────────── */
  function get20(arr) {
    if (!arr || !arr.length) return [];
    var result = [];
    while (result.length < 20) result = result.concat(arr);
    return result.slice(0, 20);
  }

  function renderAllRows() {
    var row;
    if (typeof TRENDING !== 'undefined') {
      row = document.getElementById('trendingRow');
      if (row) row.innerHTML = get20(TRENDING.filter(function (c) {
        return c.type === 'audio' || c.type === 'album';
      })).map(function (c) { return makeContentCard(c); }).join('');
    }
    if (typeof NEW_RELEASES !== 'undefined') {
      row = document.getElementById('newReleasesRow');
      if (row) row.innerHTML = get20(NEW_RELEASES.filter(function (c) {
        return c.type === 'audio' || c.type === 'album';
      })).map(function (c) { return makeContentCard(c); }).join('');
    }
    if (typeof CREATORS !== 'undefined') {
      row = document.getElementById('creatorsRow');
      if (row) row.innerHTML = get20(CREATORS).map(function (c) {
        return makeCreatorCard(c);
      }).join('');
    }
    if (typeof MUSIC !== 'undefined') {
      row = document.getElementById('musicRow');
      if (row) row.innerHTML = get20(MUSIC).map(function (c) {
        return makeContentCard(c);
      }).join('');
    }
  }

  /* ─────────────────────────────────────────────────
     INIT
  ───────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.category-filters .tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        switchTab(btn.getAttribute('data-tab') || 'all');
      });
    });
    renderAllRows();
    switchTab('all'); // ensure tab panel is hidden on initial load
  });

})();
