/* =============================================================
   Thala Nivitham — cards.js
   Standardized card system: 5 content types, 220px, content-card
============================================================= */

/* ── Image pools ── */
const MC = ['assets/music-cover1.png','assets/music-cover2.png','assets/music-cover3.png','assets/music-cover4.png','assets/music-cover5.png'];
const PC = ['assets/podcast-cover1.png','assets/podcast-cover2.png','assets/podcast-cover3.png','assets/podcast-cover4.png','assets/podcast-cover5.png'];
const mc = i => MC[i % MC.length];
const pc = i => PC[i % PC.length];

/* ── URL builder ── */
function detailsUrl(params) {
  const isMultiTrack = ['playlist', 'album', 'series'].includes(params.type);
  const page = isMultiTrack ? 'details/playlist-details.html' : 'details/audio-details.html';
  return page + '?' + new URLSearchParams(params).toString();
}

/* ── Action icon set ── */
function actionIcons(actions) {
  const icons = {
    like:     ['fa-heart',       'Like'],
    save:     ['fa-bookmark',    'Save'],
    playlist: ['fa-plus',        'Add to Playlist'],
    share:    ['fa-share-nodes', 'Share'],
    info:     ['fa-circle-info', 'Info / Details'],
    library:  ['fa-layer-group', 'Add to Library'],
    follow:   ['fa-user-plus',   'Follow'],
    download: ['fa-download',    'Download'],
  };
  return actions.map(a => {
    const [icon, title] = icons[a] || ['fa-ellipsis', a];
    return `<button class="qa-btn" title="${title}"><i class="fa-solid ${icon} fa-xs"></i></button>`;
  }).join('');
}

/* ── Universal card factory ── */
function makeContentCard({ type, id, img, title, creator, extra, url }) {
  const href = url || detailsUrl({ type, id, title, creator, img });
  // parse "45 min · Technology" → dur / cat
  const labelParts = (extra.label || '').split(' · ');
  const dur = labelParts[0] || '';
  const cat = labelParts[1] || '';
  return `
<div class="content-card" data-type="${type}" onclick="window.location.href='${href}'">
  <div class="card-image">
    <img src="${img}" alt="${title}" loading="lazy"/>
    <div class="card-overlay">
      <button class="play-btn" onclick="event.stopPropagation()"><i class="fa-solid fa-play fa-sm"></i></button>
      <div class="card-actions">
        ${actionIcons(cardActions(type))}
      </div>
    </div>
    ${extra.premium ? '<div class="premium-badge">Premium</div>' : ''}
  </div>
  <div class="card-meta">
    <h3 class="card-title">${title}</h3>
    <div class="card-creator">${creator}</div>
    <div class="card-info">
      ${dur ? `<span>${dur}</span>` : ''}
      ${dur && cat ? `<span class="dot">•</span>` : ''}
      ${cat ? `<span>${cat}</span>` : ''}
    </div>
  </div>
</div>`;
}

/* ── Actions per type ── */
function cardActions(type) {
  const map = {
    song:     ['like', 'playlist', 'share', 'info'],
    episode:  ['save', 'playlist', 'share', 'info'],
    playlist: ['library', 'like', 'share', 'info'],
    album:    ['library', 'like', 'share', 'info'],
    series:   ['follow', 'save', 'share', 'info'],
  };
  return map[type] || ['like', 'share', 'info'];
}

/* ── Creator card ── */
function makeCreatorCard({ name, type, img, id }) {
  const href = detailsUrl({ type: 'creator', id, name, img });
  return `
<div class="creator-card" onclick="window.location.href='${href}'">
  <img class="creator-avatar" src="${img}" alt="${name}" loading="lazy"/>
  <div class="creator-name">${name}</div>
  <div class="creator-type">${type}</div>
  <div class="creator-hover-actions">
    <button class="btn-follow" onclick="event.stopPropagation()">Follow</button>
    <button class="btn-profile" onclick="event.stopPropagation()">Profile</button>
  </div>
</div>`;
}

/* ── Orig / Widescreen card ── */
function makeOrigCard({ title, sub, badge, img, type, id }) {
  const href = detailsUrl({ type: type || 'series', id, title, img });
  return `
<div class="orig-card" onclick="window.location.href='${href}'">
  <img src="${img}" alt="${title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform .35s"/>
  <div class="orig-overlay">
    <div class="orig-badge">${badge}</div>
    <div class="orig-title">${title}</div>
    <div class="orig-sub">${sub}</div>
  </div>
</div>`;
}

