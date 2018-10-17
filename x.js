let ctx;
let audio;
let sounds;
let pattern = [
'*---*---*---*---', // kick?
'----------------'  // snare?
];

let step = 0;

// 120bpm
// 4/4
// 16 steps
// 4 beats
// 

function play1() {
  var source = audio.createBufferSource();
  source.buffer = sounds[0];
  source.connect(audio.destination);
  source['start'](0);
}

async function go() {
  sounds = await load();

  clearScreen();
  //gameloop();
  graphics();
}

async function load() {
  let sounds = ['sound1.wav', 'sound2.wav'];

  let promises = sounds.map((file) => {
    return fetch(`wavs/${file}`)
      .then((response) => response.arrayBuffer())
      .then((buffer) => audio.decodeAudioData(buffer))
  });

  return await Promise.all(promises);
}

function clearScreen() {
  ctx.fillStyle = '#0000ae';
  ctx.fillRect(0,0,900,300); 
}

function graphics() {
  window.requestAnimationFrame(graphics);  
  drawPattern();
  
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(50 + 50 * step, 50, 10,10);
}

// 900 x 300 canvas.
// 50x50 squares.
// 50px padding.

function drawPattern() {
  pattern.forEach((sequence,i) => {
    sequence.split('').forEach((step,j) => {
      if(step === '*') {
        ctx.fillStyle = '#ffffff';
      } else {
        ctx.fillStyle = '#000000';
      }

      ctx.fillRect( 50 + 50*j, 50 + 50*i, 50,50);

    })
  });
}

// 120bpm = 2bps = 500ms per beat
// update every 125ms

function gameloop() {
  if(pattern[0][step] == '*') {
    play1();
  }

  step = (step + 1) % 16;

  //console.log(step);
  setTimeout(gameloop, 125);
}

$(() => {
  let canvas = document.getElementById('canvas');
  audio = new (window.AudioContext || window.webkitAudioContext)();

  if(canvas) {
    ctx = canvas.getContext('2d');
    go();
  }
});

