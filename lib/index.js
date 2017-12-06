const canvasStart = document.getElementById('canvas-start-page');
const cStart = canvasStart.getContext('2d');


const Platform = require('./Platform.js');
const Player = require('./Player.js');
const GameManager = require('./GameManager.js');
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const platformArr = [];

const playerArr = [];
const player2Start = new Player(150, 325, 515, 61, 40, 50);
const player2Left = new Player(150, 325, 219, 110, 40, 50);
const player2FlyLeftDown = new Player(150, 325, 302, 112, 40, 50);
const player2FlyLeftUp = new Player(150, 325, 341, 112, 40, 50);
const player2FlyRightUp = new Player(150, 325, 45, 110, 40, 50);
const player2FlyRightDown = new Player(150, 325, 0, 110, 40, 50);

const player1Start = new Player(260, 300, 204, 163, 40, 50);
const player1Right = new Player(260, 300, 513, 111, 40, 50);
const player1FlyRightUp = new Player(260, 300, 45, 158, 40, 50);
const player1FlyRightDown = new Player(260, 300, 3, 160, 40, 50);
const player1FlyLeftUp = new Player(260, 300, 293, 158, 40, 50);
const player1FlyLeftDown = new Player(260, 300, 341, 158, 40, 50);

const gameManager = new GameManager();
playerArr.push(player1Start, player2Start);
const scoreboardPlatform = new Platform(250, 500, 290, 100, 32, 194, 165, 38);
const mainPlatform = new Platform(0, 500, 800, 15, 0, 64, 300, 16);
const topLeft = new Platform(0, 150, 100, 15, 0, 0, 64, 16);
const topCenter = new Platform(275, 180, 175, 15, 180, 0, 180, 16);
const topRight = new Platform((canvasWidth - 125), 150, 125, 15, 72, 0, 100, 16);
const bottomLeft = new Platform(0, 350, 125, 15, 185, 0, 175, 16);
const bottomCenter = new Platform(300, 400, 125, 15, 232, 32, 132, 16);
const bottomRightA = new Platform(550, 325, 125, 15, 0, 32, 116, 16);
const bottomRightB = new Platform((canvasWidth - 130), 350, 130, 15, 116, 32, 108, 12);
const lava = new Platform(0, 550, 800, 100);
platformArr.push(mainPlatform, topLeft, topCenter, topRight, bottomLeft, bottomCenter, bottomRightA, bottomRightB);
let p1 = playerArr[0];
let p2 = playerArr[1];

window.addEventListener('keydown', function() {
  let key = event.keyCode;
  event.preventDefault();
  if (gameManager.isPaused === true) {
    //do nothing
  } else {
    if(key === 87) {
      playerArr[1].y -= 20;
    }
    if(key === 38) {
      playerArr[0].y -= 20;
    }
  }
})

let keys = [];

  //make map of keys with individula move functions
function xMovement() {
  window.addEventListener('keydown', function(event) {
    event.preventDefault();
    keys[event.keyCode] = true;
  })

  window.addEventListener('keyup', function(event) {
    keys[event.keyCode] = false;
  })
  if (gameManager.isPaused === true) {
      //DO NOTHING GAME PAUSED
  } else {

      if (keys[39]) {
        if(p1.dx < p1.speed) {
          p1.dx++;
        }
      }
      if (keys[37]) {
        if (p1.dx > -p1.speed) {
          p1.dx--;
        }
      }
      if (keys[68]) {
        if(p2.dx < p2.speed) {
          p2.dx++;
        }
      }
      if (keys[65]) {
        if (p2.dx > -p2.speed) {
          p2.dx--;
        }
      }
      
      p1.dx *= p1.friction;
      p2.dx *= p2.friction;
      p1.x += p1.dx;
      p2.x += p2.dx;
    } 
}

window.addEventListener('keyup', (e) => (gameManager.pausePosition(c, e.keyCode)))

//refactor into player
function lavaCollision() {
  if(p1.y >= 550 - p1.height) {
    gameManager.p1Lives -= 1;
    p1.alive = false;
  }
  if(p2.y >= 550 - p2.height) {
    gameManager.p2Lives -= 1;
    p2.alive = false;
  }
}

function drawPlatform(c) {
  lava.drawLava(c);
  scoreboardPlatform.draw2(c);
  platformArr.forEach(function(platform) {
    platform.draw(c);
  })
}

function drawPlayer(c) {
  playerArr.forEach(function(player) {
    player.draw(c);
    player.teleport(canvasWidth);
    player.gravity(gameManager.gravity);
    player.respawn();
    player.platformPlayerCollision(platformArr);
    player.playerToPlayerCollision(p1, p2, gameManager);
  })
}

function drawGameText(c) {
  gameManager.gameOver(c);
  gameManager.scoreBox(c);
  gameManager.pauseText(c);
  gameManager.level2(mainPlatform, c);
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  drawPlatform(c)
  drawPlayer(c)
  drawGameText(c)
  lavaCollision();
  xMovement();
}

canvasStart.addEventListener('click', function() {
  gameManager.isRunning = true;
  if (gameManager.isRunning === true) {
    canvasStart.style.display = 'none';
    animate();
  }
})
