/* =============================================================
   components/bottomPlayer.js
   Outputs the DOM structure for the Bottom Global Player
============================================================= */

function getAssetsBase() {
  return window.location.pathname.includes('/details/') ? '../assets/' : 'assets/';
}

function renderGlobalBottomPlayer() {
  return `
<!-- Bottom Simulated Player -->
<div class="global-bottom-player">
  <div class="gp-left">
    <img id="gp-thumb" src="${getAssetsBase()}music-cover1.png" alt="Thumbnail" />
    <div class="gp-info">
      <h4 id="gp-title">Select a track</h4>
      <p id="gp-artist">Enjoy Thala Nivitham</p>
    </div>
    <button class="gp-icon-btn"><i class="fa-regular fa-heart"></i></button>
  </div>
  
  <div class="gp-center">
    <div class="gp-controls">
      <button class="gp-icon-btn"><i class="fa-solid fa-shuffle"></i></button>
      <button class="gp-icon-btn" id="gp-prev-btn"><i class="fa-solid fa-backward-step"></i></button>
      <button class="gp-play-btn" id="gp-play-btn"><i id="gp-play-icon" class="fa-solid fa-play"></i></button>
      <button class="gp-icon-btn" id="gp-next-btn"><i class="fa-solid fa-forward-step"></i></button>
      <button class="gp-icon-btn"><i class="fa-solid fa-repeat"></i></button>
    </div>
    <div class="gp-playback-bar">
      <span class="gp-time" id="gp-time-cur">0:00</span>
      <div class="gp-progress-container" id="gp-progress-container">
        <div class="gp-progress-fill" id="gp-progress-fill" style="width: 0%;"></div>
      </div>
      <span class="gp-time" id="gp-time-dur">0:00</span>
    </div>
  </div>
  
  <div class="gp-right">
    <button class="gp-icon-btn" id="gp-timeline-btn" title="Chapters"><i class="fa-solid fa-bars-progress"></i></button>
    <button class="gp-icon-btn" id="gp-speed-btn" title="Speed">1x</button>
    <div class="gp-volume-wrapper">
      <i class="fa-solid fa-volume-high gp-icon-btn" style="font-size:14px;"></i>
      <div class="gp-progress-container gp-volume" id="gp-volume-container">
        <div class="gp-progress-fill" id="gp-volume-fill" style="width: 100%;"></div>
      </div>
    </div>
    <button class="gp-icon-btn" id="gp-queue-toggle" title="Queue"><i class="fa-solid fa-layer-group"></i></button>
  </div>
</div>
  `;
}
