/* =============================================================
   Thala Nivitham — details.js
   Modular Dynamic Details Page Logic for Audio & Playlists
============================================================= */

// Mock Database for Episodes
const EPISODES_DB = [
  { 
    id: 'ep1', num: 1, title: 'Startup Secrets: The Day One', 
    duration: '42:30', durationSeconds: 2550, date: 'Jan 5, 2026', 
    desc: 'In this episode we cover the fundamental basics of bootstrapping a company with exactly zero funding in the current ecosystem.', 
    creator: 'Arun Kumar', img: '../assets/podcast-cover2.png', category: 'Technology'
  },
  { 
    id: 'ep2', num: 2, title: 'Growth Strategies for 2026', 
    duration: '38:20', durationSeconds: 2300, date: 'Jan 12, 2026', 
    desc: 'Deep dive into scaling your application utilizing modern AI pipelines and serverless infrastructure.', 
    creator: 'Arun Kumar', img: '../assets/podcast-cover3.png', category: 'Technology'
  },
  { 
    id: 'ep3', num: 3, title: 'Marketing Hacks', 
    duration: '45:10', durationSeconds: 2710, date: 'Jan 19, 2026', 
    desc: 'Proven tactics for leveraging organic reach and community building in a hyper-saturated market.', 
    creator: 'Arun Kumar', img: '../assets/podcast-cover4.png', category: 'Technology'
  }
];

const RELATED_CONTENT = [
    { title: 'AI Vilaiyaattu', creator: 'Tech Hub', img: '../assets/podcast-cover5.png' },
    { title: 'Future of EV', creator: 'Auto World', img: '../assets/music-cover2.png' }
];

/* ── UI Core Routing logic ── */
function initDetailsPage() {
    const isPlaylist = document.getElementById('trackRows') !== null;
    
    if (isPlaylist) {
        loadPlaylistDetails();
    } else {
        loadAudioDetails();
    }
}

/* ── 1. Single Audio Page Logic ── */
function loadAudioDetails() {
    // Single track setup
    renderRelatedContent();
}

function playCurrentAudio() {
    triggerGlobalPlayer({
        id: 'single_audio_1',
        title: document.getElementById('heroTitle')?.textContent || 'Startup Secrets',
        artist: document.getElementById('heroCreator')?.textContent || 'Chef Senthil',
        img: document.getElementById('heroImage')?.src || '../assets/music-cover1.png',
        durationSeconds: 2700,
        type: 'episode',
        category: 'Podcast'
    });
}

function renderRelatedContent() {
    const container = document.getElementById('relatedRow');
    if (!container) return;

    container.innerHTML = RELATED_CONTENT.map(item => `
        <div class="creator-card" style="cursor:pointer; background: transparent; padding:0; flex-direction:column; align-items:flex-start; margin-right: 20px;">
            <img src="${item.img}" style="width:160px;height:160px;border-radius:12px;margin-bottom:12px;border:none;">
            <h4 style="font-size:14px; margin-bottom:4px;">${item.title}</h4>
            <span style="font-size:12px; color:var(--det-text-sec);">${item.creator}</span>
        </div>
    `).join('');
}


/* ── 2. Playlist / Series Page Logic ── */
function loadPlaylistDetails() {
    renderEpisodeList();
}

function renderEpisodeList() {
    const container = document.getElementById('trackRows');
    if (!container) return;

    container.innerHTML = EPISODES_DB.map((ep, index) => `
        <tr class="episode-row" onclick="openEpisodePanel('${ep.id}')">
            <td class="ep-num"><span>${ep.num}</span></td>
            <td class="ep-title-col">
                <div style="margin-bottom: 4px;">${ep.title}</div>
                <div style="font-size: 12px; color: var(--det-text-sec); font-weight: 400;">
                    ${ep.creator} • ${ep.date}
                </div>
            </td>
            <td class="ep-dur">${ep.duration}</td>
            <td class="ep-actions" onclick="event.stopPropagation()">
                <button title="Like"><i class="fa-regular fa-heart"></i></button>
                <button title="More"><i class="fa-solid fa-ellipsis"></i></button>
            </td>
        </tr>
    `).join('');
}

function playPlaylistTop() {
    if (EPISODES_DB.length > 0) {
        playEpisode(EPISODES_DB[0].id);
    }
}

/* ── Episode Panel Logic ── */
function openEpisodePanel(episodeId) {
    const ep = EPISODES_DB.find(e => e.id === episodeId);
    if (!ep) return;

    // Inject content into panel
    document.getElementById('panelEpTitle').textContent = ep.title;
    document.getElementById('panelEpCreator').textContent = ep.creator;
    document.getElementById('panelEpDur').textContent = ep.duration;
    document.getElementById('panelEpDate').textContent = ep.date;
    document.getElementById('panelEpDesc').textContent = ep.desc;
    document.getElementById('panelEpImg').src = ep.img;
    document.getElementById('panelEpCredit1').textContent = ep.creator;

    // Bind play action dynamically
    const pBtn = document.getElementById('panelPlayBtn');
    if (pBtn) {
        pBtn.onclick = () => playEpisode(episodeId);
    }

    // Slide in
    const panel = document.getElementById('episodePanel');
    const overlay = document.getElementById('epPanelOverlay');
    if (panel) panel.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.classList.add('panel-open');
}

function closeEpisodePanel() {
    const panel = document.getElementById('episodePanel');
    const overlay = document.getElementById('epPanelOverlay');
    if (panel) panel.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.classList.remove('panel-open');
}

// Close panel on outside click or ESC key
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('epPanelOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeEpisodePanel);
    }
    const closeBtn = document.getElementById('closePanelBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeEpisodePanel);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeEpisodePanel();
    }
});

/* ── Global Bottom Player Bridge ── */
function playEpisode(episodeId) {
    const ep = EPISODES_DB.find(e => e.id === episodeId);
    if (!ep) return;

    triggerGlobalPlayer({
        id: ep.id,
        title: ep.title,
        artist: ep.creator,
        img: ep.img,
        durationSeconds: ep.durationSeconds,
        type: 'episode',
        category: ep.category
    });
}

function triggerGlobalPlayer(trackObj) {
    // If the simulated playTrack exists from phase 7 QueueManager
    if (typeof window.playTrack === 'function') {
        window.playTrack(trackObj);
    } else {
        console.warn("Global player module not strictly found. Simulated injection initiated.");
        // Fallback or explicit mapping
        if (window.playerState) {
            window.playerState.currentTrack = trackObj;
            window.playerState.currentTime = 0;
            window.playerState.duration = trackObj.durationSeconds || 180;
            window.playerState.isPlaying = true;
            if(typeof window.savePlayerState === 'function') window.savePlayerState();
            if(typeof window.startAudioSimulation === 'function') window.startAudioSimulation();
            if(typeof window.updatePlayerUI === 'function') window.updatePlayerUI();
            if(typeof window.updatePanelQueueUI === 'function') window.updatePanelQueueUI();
        }
    }
}

// Global initialization
document.addEventListener('DOMContentLoaded', initDetailsPage);
