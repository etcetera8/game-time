const Platform = require('./Platform.js');
const Player = require('./Player.js');

const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const gravity = 1;
const platformArr = [];
const player2 = new Player(100, 325, 'pink');
const player1 = new Player(550, 300, '#00e9ff');
const mainPlatform = new Platform(0, 500, 800);
const topLeft = new Platform(0, 150, 100);
const topCenter = new Platform(275, 180, 175);
const topRight = new Platform((canvasWidth - 125), 150, 125);
const bottomLeft = new Platform(0, 350, 125);
const bottomCenter = new Platform(300, 400, 125);
const bottomRightA = new Platform(550, 325, 125);
const bottomRightB = new Platform((canvasWidth - 125), 350, 125);
platformArr.push(mainPlatform, topLeft, topCenter, topRight, bottomLeft, bottomCenter, bottomRightA, bottomRightB);

window.addEventListener('keyup', function() {
  let key = event.keyCode;
  console.log(key)
  //p1 controls
  if(key === 37) {
    player1.x -= 10;
  }
  if(key === 38) {
    player1.y -= 10;
  }
  if(key === 39) {
    player1.x += 10;
  }
  //p2 controls
  if(key === 65) {
    player2.x -= 10;
  }
  if(key === 87) {
    player2.y -= 10;
  }
  if(key === 68) {
    player2.x += 10;
  }
})

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  platformArr.forEach(function(platform) {
    platform.draw(c);
  })
  player1.draw(c);
  player2.draw(c);
  player1.teleport(canvasWidth);
  player2.teleport(canvasWidth);
  player1.gravity(gravity, canvasHeight);
  player2.gravity(gravity, canvasHeight);
}

animate();