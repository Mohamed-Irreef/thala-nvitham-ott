/* =============================================================
   player/queueManager.js
   Handles queue operations: add, play next, remove, clear
============================================================= */

// A track object format:
// { id, title, artist, img, duration, type, category }

function addToQueue(track) {
  window.playerState.queue.push(track);
  savePlayerState();
  if (typeof updatePlayerUI === 'function') updatePlayerUI();
  if (typeof updatePanelQueueUI === 'function') updatePanelQueueUI();
}

function playNext() {
  if (window.playerState.queue.length > 0) {
    // Pop the first item from the queue
    const nextTrack = window.playerState.queue.shift();
    playTrack(nextTrack);
    savePlayerState();
  } else {
    // Stop playback if queue is empty
    pausePlayback();
    window.playerState.currentTrack = null;
    window.playerState.currentTime = 0;
    savePlayerState();
  }
  if (typeof updatePlayerUI === 'function') updatePlayerUI();
  if (typeof updatePanelQueueUI === 'function') updatePanelQueueUI();
}

function removeFromQueue(index) {
  if (index >= 0 && index < window.playerState.queue.length) {
    window.playerState.queue.splice(index, 1);
    savePlayerState();
    if (typeof updatePanelQueueUI === 'function') updatePanelQueueUI();
  }
}

function clearQueue() {
  window.playerState.queue = [];
  savePlayerState();
  if (typeof updatePanelQueueUI === 'function') updatePanelQueueUI();
}

function playTrack(track) {
  window.playerState.currentTrack = track;
  window.playerState.currentTime = 0;
  // Fallback duration 3:00 if not provided
  window.playerState.duration = track.durationSeconds || 180; 
  window.playerState.isPlaying = true;
  savePlayerState();
  
  if (typeof startAudioSimulation === 'function') startAudioSimulation();
  if (typeof updatePlayerUI === 'function') updatePlayerUI();
  if (typeof updatePanelQueueUI === 'function') updatePanelQueueUI();
}
