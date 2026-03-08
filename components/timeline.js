/* =============================================================
   components/timeline.js
   Podcast specific timeline rendering
============================================================= */

// Optional Chapters payload on a Podcast Track object:
// track.chapters = [ { title:'Intro', time:0 }, { title:'Discussion', time:320 } ]

function updatePanelTimelineUI() {
  const tc = document.getElementById('gsp-timeline-container');
  if (!tc) return;

  const cur = window.playerState.currentTrack;
  if (cur && cur.chapters && cur.chapters.length > 0) {
    tc.style.display = 'block';
    
    tc.innerHTML = `
      <h4>Podcast Timeline</h4>
      <div class="timeline-list">
        ${cur.chapters.map(chap => `
          <div class="timeline-chap" onclick="seekAudio(${(chap.time / window.playerState.duration)*100})">
            <span>${chap.title}</span>
            <span class="chap-time">${formatTime(chap.time)}</span>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    tc.style.display = 'none';
  }
}