/* ── Continue Listening card (keep existing SVG thumbs) ── */
function makeContinueCard({ title, sub, progress, remaining, emoji, color }) {
  return `
<div class="continue-card">
  <svg class="continue-thumb" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="${color}"/><text x="50%" y="58%" font-size="28" text-anchor="middle">${emoji}</text></svg>
  <div class="continue-body">
    <div class="continue-title">${title}</div>
    <div class="continue-sub">${sub}</div>
    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${progress}%"></div></div>
    <div class="continue-time">${remaining} remaining</div>
  </div>
</div>`;
}

/* =============================================================
   SECTION DATA
============================================================= */

/* ── Trending Now ── */
const TRENDING = [
  { type:'series',  id:1,  img:pc(0), title:'Tech Nexus Tamil',  creator:'Arun Kumar',    extra:{ label:'45 min · Technology', premium:true  }},
  { type:'episode', id:2,  img:pc(1), title:'Kitchen Secrets',   creator:'Chef Senthil',  extra:{ label:'38 min · Cooking',    premium:false }},
  { type:'album',   id:3,  img:mc(2), title:'Startup Stories',   creator:'Priya Devi',    extra:{ label:'52 min · Business',   premium:true  }},
  { type:'song',    id:4,  img:mc(3), title:'Vandi Vandi',       creator:'MC Vetri',      extra:{ label:'4:22 · Rap',          premium:false }},
  { type:'song',    id:5,  img:mc(4), title:'Mazhaikalam BGM',   creator:'Ravi K.',       extra:{ label:'38 min · BGM',        premium:false }},
  { type:'episode', id:6,  img:pc(0), title:'Kadhal Ep.8',       creator:'Voice Collective',extra:{ label:'22 min · Storytelling',premium:true }},
  { type:'series',  id:7,  img:pc(1), title:'Sports Bytes',      creator:'Kumar S.',      extra:{ label:'30 min · Sports',     premium:false }},
  { type:'series',  id:8,  img:pc(2), title:'Health Talks',      creator:'Dr. Nalini',    extra:{ label:'42 min · Health',     premium:false }},
];

/* ── New Releases ── */
const NEW_RELEASES = [
  { type:'series',  id:10, img:pc(3), title:'AI Vilaiyaattu',    creator:'Arun Kumar',    extra:{ label:'55 min · Technology', premium:true  }},
  { type:'album',   id:11, img:mc(0), title:'Rooftop Sessions',  creator:'Kavi Rajan',    extra:{ label:'42 min · Music',      premium:false }},
  { type:'song',    id:12, img:mc(1), title:'Panneer Rap',        creator:'MC Raj',        extra:{ label:'3:45 · Rap',          premium:false }},
  { type:'episode', id:13, img:pc(4), title:'Vazhai Ilai',        creator:'Voice Collective',extra:{ label:'18 min · Storytelling',premium:true }},
  { type:'episode', id:14, img:pc(0), title:'Cine Vilaiyaattu',  creator:'Priya M.',      extra:{ label:'60 min · Entertainment',premium:false}},
  { type:'album',   id:15, img:mc(2), title:'Midnight Raaga',     creator:'Ravi K.',       extra:{ label:'48 min · Instrumental',premium:true }},
  { type:'song',    id:16, img:mc(3), title:'Iravil Mazhai',     creator:'Kumar S.',      extra:{ label:'4:10 · Songs',        premium:false }},
  { type:'series',  id:17, img:pc(1), title:'Naadu Podcast',     creator:'Dr. Nalini',    extra:{ label:'35 min · Health',     premium:false }},
  { type:'song',    id:18, img:mc(4), title:'Beat Drop Vol.4',   creator:'Hari Beats',    extra:{ label:'3:58 · Rap',          premium:true  }},
];

