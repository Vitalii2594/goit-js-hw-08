import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const playerIframe = document.getElementById('vimeo-player');

const player = new Vimeo(playerIframe);

const savePlaybackTime = throttle(async () => {
  const currentTime = await player.getCurrentTime();
  localStorage.setItem('videoplayer-current-time', currentTime.toString());
}, 1000); // Оновлюємо час не частіше

player.on('timeupdate', savePlaybackTime);

// Функція для відновлення збереженої позиції
async function restorePlaybackTime() {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime !== null) {
    await player.setCurrentTime(parseFloat(savedTime));
  }
}

// Викликаємо функцію відновлення після завантаження сторінки
window.addEventListener('DOMContentLoaded', restorePlaybackTime);
