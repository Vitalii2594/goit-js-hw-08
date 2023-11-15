import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const playerIframe = document.getElementById('vimeo-player');

const player = new Vimeo(playerIframe);

const savePlaybackTime = throttle(async () => {
  const currentTime = await player.getCurrentTime();
  localStorage.setItem('videoplayer-current-time', currentTime.toString());
}, 1000);

player.on('timeupdate', savePlaybackTime);

// Function to restore a saved position
async function restorePlaybackTime() {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime !== null) {
    await player.setCurrentTime(parseFloat(savedTime));
  }
}

// Call the recovery function after the page has loaded
window.addEventListener('DOMContentLoaded', restorePlaybackTime);
