/* =============================================================
   components/queueView.js
   Dynamic rendering logic for populating the Queue List
============================================================= */

function updatePanelQueueUI() {
  const queueContainer = document.getElementById('gsp-queue-list');
  const gspTitle = document.getElementById('gsp-title');
  const gspArtist = document.getElementById('gsp-artist');
  const gspThumb = document.getElementById('gsp-thumb');
  const gspArtistName = document.getElementById('gsp-artist-name');

  const q = window.playerState.queue || [];
  const cur = window.playerState.currentTrack;

  // Update Now Playing Meta
  if (cur) {
    if (gspTitle) gspTitle.textContent = cur.title;
    if (gspArtist) gspArtist.textContent = cur.artist;
    if (gspArtistName) gspArtistName.textContent = cur.artist;
    if (gspThumb) gspThumb.src = cur.img;
  }

  // Render Queue List
  if (queueContainer) {
    if (q.length === 0) {
      queueContainer.innerHTML = '<p style="font-size:12px;color:#a0a0b0;">Queue is empty.</p>';
      return;
    }

    queueContainer.innerHTML = q.map((track, i) => `
      <div class="queue-item">
        <img src="${track.img}" alt="${track.title}" />
        <div class="qi-info">
          <h5>${track.title}</h5>
          <p>${track.artist}</p>
        </div>
        <div class="qi-actions">
          <span style="font-size:11px;color:#a0a0b0;margin-right:8px;">${formatTime(track.durationSeconds || 180)}</span>
          <button class="qi-remove" onclick="removeFromQueue(${i})" title="Remove"><i class="fa-solid fa-minus"></i></button>
        </div>
      </div>
    `).join('');
  }
}
