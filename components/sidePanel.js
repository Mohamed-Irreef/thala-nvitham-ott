/* =============================================================
   components/sidePanel.js
   Outputs the DOM structure for the Right-side Queue Panel
============================================================= */

function renderGlobalSidePanel() {
  return `
<!-- Right Side Queue Panel -->
<aside class="global-side-panel" id="global-side-panel">
  <div class="gsp-header">
    <h3>Now Playing</h3>
    <button class="gsp-close" onclick="document.getElementById('global-side-panel').classList.remove('active')"><i class="fa-solid fa-xmark"></i></button>
  </div>
  
  <div class="gsp-content">
    <div class="gsp-now-playing">
      <img id="gsp-thumb" src="${getAssetsBase()}music-cover1.png" alt="Current Track" />
      <h2 id="gsp-title">No Track Selected</h2>
      <p id="gsp-artist">Thala Nivitham</p>
    </div>

    <div class="gsp-actions">
      <button class="gsp-action-btn"><i class="fa-solid fa-plus"></i></button>
      <button class="gsp-action-btn"><i class="fa-solid fa-heart"></i></button>
      <button class="gsp-action-btn"><i class="fa-solid fa-download"></i></button>
      <button class="gsp-action-btn"><i class="fa-solid fa-share-nodes"></i></button>
    </div>

    <!-- Artist Details -->
    <div class="gsp-section">
      <h4>About Artist</h4>
      <div class="gsp-artist-card">
        <div class="gac-info">
          <p id="gsp-artist-name" class="gac-name">Unknown</p>
          <p class="gac-stats">1.2M Monthly Listeners</p>
        </div>
        <button class="gac-follow">Follow</button>
      </div>
    </div>
    
    <!-- Timeline (Injected dynamically for podcasts) -->
    <div class="gsp-section" id="gsp-timeline-container" style="display:none;"></div>

    <!-- Next In Queue -->
    <div class="gsp-section">
      <h4>Next in queue</h4>
      <div id="gsp-queue-list">
        <!-- Rendered by queueView.js -->
        <p style="font-size:12px;color:#a0a0b0;">Queue is empty.</p>
      </div>
    </div>
    
    <!-- Autoplay Recommendations -->
    <div class="gsp-section">
      <h4>Autoplay Recommendations</h4>
      <div class="queue-item simulated-recommendation">
        <img src="${getAssetsBase()}music-cover4.png" alt="Rec" />
        <div class="qi-info">
          <h5>Platform Pick</h5>
          <p>Similar to what you like</p>
        </div>
        <button class="qi-add"><i class="fa-solid fa-plus"></i></button>
      </div>
    </div>
    <!-- Credits -->
    <div class="gsp-section" id="gsp-credits-section">
      <h4>Credits</h4>
      <div class="ep-credits">
        <div class="ep-credit-row"><span class="ep-credit-role">Artist</span><span class="ep-credit-name" id="gsp-credit-artist">—</span></div>
        <div class="ep-credit-row"><span class="ep-credit-role">Producer</span><span class="ep-credit-name" id="gsp-credit-producer">Thala Nivitham Studios</span></div>
        <div class="ep-credit-row"><span class="ep-credit-role">Label</span><span class="ep-credit-name">Thala Nivitham</span></div>
      </div>
    </div>    
  </div>
</aside>
  `;
}
