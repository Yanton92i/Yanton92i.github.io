const audioFiles = [
  'music/music1.mp3',
  'music/music2.mp3',
  'music/music3.mp3',
  'music/music4.mp3',
  'music/music5.mp3'
];

const audio = new Audio();
audio.loop = true;
audio.volume = 0.5;

function playRandomTrack() {
  const randomIndex = Math.floor(Math.random() * audioFiles.length);
  audio.src = audioFiles[randomIndex];
  audio.play();
}

function toggleMusic() {
  if (audio.paused) {
    playRandomTrack();
  } else {
    audio.pause();
  }
}

const button = document.querySelector('.connect');
button.addEventListener('click', toggleMusic);

