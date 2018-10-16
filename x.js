let ctx;

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

function go() {
  clearScreen();
  gameloop();
  graphics();
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
  step = (step + 1) % 16;

  //console.log(step);
  setTimeout(gameloop, 125);
}

function __onload() {
  let canvas = document.getElementById('canvas');
  if(canvas) {
    ctx = canvas.getContext('2d');
    go();
  } else {
    return;
  }
}


// go!
window.onload = __onload;
