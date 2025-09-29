// Canvas & context
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

// Resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth*0.95;
  canvas.height = 300;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Audio elements
const audioFile = document.getElementById('audio-file');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const sensitivity = document.getElementById('sensitivity');
const sensVal = document.getElementById('sens-val');
const codeInput = document.getElementById('code');
const cpsEl = document.getElementById('cps');

let audio = new Audio();
audio.crossOrigin = "anonymous";
let audioCtx, analyser, dataArray;

function initAudio() {
  if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioCtx.createMediaElementSource(audio);
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;
  dataArray = new Uint8Array(analyser.frequencyBinCount);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
}

// Event listeners for file input and play/pause buttons
audioFile.addEventListener('change', e=>{
  const file = e.target.files[0];
  if(!file) return;
  audio.src = URL.createObjectURL(file);
  audio.load();
  audio.play();
  initAudio();
});

playBtn.addEventListener('click', ()=> audio.play());
pauseBtn.addEventListener('click', ()=> audio.pause());

