/* =============================================================
   player/playerUI.js
   Connects state with UI updates and Keyboard shortcuts
============================================================= */

// Safely format mm:ss
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' + s : s}`;
}

// Binds everything to the DOM
function initializePlayer() {
  console.log("Initializing Global Player...");
  
  // Render structure components into #global-player-root
  const playerRoot = document.getElementById('global-player-root');
  if (playerRoot) {
    // Expected to be defined by components/bottomPlayer.js & sidePanel.js
    if (typeof renderGlobalBottomPlayer === 'function') {
      playerRoot.innerHTML = renderGlobalBottomPlayer();
      if (typeof renderGlobalSidePanel === 'function') {
        playerRoot.innerHTML += renderGlobalSidePanel();
      }
      bindPlayerEvents();
    }
  }

  // Restore simulated audio tick on load
  if (window.playerState.isPlaying) {
    startAudioSimulation();
  }

  // Sync DOM with loaded state
  updatePlayerUI();
  updateProgressBar();
  updateVolumeUI();
  updateSpeedUI();
  
  if (typeof updatePanelQueueUI === 'function') {
    updatePanelQueueUI();
  }
}

// Update Text, Icons, & Thumbnail based on track
function updatePlayerUI() {
  const tTitle = document.getElementById('gp-title');
  const tArtist = document.getElementById('gp-artist');
  const tThumb = document.getElementById('gp-thumb');
  const playBtnIcon = document.getElementById('gp-play-icon');
  
  const track = window.playerState.currentTrack;

  if (track) {
    if (tTitle) tTitle.textContent = track.title;
    if (tArtist) tArtist.textContent = track.artist;
    if (tThumb) tThumb.src = track.img;
    const gspCredit = document.getElementById('gsp-credit-artist');
    if (gspCredit) gspCredit.textContent = track.artist || '—';
  } else {
    if (tTitle) tTitle.textContent = "Select a track";
    if (tArtist) tArtist.textContent = "Enjoy Thala Nivitham";
    if (tThumb) tThumb.src = getAssetsBase() + "music-cover1.png"; // Fallback
  }

  if (playBtnIcon) {
    playBtnIcon.className = window.playerState.isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play";
  }
}

// Sync progress bar
function updateProgressBar() {
  const curText = document.getElementById('gp-time-cur');
  const durText = document.getElementById('gp-time-dur');
  const progressFill = document.getElementById('gp-progress-fill');
  
  const cur = window.playerState.currentTime || 0;
  const dur = window.playerState.duration || 0;
  let pct = 0;
  if (dur > 0) pct = Math.min((cur / dur) * 100, 100);

  if (curText) curText.textContent = formatTime(cur);
  if (durText) durText.textContent = formatTime(dur);
  if (progressFill) progressFill.style.width = pct + '%';
}

function updateVolumeUI() {
  const volFill = document.getElementById('gp-volume-fill');
  if (volFill) volFill.style.width = (window.playerState.volume * 100) + '%';
}

function updateSpeedUI() {
  const speedBtn = document.getElementById('gp-speed-btn');
  if (speedBtn) speedBtn.textContent = window.playerState.playbackSpeed + 'x';
}

function bindPlayerEvents() {
  // Play/Pause Bottom Player
  const gpPlay = document.getElementById('gp-play-btn');
  if (gpPlay) {
    gpPlay.addEventListener('click', () => togglePlay());
  }
  
  // Next / Prev Bottom Player
  const gpNext = document.getElementById('gp-next-btn');
  if (gpNext) gpNext.addEventListener('click', () => playNext());
  
  // Seek bar Click
  const pbContainer = document.getElementById('gp-progress-container');
  if (pbContainer) {
    pbContainer.addEventListener('click', (e) => {
      const rect = pbContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min((clickX / rect.width) * 100, 100));
      seekAudio(pct);
    });
  }

  // Volume Click
  const volContainer = document.getElementById('gp-volume-container');
  if (volContainer) {
    volContainer.addEventListener('click', (e) => {
      const rect = volContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const vol = Math.max(0, Math.min(clickX / rect.width, 1));
      setVolume(vol);
    });
  }

  // Speed Toggle
  const speedBtn = document.getElementById('gp-speed-btn');
  if (speedBtn) {
    speedBtn.addEventListener('click', () => {
      let nextSpeed = window.playerState.playbackSpeed + 0.25;
      if (nextSpeed > 2.0) nextSpeed = 0.5;
      setPlaybackSpeed(nextSpeed);
    });
  }

  // Queue Panel Toggle
  const qToggle = document.getElementById('gp-queue-toggle');
  if (qToggle) {
    qToggle.addEventListener('click', () => {
      const sPanel = document.getElementById('global-side-panel');
      if (sPanel) sPanel.classList.toggle('active');
    });
  }
}

// Global Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  // Skip if focused inside an input (like search)
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

  switch(e.code) {
    case 'Space':
      e.preventDefault();
      togglePlay();
      break;
    case 'ArrowRight':
      e.preventDefault();
      seekAudio(Math.min(((window.playerState.currentTime + 10) / window.playerState.duration)*100, 100) || 0);
      break;
    case 'ArrowLeft':
      e.preventDefault();
      seekAudio(Math.max(((window.playerState.currentTime - 10) / window.playerState.duration)*100, 0) || 0);
      break;
    case 'KeyM':
      e.preventDefault();
      if (window.playerState.volume > 0) {
        window.playerState._savedVol = window.playerState.volume;
        setVolume(0);
      } else {
        setVolume(window.playerState._savedVol || 1);
      }
      break;
  }
});
