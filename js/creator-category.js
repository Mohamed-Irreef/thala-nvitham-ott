/* =============================================================
   js/creator-category.js
   Browse-by-category page: tabs, grid, load-more
============================================================= */

(function () {
  const PAGE_SIZE = 8;

  /* ── Category definitions (same IDs as creators.js) ── */
  const CATEGORIES = [
    { id: 'all',        name: 'All Creators',        icon: 'fa-globe',            count: null },
    { id: 'cat_music',  name: 'Music Artists',        icon: 'fa-guitar',           count: 450 },
    { id: 'cat_podcast',name: 'Podcast Hosts',        icon: 'fa-microphone-lines', count: 320 },
    { id: 'cat_rap',    name: 'Rap Artists',          icon: 'fa-fire',             count: 150 },
    { id: 'cat_indie',  name: 'Independent Creators', icon: 'fa-compact-disc',     count: 580 },
    { id: 'cat_story',  name: 'Storytellers',         icon: 'fa-book-open',        count: 210 },
    { id: 'cat_tech',   name: 'Technology Creators',  icon: 'fa-laptop-code',      count: 180 },
    { id: 'cat_comedy', name: 'Comedy Creators',      icon: 'fa-masks-theater',    count: 290 },
    { id: 'cat_edu',    name: 'Education Creators',   icon: 'fa-graduation-cap',   count: 340 },
  ];

  /* ── Mock creator dataset ── */
  const ALL_CREATORS = [
    // ─ Music Artists ─
    { id: 'cr_kavi',    cat: 'cat_music',   label: 'Music Producer',  name: 'Kavi Rajan',       followers: '1.2M Followers', img: 'https://images.unsplash.com/photo-1520423465871-0866049020b7?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_rakesh',  cat: 'cat_music',   label: 'DJ / Musician',   name: 'DJ Rakesh',         followers: '420K Followers', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_arjun',   cat: 'cat_music',   label: 'Music Artist',    name: 'Arjun Beats',       followers: '280K Followers', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_priya',   cat: 'cat_music',   label: 'Singer',          name: 'Priya Suresh',      followers: '190K Followers', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_nila',    cat: 'cat_music',   label: 'DJ',              name: 'Nila Beats',        followers: '310K Followers', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_sam',     cat: 'cat_music',   label: 'Fusion Artist',   name: 'Sam Fusion',        followers: '95K Followers',  img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_ananya',  cat: 'cat_music',   label: 'Classical Singer',name: 'Ananya Krishnan',   followers: '73K Followers',  img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_rohan',   cat: 'cat_music',   label: 'Indie Pop',       name: 'Rohan Melodies',    followers: '160K Followers', img: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_tara',    cat: 'cat_music',   label: 'Vocalist',        name: 'Tara Voice',        followers: '245K Followers', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_kavin',   cat: 'cat_music',   label: 'Composer',        name: 'Kavin Tunes',       followers: '118K Followers', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop' },

    // ─ Podcast Hosts ─
    { id: 'cr_arun',    cat: 'cat_podcast', label: 'Tech Podcast',    name: 'Arun Kumar',        followers: '150K Followers', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_vivek',   cat: 'cat_podcast', label: 'Wellness',        name: 'Dr. Vivek',         followers: '550K Followers', img: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_sneha',   cat: 'cat_podcast', label: 'Podcast Host',    name: 'Sneha Raj',         followers: '230K Followers', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_mohan',   cat: 'cat_podcast', label: 'Business Talk',   name: 'Mohan Talks',       followers: '78K Followers',  img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_divya',   cat: 'cat_podcast', label: 'Podcast Creator', name: 'Divya Speaks',      followers: '145K Followers', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_senthil', cat: 'cat_podcast', label: 'Story Podcast',   name: 'Chef Senthil',      followers: '92K Followers',  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_pooja',   cat: 'cat_podcast', label: 'Health & Mind',   name: 'Pooja Nair',        followers: '310K Followers', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_vikrant', cat: 'cat_podcast', label: 'News & Current',  name: 'Vikrant Speaks',    followers: '205K Followers', img: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_kavya',   cat: 'cat_podcast', label: 'Finance Podcast', name: 'Kavya Finance',     followers: '67K Followers',  img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_ranjith', cat: 'cat_podcast', label: 'Science Talk',    name: 'Ranjith Science',   followers: '134K Followers', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop' },

    // ─ Rap Artists ─
    { id: 'cr_stan',    cat: 'cat_rap',     label: 'Rap',             name: 'MC Stan',           followers: '3.5M Followers', img: 'https://images.unsplash.com/photo-1520342868574-5fa3804e551c?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_flow',    cat: 'cat_rap',     label: 'Rap Artist',      name: 'FlowKing Stone',    followers: '890K Followers', img: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_blaze',   cat: 'cat_rap',     label: 'Hip Hop',         name: 'Blaze Tamil',       followers: '430K Followers', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_verse',   cat: 'cat_rap',     label: 'Rapper',          name: 'Verse King',        followers: '200K Followers', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_gully',   cat: 'cat_rap',     label: 'Street Rap',      name: 'Gully Bhai',        followers: '760K Followers', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_neon',    cat: 'cat_rap',     label: 'Freestyle',       name: 'Neon Rhymes',       followers: '115K Followers', img: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_dravi',   cat: 'cat_rap',     label: 'Tamil Rap',       name: 'Dravidam MC',       followers: '340K Followers', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_urban',   cat: 'cat_rap',     label: 'Urban Beat',      name: 'Urumi Urban',       followers: '180K Followers', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_metro',   cat: 'cat_rap',     label: 'Metro Rap',       name: 'Metro Spit',        followers: '90K Followers',  img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop' },

    // ─ Independent Creators ─
    { id: 'cr_indie1',  cat: 'cat_indie',   label: 'Independent',     name: 'Akash Indie',       followers: '67K Followers',  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_indie2',  cat: 'cat_indie',   label: 'Creator',         name: 'Sana Creative',     followers: '112K Followers', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_indie3',  cat: 'cat_indie',   label: 'Alt Music',       name: 'Rahul Alt Sound',   followers: '48K Followers',  img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_indie4',  cat: 'cat_indie',   label: 'Independent',     name: 'Kavitha Singh',     followers: '230K Followers', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_indie5',  cat: 'cat_indie',   label: 'Solo Creator',    name: 'Aryan Solo',        followers: '88K Followers',  img: 'https://images.unsplash.com/photo-1520342868574-5fa3804e551c?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_indie6',  cat: 'cat_indie',   label: 'Indie Folk',      name: 'Meghna Folk',       followers: '155K Followers', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_indie7',  cat: 'cat_indie',   label: 'Experimental',    name: 'Zero Theory',       followers: '42K Followers',  img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_indie8',  cat: 'cat_indie',   label: 'Lo-Fi Creator',   name: 'Breezy Beats',      followers: '276K Followers', img: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_indie9',  cat: 'cat_indie',   label: 'DIY Music',       name: 'Garageband Pro',    followers: '61K Followers',  img: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_indie10', cat: 'cat_indie',   label: 'Independent',     name: 'Layla Sounds',      followers: '135K Followers', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop' },

    // ─ Storytellers ─
    { id: 'cr_ravi',    cat: 'cat_story',   label: 'Storytelling',    name: 'Ravi Narayanan',    followers: '85K Followers',  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_story2',  cat: 'cat_story',   label: 'Storyteller',     name: 'Preethi Stories',   followers: '145K Followers', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_story3',  cat: 'cat_story',   label: 'Narrator',        name: 'Vikram Narrates',   followers: '56K Followers',  img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_story4',  cat: 'cat_story',   label: 'Audio Drama',     name: 'Drama Queen TN',    followers: '220K Followers', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_story5',  cat: 'cat_story',   label: 'Tamil Tales',     name: 'Myth Weaver',       followers: '98K Followers',  img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_story6',  cat: 'cat_story',   label: 'Folklore',        name: 'Nadu Kathai',       followers: '67K Followers',  img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_story7',  cat: 'cat_story',   label: 'Short Stories',   name: 'Pen & Voice',       followers: '180K Followers', img: 'https://images.unsplash.com/photo-1520342868574-5fa3804e551c?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_story8',  cat: 'cat_story',   label: 'Story Teller',    name: 'Azhagi Tales',      followers: '43K Followers',  img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop' },

    // ─ Technology Creators ─
    { id: 'cr_tech1',   cat: 'cat_tech',    label: 'Technology',      name: 'Arun Kumar Tech',   followers: '150K Followers', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_tech2',   cat: 'cat_tech',    label: 'Tech Creator',    name: 'Dev Prabhu',        followers: '320K Followers', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_tech3',   cat: 'cat_tech',    label: 'Software',        name: 'Nisha Coder',       followers: '88K Followers',  img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_tech4',   cat: 'cat_tech',    label: 'AI Enthusiast',   name: 'Vignesh AI',        followers: '210K Followers', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_tech5',   cat: 'cat_tech',    label: 'Cloud & DevOps',  name: 'CloudByte',         followers: '74K Followers',  img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_tech6',   cat: 'cat_tech',    label: 'Cybersecurity',   name: 'HackerMind TN',     followers: '130K Followers', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_tech7',   cat: 'cat_tech',    label: 'Data Science',    name: 'DataMind Aishwarya',followers: '95K Followers',  img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_tech8',   cat: 'cat_tech',    label: 'Web Dev',         name: 'Frontend Raj',      followers: '165K Followers', img: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=300&auto=format&fit=crop' },

    // ─ Comedy Creators ─
    { id: 'cr_com1',    cat: 'cat_comedy',  label: 'Stand-up',        name: 'Siva Comedy',       followers: '780K Followers', img: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_meera',   cat: 'cat_comedy',  label: 'Motivational',    name: 'Meera S',           followers: '2.1M Followers', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_com3',    cat: 'cat_comedy',  label: 'Comedy',          name: 'Rajesh Jokes',      followers: '360K Followers', img: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_com4',    cat: 'cat_comedy',  label: 'Satire',          name: 'Prank Master',      followers: '490K Followers', img: 'https://images.unsplash.com/photo-1520342868574-5fa3804e551c?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_com5',    cat: 'cat_comedy',  label: 'Parody',          name: 'Anbu Comedy',       followers: '155K Followers', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_com6',    cat: 'cat_comedy',  label: 'Sketch',          name: 'Sketch Bros TN',    followers: '230K Followers', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_com7',    cat: 'cat_comedy',  label: 'Improv',          name: 'Improv Tamil',      followers: '88K Followers',  img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_com8',    cat: 'cat_comedy',  label: 'Tamil Humor',     name: 'LOL Factory',       followers: '620K Followers', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_com9',    cat: 'cat_comedy',  label: 'Roast King',      name: 'Roast Republic',    followers: '1.1M Followers', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=300&auto=format&fit=crop' },

    // ─ Education Creators ─
    { id: 'cr_edu1',    cat: 'cat_edu',     label: 'Education',       name: 'Prof. Anand',       followers: '420K Followers', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_edu2',    cat: 'cat_edu',     label: 'Educator',        name: 'Kavitha Learn',     followers: '195K Followers', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_edu3',    cat: 'cat_edu',     label: 'Language Coach',  name: 'Tamil Tutor',       followers: '82K Followers',  img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_edu4',    cat: 'cat_edu',     label: 'Math & Science',  name: 'Shankar Teach',     followers: '310K Followers', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_edu5',    cat: 'cat_edu',     label: 'History Tamil',   name: 'Itihasam Guide',    followers: '178K Followers', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_edu6',    cat: 'cat_edu',     label: 'Finance Edu',     name: 'Wealth Guru',       followers: '265K Followers', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_edu7',    cat: 'cat_edu',     label: 'Skill Coach',     name: 'Skill India TN',    followers: '93K Followers',  img: 'https://images.unsplash.com/photo-1520342868574-5fa3804e551c?q=80&w=300&auto=format&fit=crop' },
    { id: 'cr_edu8',    cat: 'cat_edu',     label: 'Career Mentor',   name: 'Career Compass',    followers: '450K Followers', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop' },
  ];

  /* ── State ── */
  let activeCategory = 'all';
  let currentPage = 1;

  /* ── Helpers ── */
  function getUrlCat() {
    return new URLSearchParams(window.location.search).get('cat') || 'all';
  }

  function getFiltered() {
    if (activeCategory === 'all') return ALL_CREATORS;
    return ALL_CREATORS.filter(c => c.cat === activeCategory);
  }

  function getCatInfo(id) {
    return CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
  }

  /* ── Render Tabs ── */
  function renderTabs() {
    const tabsEl = document.getElementById('cc-tabs');
    if (!tabsEl) return;

    tabsEl.innerHTML = CATEGORIES.map(cat => {
      const count = cat.id === 'all'
        ? ALL_CREATORS.length
        : ALL_CREATORS.filter(c => c.cat === cat.id).length;

      return `
        <button class="cc-tab-btn ${cat.id === activeCategory ? 'active' : ''}" data-cat="${cat.id}">
          <i class="fa-solid ${cat.icon} fa-sm"></i>
          ${cat.name}
          <span class="cc-tab-count">${count}</span>
        </button>`;
    }).join('');

    tabsEl.querySelectorAll('.cc-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.cat;
        currentPage = 1;
        renderTabs();
        renderGrid();
        updateHeader();
      });
    });
  }

  /* ── Update Header Text ── */
  function updateHeader() {
    const cat = getCatInfo(activeCategory);
    const filtered = getFiltered();
    const heading = activeCategory === 'all' ? 'All Creators' : cat.name;
    const sub = activeCategory === 'all'
      ? `Discover all ${filtered.length} creators on Thala Nivitham`
      : `${filtered.length} creators in ${cat.name}`;
    document.getElementById('cc-page-heading').textContent = heading;
    document.getElementById('cc-page-sub').textContent = sub;
    document.getElementById('cc-category-title').textContent = heading;
    document.title = `${heading} — Thala Nivitham`;
  }

  /* ── Creator Card HTML ── */
  function makeCreatorCard(c) {
    return `
      <div class="creator-card" onclick="window.location.href='creator-details.html?id=${c.id}'">
        <div class="creator-thumb">
          <img src="${c.img}" alt="${c.name}" loading="lazy"/>
          <div class="card-thumb-actions">
            <button class="thumb-action-btn view"
              title="View Profile"
              onclick="event.stopPropagation(); window.location.href='creator-details.html?id=${c.id}'">
              <i class="fa-solid fa-id-card"></i>
            </button>
            <button class="thumb-action-btn follow"
              title="Follow"
              onclick="event.stopPropagation(); toggleFollow(this)">
              <i class="fa-solid fa-user-plus"></i>
            </button>
          </div>
        </div>
        <h3 class="card-name">${c.name}</h3>
        <p class="card-category">${c.label}</p>
        <span class="card-followers">${c.followers}</span>
      </div>`;
  }

  /* ── Render Grid ── */
  function renderGrid() {
    const filtered = getFiltered();
    const toShow = filtered.slice(0, currentPage * PAGE_SIZE);
    const grid = document.getElementById('cc-grid');
    if (!grid) return;

    grid.innerHTML = toShow.map(makeCreatorCard).join('');

    const btn = document.getElementById('cc-load-more-btn');
    if (toShow.length >= filtered.length) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-check-circle"></i> All Loaded';
    } else {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Load More';
    }
  }

  /* ── Follow Toggle ── */
  window.toggleFollow = function (btn) {
    const isFollowing = btn.dataset.following === 'true';
    if (isFollowing) {
      btn.innerHTML = '<i class="fa-solid fa-user-plus"></i>';
      btn.style.background = '';
      btn.dataset.following = 'false';
    } else {
      btn.innerHTML = '<i class="fa-solid fa-check"></i>';
      btn.style.background = '#0BB3F0';
      btn.dataset.following = 'true';
    }
  };

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    activeCategory = getUrlCat();
    currentPage = 1;

    renderTabs();
    renderGrid();
    updateHeader();

    document.getElementById('cc-load-more-btn').addEventListener('click', () => {
      currentPage++;
      renderGrid();
    });
  });

})();
