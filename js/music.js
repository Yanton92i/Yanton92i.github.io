const audio = new Audio();
audio.src = 'music/music1.mp3';
audio.loop = true;
audio.volume = 0.5;

function toggleMusic() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

const button = document.querySelector('.connect');
button.addEventListener('click', toggleMusic);
