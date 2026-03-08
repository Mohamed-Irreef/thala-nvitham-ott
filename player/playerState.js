/* =============================================================
   player/playerState.js
   Manages global player state synchronized via localStorage
============================================================= */

window.playerState = {
  currentTrack: null,
  queue: [],
  isPlaying: false,
  volume: 1,
  playbackSpeed: 1,
  currentTime: 0,
  duration: 0
};

// Keys for localStorage
const STATE_KEY = 'thala_player_state';

// Save current state to localStorage
function savePlayerState() {
  localStorage.setItem(STATE_KEY, JSON.stringify(window.playerState));
}

// Load state from localStorage on page initialization
function loadPlayerState() {
  const saved = localStorage.getItem(STATE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Merge saved state into window.playerState
      Object.assign(window.playerState, parsed);
    } catch (e) {
      console.error("Failed to parse player state from localStorage", e);
    }
  }
}

// Initialize state
loadPlayerState();
