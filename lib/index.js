const Platform = require('./Platform.js');
const Player = require('./Player.js');

const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
console.log(c);
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
const player1 = new Player(100, 325);


function platformDrawing() {
  const mainPlatform = new Platform(0, 500, 800);
  mainPlatform.draw(c);

  const topLeft = new Platform(0, 150, 100);
  topLeft.draw(c);

  const topCenter = new Platform(275, 180, 175);
  topCenter.draw(c);

  const topRight = new Platform((canvasWidth - 125), 150, 125);
  topRight.draw(c);

  const bottomLeft = new Platform(0, 350, 125);
  bottomLeft.draw(c);

  const bottomCenter = new Platform(300, 400, 125);
  bottomCenter.draw(c);

  const bottomRightA = new Platform(550, 325, 125);
  bottomRightA.draw(c);

  const bottomRightB = new Platform((canvasWidth - 125), 350, 125);
  bottomRightB.draw(c); 
}

window.addEventListener('keyup', function() {
  let key = event.keyCode;
  if(key === 37) {
    player1.x -= 10;
  }
  if(key === 38) {
    player1.y -= 10;
  }
  if(key === 39) {
    player1.x += 10;
  }
})

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  platformDrawing();
  player1.draw(c);
}


animate();