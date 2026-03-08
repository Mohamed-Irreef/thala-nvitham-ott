(function () {
  'use strict';

  /* ── Image pool ── */
  var PC = ['assets/podcast-cover1.png','assets/podcast-cover2.png','assets/podcast-cover3.png','assets/podcast-cover4.png','assets/podcast-cover5.png'];
  function cv(i) { return PC[i % PC.length]; }

  /* ─────────────────────────────────────────────────
     DATA  (20 items per tab)
  ───────────────────────────────────────────────── */
  var TECHNOLOGY = [
    {id:'pt01', title:'Tech Talk Tamil',          creator:'Arun Kumar',       dur:'55 min', eps:87  },
    {id:'pt02', title:'Code & Coffee',            creator:'Suresh Dev',       dur:'42 min', eps:54  },
    {id:'pt03', title:'AI Explained',             creator:'Priya Natarajan',  dur:'38 min', eps:30  },
    {id:'pt04', title:'Startup Stack',            creator:'Vikram Sasi',      dur:'60 min', eps:45  },
    {id:'pt05', title:'Digital Future',           creator:'Kavitha Raj',      dur:'47 min', eps:66  },
    {id:'pt06', title:'Cyber Weekly',             creator:'Dinesh Babu',      dur:'35 min', eps:120 },
    {id:'pt07', title:'Developer Diaries',        creator:'Santhosh Pillai',  dur:'50 min', eps:38  },
    {id:'pt08', title:'Cloud Corner',             creator:'Usha Kannan',      dur:'44 min', eps:29  },
    {id:'pt09', title:'Product Mindset',          creator:'Kiran Thiagaraj',  dur:'58 min', eps:51  },
    {id:'pt10', title:'Tamil Tech Daily',         creator:'Meena Arjun',      dur:'30 min', eps:200 },
    {id:'pt11', title:'Biotech Bytes',            creator:'Dr. Rajan K',      dur:'62 min', eps:17  },
    {id:'pt12', title:'Web3 in Tamil',            creator:'Prem Kannan',      dur:'45 min', eps:24  },
    {id:'pt13', title:'Mobile Dev Tamil',         creator:'App Suresh',       dur:'40 min', eps:32  },
    {id:'pt14', title:'Data Science Talks',       creator:'Analytics Raj',    dur:'52 min', eps:28  },
    {id:'pt15', title:'Open Source Stories',      creator:'Github Geetha',    dur:'36 min', eps:41  },
    {id:'pt16', title:'UX Design Tamil',          creator:'Design Devi',      dur:'45 min', eps:22  },
    {id:'pt17', title:'DevOps Watch',             creator:'Pipeline Pavan',   dur:'48 min', eps:35  },
    {id:'pt18', title:'Robotics Tamil',           creator:'Bot Balu',         dur:'55 min', eps:18  },
    {id:'pt19', title:'Cybersecurity Tamil',      creator:'Security Siva',    dur:'60 min', eps:25  },
    {id:'pt20', title:'Tamil Coders Podcast',     creator:'Stack Selvan',     dur:'38 min', eps:60  },
  ];

  var ENTREPRENEURSHIP = [
    {id:'pe01', title:'Startup Stories',          creator:'Raj Annamalai',    dur:'60 min', eps:92  },
    {id:'pe02', title:'Founders Unplugged',       creator:'Kavitha Siva',     dur:'72 min', eps:45  },
    {id:'pe03', title:'Business Insights',        creator:'Siva Rajendran',   dur:'50 min', eps:68  },
    {id:'pe04', title:'Scale Up Tamil',           creator:'Nithya Priya',     dur:'44 min', eps:37  },
    {id:'pe05', title:'Invest Tamil',             creator:'Karthik Anand',    dur:'38 min', eps:55  },
    {id:'pe06', title:'Hustle & Build',           creator:'Sathya Kumar',     dur:'65 min', eps:29  },
    {id:'pe07', title:'Brand Building',           creator:'Meena Sunder',     dur:'48 min', eps:40  },
    {id:'pe08', title:'Social Enterprise',        creator:'Bala Murugan',     dur:'55 min', eps:22  },
    {id:'pe09', title:'Zero to One Tamil',        creator:'Priya Venkat',     dur:'80 min', eps:18  },
    {id:'pe10', title:'SME Success Stories',      creator:'Ragu Nathan',      dur:'42 min', eps:60  },
    {id:'pe11', title:'Product Launch Tamil',     creator:'Valli Arumugam',   dur:'35 min', eps:31  },
    {id:'pe12', title:'Angel Investors Talk',     creator:'Mr. Selvam',       dur:'90 min', eps:12  },
    {id:'pe13', title:'VC Conversations Tamil',   creator:'Venture Vikas',    dur:'70 min', eps:20  },
    {id:'pe14', title:'Franchise Tamil',          creator:'Franchise Ravi',   dur:'45 min', eps:28  },
    {id:'pe15', title:'Export Business Tamil',    creator:'Trade Thilagam',   dur:'55 min', eps:16  },
    {id:'pe16', title:'Women in Business',        creator:'Shakti Sundar',    dur:'52 min', eps:35  },
    {id:'pe17', title:'Marketing Tamil',          creator:'Brand Balaji',     dur:'40 min', eps:44  },
    {id:'pe18', title:'Finance for Founders',     creator:'CA Krishnan',      dur:'48 min', eps:30  },
    {id:'pe19', title:'E-Commerce Tamil',         creator:'Shopify Santhosh', dur:'38 min', eps:50  },
    {id:'pe20', title:'Bootstrapper Diaries',     creator:'Solo Suresh',      dur:'60 min', eps:24  },
  ];

  var HEALTHCARE = [
    {id:'ph01', title:'Nalvazhvu',                creator:'Dr. Meena',        dur:'40 min', eps:75  },
    {id:'ph02', title:'Mind & Body Tamil',        creator:'Suresh Raj',       dur:'35 min', eps:50  },
    {id:'ph03', title:'Fitness Facts',            creator:'Trainer Vijay',    dur:'28 min', eps:88  },
    {id:'ph04', title:'Mental Health Talks',      creator:'Dr. Kavitha',      dur:'55 min', eps:40  },
    {id:'ph05', title:'Siddha Stories',           creator:'Vaidhya Rajan',    dur:'60 min', eps:24  },
    {id:'ph06', title:'Women Health Tamil',       creator:'Dr. Geetha',       dur:'45 min', eps:36  },
    {id:'ph07', title:'Yoga Unwrapped',           creator:'Yoga Malathi',     dur:'30 min', eps:62  },
    {id:'ph08', title:'Nutrition Notes',          creator:'Dietitian Priya',  dur:'32 min', eps:44  },
    {id:'ph09', title:'Parenting Health',         creator:'Dr. Anand',        dur:'48 min', eps:30  },
    {id:'ph10', title:'Ayurveda Tamil',           creator:'Vaidya Murugan',   dur:'65 min', eps:20  },
    {id:'ph11', title:'Senior Wellness',          creator:'Dr. Lalitha',      dur:'38 min', eps:27  },
    {id:'ph12', title:'Child Nutrition',          creator:'Dr. Ramya',        dur:'42 min', eps:33  },
    {id:'ph13', title:'Diabetes Talk Tamil',      creator:'Dr. Krishnan',     dur:'35 min', eps:45  },
    {id:'ph14', title:'Skin & Hair Tamil',        creator:'Derma Devi',       dur:'28 min', eps:55  },
    {id:'ph15', title:'Sleep Health Tamil',       creator:'Sleep Dr. Ravi',   dur:'40 min', eps:20  },
    {id:'ph16', title:'Cardio Wellness',          creator:'Heart Dr. Kumar',  dur:'45 min', eps:30  },
    {id:'ph17', title:'Eye Care Tamil',           creator:'Dr. Padma',        dur:'30 min', eps:18  },
    {id:'ph18', title:'Gut Health Tamil',         creator:'Dr. Senthil',      dur:'38 min', eps:24  },
    {id:'ph19', title:'First Aid & Safety',       creator:'Paramedic Priya',  dur:'25 min', eps:40  },
    {id:'ph20', title:'Post Covid Care Tamil',    creator:'Dr. Nithya',       dur:'50 min', eps:15  },
  ];

  var ARTS_SCIENCE = [
    {id:'pa01', title:'Curiosity Lab',            creator:'Prof. Anand',      dur:'50 min', eps:48  },
    {id:'pa02', title:'Tamil Literature',         creator:'Kaviya Selvi',     dur:'65 min', eps:30  },
    {id:'pa03', title:'Classical Music Talks',    creator:'Maestro Iyer',     dur:'72 min', eps:18  },
    {id:'pa04', title:'Science Universe',         creator:'Selva Nathan',     dur:'45 min', eps:55  },
    {id:'pa05', title:'Photography Tamil',        creator:'Lens Karthik',     dur:'38 min', eps:40  },
    {id:'pa06', title:'Theatre Behind Scenes',    creator:'Drama Devi',       dur:'55 min', eps:22  },
    {id:'pa07', title:'Space Tamil',              creator:'Astro Deepak',     dur:'60 min', eps:36  },
    {id:'pa08', title:'Folk Arts Decoded',        creator:'Folk Pandian',     dur:'48 min', eps:27  },
    {id:'pa09', title:'Quantum Talks Tamil',      creator:'Dr. Sekar',        dur:'80 min', eps:14  },
    {id:'pa10', title:'Art & Soul',               creator:'Priya Arts',       dur:'42 min', eps:32  },
    {id:'pa11', title:'History Untold Tamil',     creator:'Historian Ravi',   dur:'70 min', eps:25  },
    {id:'pa12', title:'Biology Basics Tamil',     creator:'Prof. Lakshmi',    dur:'35 min', eps:50  },
    {id:'pa13', title:'Chemistry Stories',        creator:'Lab Lavanya',      dur:'40 min', eps:30  },
    {id:'pa14', title:'Drawing & Painting',       creator:'Artist Arumugam',  dur:'45 min', eps:22  },
    {id:'pa15', title:'Physics Explained',        creator:'Prof. Balaji',     dur:'55 min', eps:35  },
    {id:'pa16', title:'Ecology Tamil',            creator:'Nature Nithya',    dur:'38 min', eps:28  },
    {id:'pa17', title:'Ocean Science Tamil',      creator:'Marine Muthu',     dur:'50 min', eps:20  },
    {id:'pa18', title:'Film Making Tamil',        creator:'Director Deepa',   dur:'65 min', eps:16  },
    {id:'pa19', title:'Sculpture & Craft',        creator:'Artisan Siva',     dur:'42 min', eps:19  },
    {id:'pa20', title:'Maths for Everyone',       creator:'Numbers Nagesh',   dur:'30 min', eps:60  },
  ];

  var EDUCATION = [
    {id:'pd01', title:'Learn Tamil Daily',        creator:'Tamil Mani',       dur:'20 min', eps:365 },
    {id:'pd02', title:'UPSC Tamil Prep',          creator:'IAS Siva',         dur:'60 min', eps:100 },
    {id:'pd03', title:'Reading Revolution',       creator:'Bookworm Meena',   dur:'35 min', eps:55  },
    {id:'pd04', title:'JEE in Tamil',             creator:'Tutor Arjun',      dur:'50 min', eps:80  },
    {id:'pd05', title:'Career Guide Tamil',       creator:'Counselor Raj',    dur:'40 min', eps:60  },
    {id:'pd06', title:'Spoken English Tamil',     creator:'English Devi',     dur:'25 min', eps:120 },
    {id:'pd07', title:'Finance for Everyone',     creator:'Money Murugan',    dur:'38 min', eps:45  },
    {id:'pd08', title:'Study Smarter',            creator:'Study Guru',       dur:'30 min', eps:72  },
    {id:'pd09', title:'Competitive Tamil',        creator:'Prof. Kumar',      dur:'55 min', eps:90  },
    {id:'pd10', title:'Tamil Grammar Deep',       creator:'Tamil Scholar',    dur:'45 min', eps:38  },
    {id:'pd11', title:'School of Life',           creator:'Wisdom Vel',       dur:'42 min', eps:50  },
    {id:'pd12', title:'Science for Kids Tamil',   creator:'Kiddo Priya',      dur:'18 min', eps:150 },
    {id:'pd13', title:'TNPSC Mastery',            creator:'TNPSC Trainer',    dur:'50 min', eps:80  },
    {id:'pd14', title:'English Grammar Tamil',    creator:'Grammar Ganesan',  dur:'25 min', eps:100 },
    {id:'pd15', title:'Memory Techniques',        creator:'Memory Master',    dur:'30 min', eps:40  },
    {id:'pd16', title:'Speed Reading Tamil',      creator:'Reader Ravi',      dur:'20 min', eps:28  },
    {id:'pd17', title:'College Prep Talk',        creator:'Counsellor Kavya', dur:'45 min', eps:35  },
    {id:'pd18', title:'Coding for Kids Tamil',    creator:'Kiddo Coder',      dur:'22 min', eps:60  },
    {id:'pd19', title:'Tamil Language Mastery',   creator:'Language Guru',    dur:'35 min', eps:90  },
    {id:'pd20', title:'Project Based Learning',   creator:'PBL Preethi',      dur:'40 min', eps:30  },
  ];

  var SPORTS = [
    {id:'ps01', title:'Cricket Corner',           creator:'Dhoni Fan Raj',    dur:'55 min', eps:110 },
    {id:'ps02', title:'Tamil Kabaddi',            creator:'Kabaddi Murugan',  dur:'40 min', eps:35  },
    {id:'ps03', title:'Football Weekly',          creator:'Messi Tamil',      dur:'48 min', eps:82  },
    {id:'ps04', title:'Chess Talks Tamil',        creator:'Anand Follower',   dur:'60 min', eps:44  },
    {id:'ps05', title:'Athletics Uncovered',      creator:'Sprint Siva',      dur:'38 min', eps:28  },
    {id:'ps06', title:'Badminton Stories',        creator:'Rally Rajan',      dur:'42 min', eps:36  },
    {id:'ps07', title:'Sports Psychology',        creator:'Coach Deepa',      dur:'50 min', eps:24  },
    {id:'ps08', title:'IPL Breakdown Tamil',      creator:'IPL Nithya',       dur:'65 min', eps:60  },
    {id:'ps09', title:'Fitness & Athletes',       creator:'Iron Body Vel',    dur:'45 min', eps:47  },
    {id:'ps10', title:'Tamil Hockey',             creator:'Stick Selvan',     dur:'35 min', eps:18  },
    {id:'ps11', title:'Olympic Dreams Tamil',     creator:'Olympic Priya',    dur:'55 min', eps:22  },
    {id:'ps12', title:'Motor Sports Tamil',       creator:'Speed Karthik',    dur:'48 min', eps:15  },
    {id:'ps13', title:'Basketball Tamil',         creator:'Hoops Hari',       dur:'40 min', eps:25  },
    {id:'ps14', title:'Swimming Stories',         creator:'Splash Sundari',   dur:'35 min', eps:20  },
    {id:'ps15', title:'Weightlifting Tamil',      creator:'Iron Illango',     dur:'45 min', eps:18  },
    {id:'ps16', title:'Volleyball Vibes',         creator:'Serve Saravanan',  dur:'38 min', eps:22  },
    {id:'ps17', title:'Cycling Tamil',            creator:'Pedal Pari',       dur:'42 min', eps:30  },
    {id:'ps18', title:'Wrestling World Tamil',    creator:'Kushti Kumar',     dur:'50 min', eps:16  },
    {id:'ps19', title:'Fan Zone Tamil',           creator:'Super Fan Ragu',   dur:'60 min', eps:80  },
    {id:'ps20', title:'Sports Nutrition Tamil',   creator:'Dietitian Dev',    dur:'30 min', eps:35  },
  ];

  var CURRENT_AFFAIRS = [
    {id:'pc01', title:'News Decoded Tamil',       creator:'Journalist Raj',   dur:'30 min', eps:500 },
    {id:'pc02', title:'Tamil Politics Explained', creator:'Policy Siva',      dur:'45 min', eps:200 },
    {id:'pc03', title:'World This Week',          creator:'Globe Meena',      dur:'38 min', eps:130 },
    {id:'pc04', title:'Economy Watch Tamil',      creator:'Eco Anand',        dur:'50 min', eps:90  },
    {id:'pc05', title:'Environment Tamil',        creator:'Green Geetha',     dur:'35 min', eps:65  },
    {id:'pc06', title:'Social Issues Decoded',    creator:'Justice Kumar',    dur:'55 min', eps:75  },
    {id:'pc07', title:'Science News Tamil',       creator:'Sci Rajan',        dur:'28 min', eps:180 },
    {id:'pc08', title:'Budget Explained Tamil',   creator:'CA Murugan',       dur:'60 min', eps:12  },
    {id:'pc09', title:'Law & Order Tamil',        creator:'Advocate Priya',   dur:'65 min', eps:40  },
    {id:'pc10', title:'Global Tamil Voice',       creator:'Diaspora Raj',     dur:'45 min', eps:55  },
    {id:'pc11', title:'Geopolitics Tamil',        creator:'Scholar Divya',    dur:'70 min', eps:28  },
    {id:'pc12', title:'Digital Rights Tamil',     creator:'Tech Policy Dev',  dur:'42 min', eps:20  },
    {id:'pc13', title:'Municipal News Tamil',     creator:'Local Lakshmi',    dur:'25 min', eps:150 },
    {id:'pc14', title:'India-China Watch',        creator:'Defence Durai',    dur:'55 min', eps:35  },
    {id:'pc15', title:'Agriculture News Tamil',   creator:'Farmer Sivam',     dur:'35 min', eps:80  },
    {id:'pc16', title:'Tamil Nadu Updates',       creator:'TN Reporter',      dur:'20 min', eps:300 },
    {id:'pc17', title:'Chennai City Stories',     creator:'City Selvi',       dur:'30 min', eps:120 },
    {id:'pc18', title:'Diplomatic Talks Tamil',   creator:'Diplomat Mala',    dur:'60 min', eps:22  },
    {id:'pc19', title:'Startup Policy Tamil',     creator:'Policy Prakash',   dur:'45 min', eps:18  },
    {id:'pc20', title:'Human Rights Tamil',       creator:'Rights Ramya',     dur:'50 min', eps:30  },
  ];

  var STORYTELLING = [
    {id:'pst01', title:'Ponnyin Selvan Audio',    creator:'Heritage Voice',   dur:'45 min', eps:50  },
    {id:'pst02', title:'Sivagami Sabatham',       creator:'Classic Narration',dur:'38 min', eps:30  },
    {id:'pst03', title:'Tamil Folklore Tales',    creator:'Folk Narrators',   dur:'22 min', eps:80  },
    {id:'pst04', title:'Vikramadithan Stories',   creator:'Story Master',     dur:'30 min', eps:48  },
    {id:'pst05', title:'Thirukkural Explained',   creator:'Scholar Sundaram', dur:'18 min', eps:133 },
    {id:'pst06', title:'Ilamaiyil Oru Kaathal',   creator:'Sujatha Tamil',    dur:'55 min', eps:12  },
    {id:'pst07', title:'Puranam Stories Tamil',   creator:'Temple Stories',   dur:'28 min', eps:60  },
    {id:'pst08', title:'Tamil Epics Retold',      creator:'Epic Voice',       dur:'35 min', eps:40  },
    {id:'pst09', title:'Bedtime Tamil Stories',   creator:'Kids Narration',   dur:'15 min', eps:200 },
    {id:'pst10', title:'Mahabharatam Tamil',      creator:'Classical Voice',  dur:'60 min', eps:25  },
    {id:'pst11', title:'Mystery Tamil',           creator:'Scary Voice',      dur:'25 min', eps:55  },
    {id:'pst12', title:'Love Stories Tamil Nadu', creator:'Romantic Tales',   dur:'32 min', eps:35  },
    {id:'pst13', title:'Detective Vikram',        creator:'Mystery Narration',dur:'40 min', eps:30  },
    {id:'pst14', title:'Manimekalai Audio',       creator:'Classical Scholar',dur:'50 min', eps:18  },
    {id:'pst15', title:'Cheran Stories',          creator:'History Narrators',dur:'20 min', eps:22  },
    {id:'pst16', title:'Short Stories Tamil',     creator:'Sundara Ramasamy', dur:'12 min', eps:100 },
    {id:'pst17', title:'Ramayanam Audio',         creator:'Devotional Voice', dur:'55 min', eps:20  },
    {id:'pst18', title:'Valluvar Varalaru',       creator:'Scholar Murugan',  dur:'42 min', eps:15  },
    {id:'pst19', title:'Science Fiction Tamil',   creator:'SciFi Narrators',  dur:'35 min', eps:28  },
    {id:'pst20', title:'Horror Nights Tamil',     creator:'Dark Narrator',    dur:'30 min', eps:44  },
  ];

  /* ─────────────────────────────────────────────────
     TAB POOLS
  ───────────────────────────────────────────────── */
  var TAB_POOLS = {
    'technology':       { items: TECHNOLOGY,      label: 'Technology'      },
    'entrepreneurship': { items: ENTREPRENEURSHIP, label: 'Entrepreneurship'},
    'health-care':      { items: HEALTHCARE,       label: 'Health Care'     },
    'arts-science':     { items: ARTS_SCIENCE,     label: 'Arts & Science'  },
    'education':        { items: EDUCATION,        label: 'Education'       },
    'sports':           { items: SPORTS,           label: 'Sports'          },
    'current-affairs':  { items: CURRENT_AFFAIRS,  label: 'Current Affairs' },
    'storytelling':     { items: STORYTELLING,     label: 'Storytelling'    },
  };

  /* ─────────────────────────────────────────────────
     CARD BUILDER
  ───────────────────────────────────────────────── */
  function buildTabCard(p, i) {
    return makeContentCard({
      type: 'series', id: p.id, img: cv(i), title: p.title,
      creator: p.creator, extra: { label: p.dur + ' · ' + p.eps + ' eps' },
    });
  }

  /* ─────────────────────────────────────────────────
     TAB SWITCHING + LOAD MORE
  ───────────────────────────────────────────────── */
  var activeTab = 'all';
  var tabPage   = 1;
  var PAGE_SIZE = 10;

  function renderTabGrid(reset) {
    var tabPanel = document.getElementById('podcast-tab-panel');
    if (!tabPanel) return;
    var pool = TAB_POOLS[activeTab];
    if (!pool) return;

    if (reset) {
      tabPage = 1;
      tabPanel.innerHTML =
        '<div class="tab-cards-grid" id="podcast-tab-grid"></div>' +
        '<div class="tab-load-more-wrap">' +
        '<button class="tab-load-more-btn" id="podcast-tab-load-more">Load More</button>' +
        '</div>';
      document.getElementById('podcast-tab-load-more').addEventListener('click', function () {
        tabPage++;
        renderTabGrid(false);
      });
    }

    var grid  = document.getElementById('podcast-tab-grid');
    var btn   = document.getElementById('podcast-tab-load-more');
    if (!grid) return;

    var items = pool.items;
    var start = (tabPage - 1) * PAGE_SIZE;
    var shown = tabPage * PAGE_SIZE;
    var batch = items.slice(start, shown);

    if (reset) {
      grid.innerHTML = batch.map(function (p, i) {
        return buildTabCard(p, i);
      }).join('');
    } else {
      batch.forEach(function (p, i) {
        grid.insertAdjacentHTML('beforeend', buildTabCard(p, start + i));
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
    var allSections = document.getElementById('podcast-all-sections');
    var tabPanel    = document.getElementById('podcast-tab-panel');

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
      row = document.getElementById('trendingPodcastsRow');
      if (row) row.innerHTML = get20(TRENDING.filter(function (c) {
        return c.type === 'series' || c.type === 'episode';
      })).map(function (c) { return makeContentCard(c); }).join('');
    }

    if (typeof NEW_RELEASES !== 'undefined') {
      row = document.getElementById('latestEpisodesRow');
      if (row) row.innerHTML = get20(NEW_RELEASES.filter(function (c) {
        return c.type === 'episode' || c.type === 'series';
      })).map(function (c) { return makeContentCard(c); }).join('');
    }

    if (typeof RECOMMENDED !== 'undefined') {
      row = document.getElementById('topShowsRow');
      if (row) row.innerHTML = get20(RECOMMENDED.filter(function (c) {
        return c.type === 'series' || c.type === 'episode';
      })).map(function (c) { return makeContentCard(c); }).join('');
    }

    if (typeof ORIGINALS !== 'undefined') {
      row = document.getElementById('featuredPodcastsRow');
      if (row) row.innerHTML = get20(ORIGINALS.filter(function (c) {
        return c.type === 'series' || c.type === 'episode';
      }).map(function (c) {
        return Object.assign({}, c, { creator: c.sub, extra: { premium: true, label: c.sub } });
      })).map(function (c) { return makeContentCard(c); }).join('');
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