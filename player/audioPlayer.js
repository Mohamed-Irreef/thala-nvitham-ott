/* =============================================================
   player/audioPlayer.js
   Simulates playback progress using JavaScript timers
============================================================= */

let simulationTimer = null;

function startAudioSimulation() {
  stopAudioSimulation();
  
  if (window.playerState.isPlaying && window.playerState.currentTrack) {
    simulationTimer = setInterval(() => {
      // Advance by 1 second * speed factor
      window.playerState.currentTime += (1 * window.playerState.playbackSpeed);
      
      // Check for track end
      if (window.playerState.currentTime >= window.playerState.duration) {
        window.playerState.currentTime = window.playerState.duration;
        savePlayerState();
        if (typeof updatePlayerUI === 'function') updatePlayerUI();
        // Play next automatically
        playNext();
        return;
      }
      
      savePlayerState();
      
      // Update UI
      if (typeof updateProgressBar === 'function') updateProgressBar();
      
    }, 1000);
  }
}

function stopAudioSimulation() {
  if (simulationTimer) {
    clearInterval(simulationTimer);
    simulationTimer = null;
  }
}

function playPlayback() {
  if (!window.playerState.currentTrack) {
    if (window.playerState.queue.length > 0) {
      playNext();
    }
    return;
  }
  window.playerState.isPlaying = true;
  savePlayerState();
  startAudioSimulation();
  if (typeof updatePlayerUI === 'function') updatePlayerUI();
}

function pausePlayback() {
  window.playerState.isPlaying = false;
  savePlayerState();
  stopAudioSimulation();
  if (typeof updatePlayerUI === 'function') updatePlayerUI();
}

function togglePlay() {
  if (window.playerState.isPlaying) {
    pausePlayback();
  } else {
    playPlayback();
  }
}

function seekAudio(percent) {
  if (!window.playerState.currentTrack) return;
  const newTime = (percent / 100) * window.playerState.duration;
  window.playerState.currentTime = newTime;
  savePlayerState();
  if (typeof updateProgressBar === 'function') updateProgressBar();
}

function setVolume(value) {
  // Value between 0 and 1
  window.playerState.volume = Math.max(0, Math.min(1, value));
  savePlayerState();
  if (typeof updateVolumeUI === 'function') updateVolumeUI();
}

function setPlaybackSpeed(speed) {
  window.playerState.playbackSpeed = speed;
  savePlayerState();
  if (typeof updateSpeedUI === 'function') updateSpeedUI();
}
