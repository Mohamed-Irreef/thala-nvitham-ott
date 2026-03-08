/* =====================================================
   Thala Nivitham — podcast-search-result.js
   Powers the Podcast Search Result page.
   Reads ?category= from URL, renders tabs + grid,
   supports Load More (18 per page).
   ===================================================== */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────────
     CONFIG
  ────────────────────────────────────────────────── */
  var PAGE_SIZE = 18;

  var CATEGORIES = [    { id: 'your-results',     label: 'Your Results',     icon: '⭐' },    { id: 'all',              label: 'All',              icon: '🎙️' },
    { id: 'entertainment',    label: 'Entertainment',    icon: '🎭' },
    { id: 'technology',       label: 'Technology',       icon: '💻' },
    { id: 'cooking',          label: 'Cooking',          icon: '🍳' },
    { id: 'entrepreneurship', label: 'Entrepreneurship', icon: '💼' },
    { id: 'health-care',      label: 'Health Care',      icon: '🏥' },
    { id: 'arts-and-science', label: 'Arts & Science',   icon: '🎨' },
    { id: 'education',        label: 'Education',        icon: '📚' },
    { id: 'sports',           label: 'Sports',           icon: '⚽' },
    { id: 'current-affairs',  label: 'Current Affairs',  icon: '📰' },
  ];

  /* ──────────────────────────────────────────────────
     PODCAST DATA  (90 mock entries — 9 per category)
  ────────────────────────────────────────────────── */
  /* ── Your Results ── */
  var YOUR_RESULTS = [
    { id:'yr01', cat:'entertainment',    title:'Cinema Secrets',          creator:'Ramya Krishnan',   dur:'48 min', eps:32  },
    { id:'yr02', cat:'technology',       title:'Tech Talk Tamil',         creator:'Arun Kumar',       dur:'55 min', eps:87  },
    { id:'yr03', cat:'health-care',      title:'Nalvazhvu',               creator:'Dr. Meena',        dur:'40 min', eps:75  },
    { id:'yr04', cat:'entrepreneurship', title:'Startup Stories',         creator:'Raj Annamalai',    dur:'60 min', eps:92  },
    { id:'yr05', cat:'cooking',          title:'Kitchen Secrets',         creator:'Chef Santhi',      dur:'32 min', eps:65  },
    { id:'yr06', cat:'education',        title:'Learn Tamil Daily',       creator:'Tamil Mani',       dur:'20 min', eps:365 },
    { id:'yr07', cat:'sports',           title:'Cricket Corner',          creator:'Dhoni Fan Raj',    dur:'55 min', eps:110 },
    { id:'yr08', cat:'current-affairs',  title:'News Decoded Tamil',      creator:'Journalist Raj',   dur:'30 min', eps:500 },
    { id:'yr09', cat:'arts-and-science', title:'Curiosity Lab',           creator:'Prof. Anand',      dur:'50 min', eps:48  },
    { id:'yr10', cat:'technology',       title:'AI Explained',            creator:'Priya Natarajan',  dur:'38 min', eps:30  },
    { id:'yr11', cat:'entertainment',    title:'Kollywood Buzz',          creator:'Priya Nair',       dur:'38 min', eps:60  },
    { id:'yr12', cat:'health-care',      title:'Mental Health Talks',     creator:'Dr. Kavitha',      dur:'55 min', eps:40  },
    { id:'yr13', cat:'entrepreneurship', title:'Founders Unplugged',      creator:'Kavitha Siva',     dur:'72 min', eps:45  },
    { id:'yr14', cat:'cooking',          title:'Spice Route',             creator:'Balu Ravi',        dur:'40 min', eps:33  },
    { id:'yr15', cat:'sports',           title:'Football Weekly',         creator:'Messi Tamil',      dur:'48 min', eps:82  },
    { id:'yr16', cat:'education',        title:'UPSC Tamil Prep',         creator:'IAS Siva',         dur:'60 min', eps:100 },
    { id:'yr17', cat:'current-affairs',  title:'Tamil Politics Explained',creator:'Policy Siva',      dur:'45 min', eps:200 },
    { id:'yr18', cat:'arts-and-science', title:'Tamil Literature',        creator:'Kaviya Selvi',     dur:'65 min', eps:30  },
    { id:'yr19', cat:'technology',       title:'Startup Stack',           creator:'Vikram Sasi',      dur:'60 min', eps:45  },
    { id:'yr20', cat:'entertainment',    title:'OTT Roundup',             creator:'Divya Menon',      dur:'45 min', eps:36  },
  ];

  var COVERS = [
    'assets/podcast-cover1.png',
    'assets/podcast-cover2.png',
    'assets/podcast-cover3.png',
    'assets/podcast-cover4.png',
    'assets/podcast-cover5.png',
  ];

  function cv(i) { return COVERS[i % COVERS.length]; }

  var ALL_PODCASTS = [
    /* ── Entertainment ── */
    { id: 'e1',  cat: 'entertainment',    title: 'Cinema Secrets',         creator: 'Ramya Krishnan',  dur: '48 min',  eps: 32  },
    { id: 'e2',  cat: 'entertainment',    title: 'Drama Unlimited',        creator: 'Senthil Kumar',   dur: '55 min',  eps: 44  },
    { id: 'e3',  cat: 'entertainment',    title: 'Kollywood Buzz',         creator: 'Priya Nair',      dur: '38 min',  eps: 60  },
    { id: 'e4',  cat: 'entertainment',    title: 'Silver Screen Stories',  creator: 'Arun Vijay',      dur: '42 min',  eps: 27  },
    { id: 'e5',  cat: 'entertainment',    title: 'Reel Talk',              creator: 'Malar Selvan',    dur: '31 min',  eps: 18  },
    { id: 'e6',  cat: 'entertainment',    title: 'Celebrity Deep Dive',    creator: 'Karthik Rajan',   dur: '60 min',  eps: 50  },
    { id: 'e7',  cat: 'entertainment',    title: 'OTT Roundup',            creator: 'Divya Menon',     dur: '45 min',  eps: 36  },
    { id: 'e8',  cat: 'entertainment',    title: 'Tollywood Tonight',      creator: 'Venkat Iyer',     dur: '52 min',  eps: 24  },
    { id: 'e9',  cat: 'entertainment',    title: 'Box Office Weekly',      creator: 'Sindhu Priya',    dur: '28 min',  eps: 72  },
    { id: 'e10', cat: 'entertainment',    title: 'Behind the Director',    creator: 'Ravi Shankar',    dur: '65 min',  eps: 15  },
    { id: 'e11', cat: 'entertainment',    title: 'Cine Conversations',     creator: 'Anitha Lakshmi',  dur: '50 min',  eps: 40  },
    { id: 'e12', cat: 'entertainment',    title: 'Tamil Cinema History',   creator: 'Muthu Vel',       dur: '70 min',  eps: 22  },

    /* ── Technology ── */
    { id: 't1',  cat: 'technology',       title: 'Tech Talk Tamil',        creator: 'Arun Kumar',      dur: '55 min',  eps: 87  },
    { id: 't2',  cat: 'technology',       title: 'Code & Coffee',          creator: 'Suresh Dev',      dur: '42 min',  eps: 54  },
    { id: 't3',  cat: 'technology',       title: 'AI Explained',           creator: 'Priya Natarajan', dur: '38 min',  eps: 30  },
    { id: 't4',  cat: 'technology',       title: 'Startup Stack',          creator: 'Vikram Sasi',     dur: '60 min',  eps: 45  },
    { id: 't5',  cat: 'technology',       title: 'Digital Future',         creator: 'Kavitha Raj',     dur: '47 min',  eps: 66  },
    { id: 't6',  cat: 'technology',       title: 'Cyber Weekly',           creator: 'Dinesh Babu',     dur: '35 min',  eps: 120 },
    { id: 't7',  cat: 'technology',       title: 'Developer Diaries',      creator: 'Santhosh Pillai', dur: '50 min',  eps: 38  },
    { id: 't8',  cat: 'technology',       title: 'Cloud Corner',           creator: 'Usha Kannan',     dur: '44 min',  eps: 29  },
    { id: 't9',  cat: 'technology',       title: 'Product Mindset',        creator: 'Kiran Thiagaraj', dur: '58 min',  eps: 51  },
    { id: 't10', cat: 'technology',       title: 'Tamil Tech Daily',       creator: 'Meena Arjun',     dur: '30 min',  eps: 200 },
    { id: 't11', cat: 'technology',       title: 'Biotech Bytes',          creator: 'Dr. Rajan K',     dur: '62 min',  eps: 17  },
    { id: 't12', cat: 'technology',       title: 'Web3 in Tamil',          creator: 'Prem Kannan',     dur: '45 min',  eps: 24  },

    /* ── Cooking ── */
    { id: 'c1',  cat: 'cooking',          title: 'Kitchen Secrets',        creator: 'Chef Santhi',     dur: '32 min',  eps: 65  },
    { id: 'c2',  cat: 'cooking',          title: 'Tamil Samayal Stories',  creator: 'Latha Devi',      dur: '28 min',  eps: 42  },
    { id: 'c3',  cat: 'cooking',          title: 'Spice Route',            creator: 'Balu Ravi',       dur: '40 min',  eps: 33  },
    { id: 'c4',  cat: 'cooking',          title: 'Flavours of the South',  creator: 'Geetha Krishnan', dur: '35 min',  eps: 50  },
    { id: 'c5',  cat: 'cooking',          title: 'Healthy Tamil Kitchen',  creator: 'Dr. Preethi',     dur: '25 min',  eps: 80  },
    { id: 'c6',  cat: 'cooking',          title: 'Street Food Diaries',    creator: 'Vijay Kumar',     dur: '45 min',  eps: 28  },
    { id: 'c7',  cat: 'cooking',          title: 'Traditional Recipes',    creator: 'Saraswathi N',    dur: '50 min',  eps: 36  },
    { id: 'c8',  cat: 'cooking',          title: 'Chef Stories',           creator: 'Mani Pillai',     dur: '38 min',  eps: 22  },
    { id: 'c9',  cat: 'cooking',          title: 'Plant Based Tamil',      creator: 'Lavanya Sri',     dur: '30 min',  eps: 44  },
    { id: 'c10', cat: 'cooking',          title: 'Baking Basics Tamil',    creator: 'Rose Mary',       dur: '42 min',  eps: 18  },
    { id: 'c11', cat: 'cooking',          title: 'Restaurant Revealed',    creator: 'Chef Anand',      dur: '55 min',  eps: 25  },
    { id: 'c12', cat: 'cooking',          title: 'Food Science Tamil',     creator: 'Dr. Lakshmi',     dur: '48 min',  eps: 14  },

    /* ── Entrepreneurship ── */
    { id: 'n1',  cat: 'entrepreneurship', title: 'Startup Stories',        creator: 'Raj Annamalai',   dur: '60 min',  eps: 92  },
    { id: 'n2',  cat: 'entrepreneurship', title: 'Founders Unplugged',     creator: 'Kavitha Siva',    dur: '72 min',  eps: 45  },
    { id: 'n3',  cat: 'entrepreneurship', title: 'Business Insights',      creator: 'Siva Rajendran',  dur: '50 min',  eps: 68  },
    { id: 'n4',  cat: 'entrepreneurship', title: 'Scale Up Tamil',         creator: 'Nithya Priya',    dur: '44 min',  eps: 37  },
    { id: 'n5',  cat: 'entrepreneurship', title: 'Invest Tamil',           creator: 'Karthik Anand',   dur: '38 min',  eps: 55  },
    { id: 'n6',  cat: 'entrepreneurship', title: 'Hustle & Build',         creator: 'Sathya Kumar',    dur: '65 min',  eps: 29  },
    { id: 'n7',  cat: 'entrepreneurship', title: 'Brand Building',         creator: 'Meena Sunder',    dur: '48 min',  eps: 40  },
    { id: 'n8',  cat: 'entrepreneurship', title: 'Social Enterprise',      creator: 'Bala Murugan',    dur: '55 min',  eps: 22  },
    { id: 'n9',  cat: 'entrepreneurship', title: 'Zero to One Tamil',      creator: 'Priya Venkat',    dur: '80 min',  eps: 18  },
    { id: 'n10', cat: 'entrepreneurship', title: 'SME Success Stories',    creator: 'Ragu Nathan',     dur: '42 min',  eps: 60  },
    { id: 'n11', cat: 'entrepreneurship', title: 'Product Launch Tamil',   creator: 'Valli Arumugam',  dur: '35 min',  eps: 31  },
    { id: 'n12', cat: 'entrepreneurship', title: 'Angel Investors Talk',   creator: 'Mr. Selvam',      dur: '90 min',  eps: 12  },

    /* ── Health Care ── */
    { id: 'h1',  cat: 'health-care',      title: 'Nalvazhvu',              creator: 'Dr. Meena',       dur: '40 min',  eps: 75  },
    { id: 'h2',  cat: 'health-care',      title: 'Mind & Body Tamil',      creator: 'Suresh Raj',      dur: '35 min',  eps: 50  },
    { id: 'h3',  cat: 'health-care',      title: 'Fitness Facts',          creator: 'Trainer Vijay',   dur: '28 min',  eps: 88  },
    { id: 'h4',  cat: 'health-care',      title: 'Mental Health Talks',    creator: 'Dr. Kavitha',     dur: '55 min',  eps: 40  },
    { id: 'h5',  cat: 'health-care',      title: 'Siddha Stories',         creator: 'Vaidhya Rajan',   dur: '60 min',  eps: 24  },
    { id: 'h6',  cat: 'health-care',      title: 'Women Health Tamil',     creator: 'Dr. Geetha',      dur: '45 min',  eps: 36  },
    { id: 'h7',  cat: 'health-care',      title: 'Yoga Unwrapped',         creator: 'Yoga Malathi',    dur: '30 min',  eps: 62  },
    { id: 'h8',  cat: 'health-care',      title: 'Nutrition Notes',        creator: 'Dietitian Priya', dur: '32 min',  eps: 44  },
    { id: 'h9',  cat: 'health-care',      title: 'Parenting Health',       creator: 'Dr. Anand',       dur: '48 min',  eps: 30  },
    { id: 'h10', cat: 'health-care',      title: 'Ayurveda Tamil',         creator: 'Vaidya Murugan',  dur: '65 min',  eps: 20  },
    { id: 'h11', cat: 'health-care',      title: 'Senior Wellness',        creator: 'Dr. Lalitha',     dur: '38 min',  eps: 27  },
    { id: 'h12', cat: 'health-care',      title: 'Child Nutrition',        creator: 'Dr. Ramya',       dur: '42 min',  eps: 33  },

    /* ── Arts & Science ── */
    { id: 'a1',  cat: 'arts-and-science', title: 'Curiosity Lab',          creator: 'Prof. Anand',     dur: '50 min',  eps: 48  },
    { id: 'a2',  cat: 'arts-and-science', title: 'Tamil Literature',       creator: 'Kaviya Selvi',    dur: '65 min',  eps: 30  },
    { id: 'a3',  cat: 'arts-and-science', title: 'Classical Music Talks',  creator: 'Maestro Iyer',    dur: '72 min',  eps: 18  },
    { id: 'a4',  cat: 'arts-and-science', title: 'Science Universe',       creator: 'Selva Nathan',    dur: '45 min',  eps: 55  },
    { id: 'a5',  cat: 'arts-and-science', title: 'Photography Tamil',      creator: 'Lens Karthik',    dur: '38 min',  eps: 40  },
    { id: 'a6',  cat: 'arts-and-science', title: 'Theatre Behind Scenes',  creator: 'Drama Devi',      dur: '55 min',  eps: 22  },
    { id: 'a7',  cat: 'arts-and-science', title: 'Space Tamil',            creator: 'Astro Deepak',    dur: '60 min',  eps: 36  },
    { id: 'a8',  cat: 'arts-and-science', title: 'Folk Arts Decoded',      creator: 'Folk Pandian',    dur: '48 min',  eps: 27  },
    { id: 'a9',  cat: 'arts-and-science', title: 'Quantum Talks Tamil',    creator: 'Dr. Sekar',       dur: '80 min',  eps: 14  },
    { id: 'a10', cat: 'arts-and-science', title: 'Art & Soul',             creator: 'Priya Arts',      dur: '42 min',  eps: 32  },
    { id: 'a11', cat: 'arts-and-science', title: 'History Untold Tamil',   creator: 'Historian Ravi',  dur: '70 min',  eps: 25  },
    { id: 'a12', cat: 'arts-and-science', title: 'Biology Basics Tamil',   creator: 'Prof. Lakshmi',   dur: '35 min',  eps: 50  },

    /* ── Education ── */
    { id: 'd1',  cat: 'education',        title: 'Learn Tamil Daily',      creator: 'Tamil Mani',      dur: '20 min',  eps: 365 },
    { id: 'd2',  cat: 'education',        title: 'UPSC Tamil Prep',        creator: 'IAS Siva',        dur: '60 min',  eps: 100 },
    { id: 'd3',  cat: 'education',        title: 'Reading Revolution',     creator: 'Bookworm Meena',  dur: '35 min',  eps: 55  },
    { id: 'd4',  cat: 'education',        title: 'JEE in Tamil',           creator: 'Tutor Arjun',     dur: '50 min',  eps: 80  },
    { id: 'd5',  cat: 'education',        title: 'Career Guide Tamil',     creator: 'Counselor Raj',   dur: '40 min',  eps: 60  },
    { id: 'd6',  cat: 'education',        title: 'Spoken English Tamil',   creator: 'English Devi',    dur: '25 min',  eps: 120 },
    { id: 'd7',  cat: 'education',        title: 'Finance for Everyone',   creator: 'Money Murugan',   dur: '38 min',  eps: 45  },
    { id: 'd8',  cat: 'education',        title: 'Study Smarter',          creator: 'Study Guru',      dur: '30 min',  eps: 72  },
    { id: 'd9',  cat: 'education',        title: 'Competitive Tamil',      creator: 'Prof. Kumar',     dur: '55 min',  eps: 90  },
    { id: 'd10', cat: 'education',        title: 'Tamil Grammar Deep',     creator: 'Tamil Scholar',   dur: '45 min',  eps: 38  },
    { id: 'd11', cat: 'education',        title: 'School of Life',         creator: 'Wisdom Vel',      dur: '42 min',  eps: 50  },
    { id: 'd12', cat: 'education',        title: 'Science for Kids Tamil', creator: 'Kiddo Priya',     dur: '18 min',  eps: 150 },

    /* ── Sports ── */
    { id: 's1',  cat: 'sports',           title: 'Cricket Corner',         creator: 'Dhoni Fan Raj',   dur: '55 min',  eps: 110 },
    { id: 's2',  cat: 'sports',           title: 'Tamil Kabaddi',          creator: 'Kabaddi Murugan', dur: '40 min',  eps: 35  },
    { id: 's3',  cat: 'sports',           title: 'Football Weekly',        creator: 'Messi Tamil',     dur: '48 min',  eps: 82  },
    { id: 's4',  cat: 'sports',           title: 'Chess Talks Tamil',      creator: 'Anand Follower',  dur: '60 min',  eps: 44  },
    { id: 's5',  cat: 'sports',           title: 'Athletics Uncovered',    creator: 'Sprint Siva',     dur: '38 min',  eps: 28  },
    { id: 's6',  cat: 'sports',           title: 'Badminton Stories',      creator: 'Rally Rajan',     dur: '42 min',  eps: 36  },
    { id: 's7',  cat: 'sports',           title: 'Sports Psychology',      creator: 'Coach Deepa',     dur: '50 min',  eps: 24  },
    { id: 's8',  cat: 'sports',           title: 'IPL Breakdown Tamil',    creator: 'IPL Nithya',      dur: '65 min',  eps: 60  },
    { id: 's9',  cat: 'sports',           title: 'Fitness & Athletes',     creator: 'Iron Body Vel',   dur: '45 min',  eps: 47  },
    { id: 's10', cat: 'sports',           title: 'Tamil Hockey',           creator: 'Stick Selvan',    dur: '35 min',  eps: 18  },
    { id: 's11', cat: 'sports',           title: 'Olympic Dreams Tamil',   creator: 'Olympic Priya',   dur: '55 min',  eps: 22  },
    { id: 's12', cat: 'sports',           title: 'Motor Sports Tamil',     creator: 'Speed Karthik',   dur: '48 min',  eps: 15  },

    /* ── Current Affairs ── */
    { id: 'ca1',  cat: 'current-affairs', title: 'News Decoded Tamil',     creator: 'Journalist Raj',  dur: '30 min',  eps: 500 },
    { id: 'ca2',  cat: 'current-affairs', title: 'Tamil Politics Explained', creator: 'Policy Siva',   dur: '45 min',  eps: 200 },
    { id: 'ca3',  cat: 'current-affairs', title: 'World This Week',        creator: 'Globe Meena',     dur: '38 min',  eps: 130 },
    { id: 'ca4',  cat: 'current-affairs', title: 'Economy Watch Tamil',    creator: 'Eco Anand',       dur: '50 min',  eps: 90  },
    { id: 'ca5',  cat: 'current-affairs', title: 'Environment Tamil',      creator: 'Green Geetha',    dur: '35 min',  eps: 65  },
    { id: 'ca6',  cat: 'current-affairs', title: 'Social Issues Decoded',  creator: 'Justice Kumar',   dur: '55 min',  eps: 75  },
    { id: 'ca7',  cat: 'current-affairs', title: 'Science News Tamil',     creator: 'Sci Rajan',       dur: '28 min',  eps: 180 },
    { id: 'ca8',  cat: 'current-affairs', title: 'Budget Explained Tamil', creator: 'CA Murugan',      dur: '60 min',  eps: 12  },
    { id: 'ca9',  cat: 'current-affairs', title: 'Law & Order Tamil',      creator: 'Advocate Priya',  dur: '65 min',  eps: 40  },
    { id: 'ca10', cat: 'current-affairs', title: 'Global Tamil Voice',     creator: 'Diaspora Raj',    dur: '45 min',  eps: 55  },
    { id: 'ca11', cat: 'current-affairs', title: 'Geopolitics Tamil',      creator: 'Scholar Divya',   dur: '70 min',  eps: 28  },
    { id: 'ca12', cat: 'current-affairs', title: 'Digital Rights Tamil',   creator: 'Tech Policy Dev', dur: '42 min',  eps: 20  },
  ];

  /* ──────────────────────────────────────────────────
     STATE
  ────────────────────────────────────────────────── */
  var activeCategory = 'all';
  var currentPage    = 1;  // number of PAGE_SIZE batches shown

  /* ──────────────────────────────────────────────────
     HELPERS
  ────────────────────────────────────────────────── */
  /** Normalise a raw URL param / category name to an id */
  function normaliseCat(raw) {
    if (!raw) return 'all';
    var lower = raw.toLowerCase().replace(/\s+/g, '-')
                   .replace(/&/g, 'and')
                   .replace(/[^a-z0-9-]/g, '');
    // Handle common aliases
    var aliases = {
      'health-care': 'health-care',
      'healthcare':  'health-care',
      'arts-science': 'arts-and-science',
      'arts---science': 'arts-and-science',
      'current-affairs': 'current-affairs',
    };
    if (aliases[lower]) return aliases[lower];
    // Check exact CATEGORIES id match
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].id === lower) return lower;
    }
    return 'all';
  }

  function getCategoryLabel(id) {
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].id === id) return CATEGORIES[i].label;
    }
    return 'All';
  }

  function getFilteredPodcasts() {
    if (activeCategory === 'your-results') return YOUR_RESULTS;
    if (activeCategory === 'all') return ALL_PODCASTS;
    return ALL_PODCASTS.filter(function (p) { return p.cat === activeCategory; });
  }

  function buildCard(p, index) {
    var imgSrc = cv(index);
    return makeContentCard({
      type:    'series',
      id:      p.id,
      img:     imgSrc,
      title:   p.title,
      creator: p.creator,
      extra:   { label: p.dur + ' · ' + getCategoryLabel(p.cat) },
    });
  }

  /* ──────────────────────────────────────────────────
     RENDER: TABS
  ────────────────────────────────────────────────── */
  function renderTabs() {
    var container = document.getElementById('psr-tabs');
    if (!container) return;
    container.innerHTML = CATEGORIES.map(function (cat) {
      var active = cat.id === activeCategory ? ' active' : '';
      return '<button class="psr-tab-btn' + active + '" data-cat="' + cat.id + '">'
           + cat.icon + ' ' + cat.label
           + '</button>';
    }).join('');

    container.querySelectorAll('.psr-tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var newCat = btn.getAttribute('data-cat');
        if (newCat === activeCategory) return;
        activeCategory = newCat;
        currentPage    = 1;
        renderTabs();
        renderGrid(true);
        updateHeader();
        // Update URL param without page reload
        var url = new URL(window.location.href);
        if (newCat === 'all') {
          url.searchParams.delete('category');
        } else {
          url.searchParams.set('category', newCat);
        }
        window.history.replaceState(null, '', url.toString());
      });
    });
  }

  /* ──────────────────────────────────────────────────
     RENDER: HEADER
  ────────────────────────────────────────────────── */
  function updateHeader() {
    var heading = document.getElementById('psr-heading');
    var subtext = document.getElementById('psr-subtext');
    if (!heading || !subtext) return;
    if (activeCategory === 'your-results') {
      heading.textContent = 'Your Results';
      subtext.textContent = 'Personalised picks based on your listening history';
    } else {
      var label = getCategoryLabel(activeCategory);
      heading.textContent = activeCategory === 'all' ? 'All Podcasts' : label + ' Podcasts';
      subtext.textContent = activeCategory === 'all'
        ? 'Showing results based on your search'
        : 'Showing results for: ' + label;
    }
  }

  /* ──────────────────────────────────────────────────
     RENDER: GRID
  ────────────────────────────────────────────────── */
  function renderGrid(reset) {
    var grid   = document.getElementById('psr-grid');
    var btnLM  = document.getElementById('psr-load-more');
    if (!grid) return;

    var filtered = getFilteredPodcasts();
    var total    = filtered.length;
    var shown    = currentPage * PAGE_SIZE;

    if (reset) grid.innerHTML = '';

    // Slice the new batch
    var start = reset ? 0 : (currentPage - 1) * PAGE_SIZE;
    var batch  = filtered.slice(start, shown);

    if (batch.length === 0 && grid.children.length === 0) {
      grid.innerHTML = '<div class="psr-empty"><i class="fa-solid fa-podcast"></i><p>No podcasts found in this category.</p></div>';
    } else {
      batch.forEach(function (p, i) {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = buildCard(p, start + i);
        var card = wrapper.firstElementChild;
        grid.appendChild(card);
      });
    }

    // Load More button visibility
    if (btnLM) {
      if (shown >= total) {
        btnLM.disabled = true;
        btnLM.textContent = 'No More Podcasts';
      } else {
        btnLM.disabled = false;
        btnLM.textContent = 'Load More';
      }
    }
  }

  /* ──────────────────────────────────────────────────
     LOAD MORE
  ────────────────────────────────────────────────── */
  function initLoadMore() {
    var btn = document.getElementById('psr-load-more');
    if (!btn) return;
    btn.addEventListener('click', function () {
      currentPage++;
      renderGrid(false);
    });
  }

  /* ──────────────────────────────────────────────────
     INIT
  ────────────────────────────────────────────────── */
  function init() {
    // Read ?category= from URL
    var params = new URLSearchParams(window.location.search);
    var rawCat = params.get('category') || '';
    activeCategory = normaliseCat(rawCat);
    currentPage    = 1;

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

})();