/* ── Popular Music ── */
const MUSIC = [
  { type:'song',    id:20, img:mc(0), title:'Unnai Naan',        creator:'Sid Sriram',    extra:{ label:'4:12 · Songs',        premium:false }},
  { type:'album',   id:21, img:mc(1), title:'Rooftop Sessions',  creator:'Full Album',    extra:{ label:'42 min · Albums',     premium:true  }},
  { type:'song',    id:22, img:mc(2), title:'Street Code',       creator:'MC Vetri',      extra:{ label:'3:58 · Rap',          premium:false }},
  { type:'song',    id:23, img:mc(3), title:'Nila Kaigirathu',   creator:'Classic Remaster',extra:{ label:'5:02 · Songs',      premium:false }},
  { type:'album',   id:24, img:mc(4), title:'Midnight Raaga',    creator:'Ravi K.',       extra:{ label:'48 min · BGM',        premium:true  }},
  { type:'song',    id:25, img:mc(0), title:'Urban Pulse',       creator:'Beat Tape Vol.2',extra:{ label:'32 min · Rap',       premium:false }},
  { type:'song',    id:26, img:mc(1), title:'Mazhai Mela',       creator:'Theme BGM',     extra:{ label:'6:30 · BGM',         premium:false }},
];

/* ── Recommended ── */
const RECOMMENDED = [
  { type:'episode', id:30, img:pc(0), title:'Mind Unlocked',     creator:'Dr. Nalini',    extra:{ label:'48 min · Health',     premium:false }},
  { type:'series',  id:31, img:pc(1), title:'Kural Values',      creator:'Ep.18: Leadership',extra:{ label:'35 min · Education',premium:true }},
  { type:'series',  id:32, img:pc(2), title:'Sports Nation',     creator:'Kumar S.',      extra:{ label:'40 min · Sports',     premium:false }},
  { type:'album',   id:33, img:mc(3), title:'Yaaro Oru Idam',    creator:'Romantic Album',extra:{ label:'35 min · Songs',      premium:true  }},
  { type:'series',  id:34, img:pc(3), title:'Science Sollu',     creator:'Space Exploration',extra:{ label:'55 min · Science', premium:false }},
  { type:'playlist',id:35, img:mc(4), title:'Nightwatch BGM',    creator:'Ambient/Sleep', extra:{ label:'60 min · BGM',        premium:false }},
];

/* ── Creators ── */
const CREATORS = [
  { id:40, name:'Arun Kumar',      type:'Technology Podcast Host', img:pc(0) },
  { id:41, name:'Priya Meenakshi', type:'Storytelling Artist',     img:pc(1) },
  { id:42, name:'MC Vetri',        type:'Rap Artist',              img:mc(2) },
  { id:43, name:'Chef Senthil',    type:'Cooking Podcast Host',    img:pc(2) },
  { id:44, name:'Kavi Rajan',      type:'Music Artist',            img:mc(3) },
  { id:45, name:'Dr. Nalini',      type:'Health Podcast Host',     img:pc(3) },
  { id:46, name:'Hari Beats',      type:'Independent Creator',     img:mc(4) },
  { id:47, name:'Sangeetha R',     type:'Music Artist',            img:pc(4) },
];

/* ── Originals ── */
const ORIGINALS = [
  { id:50, type:'series',  img:pc(0), title:'Thala Original: Ep.1',  sub:'Exclusive · Tamil',      badge:'⭐ THALA ORIGINAL'  },
  { id:51, type:'series',  img:mc(1), title:'Midnight Confessions',   sub:'Drama Series · 10 eps',  badge:'🎭 ORIGINAL SERIES'  },
  { id:52, type:'song',    img:mc(2), title:'Rap Republic S2',        sub:'Hip-Hop Competition',    badge:'🎤 EXCLUSIVE'         },
  { id:53, type:'series',  img:pc(3), title:'Kural Kural',            sub:'Devotional Audio',       badge:'✨ ORIGINAL'          },
  { id:54, type:'album',   img:mc(4), title:'Studio Sessions',        sub:'Live Recording',         badge:'🎵 EXCLUSIVE'         },
];

/* ── Investor ── */
const INVESTOR = [
  { id:60, type:'album',   img:mc(0), title:'Vision 2025 Album',  sub:'Funded · 12 tracks',    badge:'💰 INVESTOR FUNDED'   },
  { id:61, type:'song',    img:mc(1), title:'GenZ Rap Project',   sub:'Collective · Season 1', badge:'💰 FUNDED PRODUCTION' },
  { id:62, type:'album',   img:pc(2), title:'Indie Sounds Vol.3', sub:'Multi-artist collab',   badge:'💰 INVESTOR BACKED'   },
  { id:63, type:'album',   img:mc(3), title:'Tamil Acoustic',     sub:'Guitar & Vocals Album', badge:'💰 PRODUCTION COLLAB' },
  { id:64, type:'song',    img:pc(4), title:'Kavithai Beats',     sub:'Poetry & Music Fusion', badge:'💰 EXCLUSIVE PROJECT'  },
];

