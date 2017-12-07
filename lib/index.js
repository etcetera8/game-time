const Platform = require('./Platform.js');
const Player = require('./Player.js');
const GameManager = require('./GameManager.js');
const gameManager = new GameManager();

const canvasStart = document.getElementById('canvas-start-page');
const cStart = canvasStart.getContext('2d');
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

//Player Sprites 
const player1Start = new Player(610, 297, 204, 163, 40, 50);
const player2Start = new Player(38, 322, 515, 61, 40, 50);

//Platform Sprites
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

const platformArr = [];
platformArr.push(mainPlatform, topLeft, topCenter, topRight, bottomLeft, bottomCenter, bottomRightA, bottomRightB);
const playerArr = [];
playerArr.push(player1Start, player2Start);
let p1 = playerArr[0];
let p2 = playerArr[1];
let keys = {};

canvasStart.addEventListener('click', function() {
  gameManager.isRunning = true;
  if (gameManager.isRunning === true) {
    canvasStart.style.display = 'none';
    animate();
  }
})

window.addEventListener('keyup', (e) => (gameManager.pausePosition(c, e.keyCode)))

window.addEventListener('keydown', function() {
  let key = event.keyCode;
  event.preventDefault();
  if (gameManager.isPaused === true) {
    //DO NOTHING GAME PAUSED
  } else {
    if(key === 87) {
      p2.y -= 20;
    }
    if(key === 38) {
      p1.y -= 20;
    }
  }
})

function xMovement() {
  window.addEventListener('keydown', function(event) {
    event.preventDefault();
    keys[event.keyCode] = true;
  })

  window.addEventListener('keyup', function(event) {
    keys[event.keyCode] = false;
  })

  function right(p) {
    return p.dx < p.speed;
  } 

  function left(p) {
    return p.dx > -p.speed;
  }

  function moveRight(p, sx, sy) {
    p.sx = sx;
    p.sy = sy;
    p.dx++;
  }

  function moveLeft(p, sx, sy) {
    p.sx = sx;
    p.sy = sy;
    p.dx--;
  }

  if (gameManager.isPaused === true) {
      //DO NOTHING GAME PAUSED
  } else {
      if (keys[39] && right(p1)) {
        moveRight(p1, 513, 111);
      }
      if (keys[37] && left(p1)) {
        moveLeft(p1, 204, 163);
      }
      if (keys[68] && right(p2)) {
        moveRight(p2, 515, 61);
      }
      if (keys[65] && left(p2)) {
        moveLeft(p2, 219, 110);
      }
      p1.dx *= p1.friction;
      p2.dx *= p2.friction;
      p1.x += p1.dx;
      p2.x += p2.dx;
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
    player.lavaCollision(p1, p2, gameManager);
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
  drawPlatform(c);
  drawPlayer(c);
  drawGameText(c);
  xMovement();
}