/* ── Continue Listening ── */
const CONTINUE = [
  { title:'Tech Nexus Tamil — Ep.47', sub:'Technology · 45 min', progress:68, remaining:'30 min', emoji:'🎙', color:'#1e1040' },
  { title:'Vandi Vandi Album',        sub:'Rap · 52 min',        progress:35, remaining:'34 min', emoji:'🎵', color:'#1a1000' },
  { title:'Kadhal Kathaigal — Ep.8',  sub:'Storytelling · 22 min',progress:82, remaining:'4 min', emoji:'📖', color:'#0a1a10' },
  { title:'Mazhaikalam BGM',          sub:'Instrumental · 38 min',progress:50, remaining:'19 min',emoji:'🎼', color:'#1a0520' },
];

/* =============================================================
   POPULATE ROWS
============================================================= */
function populate(id, data, factory) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = data.map(factory).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  populate('continueRow',   CONTINUE,    makeContinueCard);
  populate('trendingRow',  TRENDING,    makeContentCard);
  populate('newReleasesRow', NEW_RELEASES, makeContentCard);
  populate('musicRow',     MUSIC,       makeContentCard);
  populate('creatorsRow',  CREATORS,    makeCreatorCard);
  populate('originalsRow', ORIGINALS,   makeOrigCard);
  populate('investorRow',  INVESTOR,    makeOrigCard);
  populate('recommendedRow', RECOMMENDED, makeContentCard);

  /* ── Charts ── */
  const CHARTS = [
    { head:'🎙 Top Podcasts', items:[
      ['Tech Nexus Tamil','Arun Kumar','45 min',pc(0)],
      ['Startup Stories','Priya Devi','52 min',pc(1)],
      ['Health Talks','Dr. Nalini','42 min',pc(2)],
      ['Sports Bytes','Kumar S.','30 min',pc(3)],
      ['Kitchen Secrets','Chef Senthil','38 min',pc(4)],
    ]},
    { head:'🎵 Top Songs', items:[
      ['Unnai Naan','Sid Sriram','4:12',mc(0)],
      ['Nila Kaigirathu','Classic','5:02',mc(1)],
      ['Uyirey Uyirey','AR Style','4:45',mc(2)],
      ['Mazhai Mela','Theme','6:30',mc(3)],
      ['Yaaro Yaar','Duo','3:58',mc(4)],
    ]},
    { head:'💿 Top Albums', items:[
      ['Rooftop Sessions','Kavi Rajan','42 min',mc(0)],
      ['Midnight Raaga','Ravi K.','48 min',mc(1)],
      ['Tamil Acoustic','Indie Band','36 min',mc(2)],
      ['Vision 2025','Collective','55 min',mc(3)],
      ['Indie Sounds','Various','44 min',mc(4)],
    ]},
    { head:'🎤 Top Rap', items:[
      ['Street Code','MC Vetri','3:58',mc(0)],
      ['Vandi Vandi','Young Hari','4:22',mc(1)],
      ['Panneer Rap','Rager','3:45',mc(2)],
      ['Urban Pulse','Crew','4:10',mc(3)],
      ['City Nights','MC Raj','3:30',mc(4)],
    ]},
  ];
  const cg = document.getElementById('chartsGrid');
  if (cg) cg.innerHTML = CHARTS.map(col => `
    <div>
      <div class="charts-column-title">${col.head}</div>
      <div class="chart-list">
        ${col.items.map((it,i) => `
          <div class="chart-item" onclick="window.location.href='${detailsUrl({type:'song',id:i,title:it[0],creator:it[1],img:it[3]})}'">
            <div class="chart-rank ${i<3?'top':''}">${i+1}</div>
            <img class="chart-thumb" src="${it[3]}" alt="${it[0]}"/>
            <div class="chart-info"><div class="chart-title">${it[0]}</div><div class="chart-artist">${it[1]}</div></div>
            <div class="chart-duration">${it[2]}</div>
          </div>`).join('')}
      </div>
    </div>`).join('');
});
