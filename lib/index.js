const Platform = require('./Platform.js');
const Player = require('./Player.js');
const GameManager = require('./GameManager.js');
const Enemy = require('./Enemy.js');
const Egg = require('./Egg.js');
const gameManager = new GameManager();

const canvasStart = document.getElementById('canvas-start-page');
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const cWidth = canvas.width;

//Player Sprites 
const player1Start = new Player(610, 297, 204, 163, 40, 50);
const player2Start = new Player(38, 322, 515, 61, 40, 50);


//Badies
let enemyArr = [];
for (let i = 0; i < 5; i++) {
  let x = Math.random(Math.random() * (cWidth - 28));
  let y = Math.random() * (500 - 28);
  let dy = (Math.random() - 0.5) * 2;
  let dx = (Math.random() - 0.5) * 4;
  enemyArr.push(new Enemy(x, y, dx, dy, 48, 216, 33, 33))
}

//Egg
let eggArr = [];
//Platform Sprites
const scoreboardPlatform = new Platform(250, 500, 290, 100, 32, 194, 165, 38);
const mainPlatform = new Platform(0, 500, 800, 15, 0, 64, 300, 16);
const topLeft = new Platform(0, 150, 100, 15, 0, 0, 64, 16);
const topCenter = new Platform(275, 180, 175, 15, 180, 0, 180, 16);
const topRight = new Platform((cWidth - 125), 150, 125, 15, 72, 0, 100, 16);
const bottomLeft = new Platform(0, 350, 125, 15, 185, 0, 175, 16);
const bottomCenter = new Platform(300, 400, 125, 15, 232, 32, 132, 16);
const lowRightA = new Platform(550, 325, 125, 15, 0, 32, 116, 16);
const lowRightB = new Platform((cWidth - 130), 350, 130, 15, 116, 32, 108, 12);
const lava = new Platform(0, 550, 800, 100);

const death = new Audio('../audio/joust_lance.wav');
const flap = new Audio('../audio/joust_flap.wav');
const spawn = new Audio('../audio/joust_energize2.wav')
const respawn = new Audio('../audio/joust_energize1.wav')
const platformArr = [];

platformArr.push(mainPlatform, topLeft, topCenter, topRight, 
  bottomLeft, bottomCenter, lowRightA, lowRightB);
const playerArr = [];

playerArr.push(player1Start, player2Start);
let p1 = playerArr[0];
let p2 = playerArr[1];
let keys = {};

canvasStart.addEventListener('click', function() {
  gameManager.isRunning = true;
  if (gameManager.isRunning === true) {
    canvasStart.style.display = 'none';
    spawn.play();
    animate();
  }
})

canvas.addEventListener('click', function() {
  window.location.reload();
})

window.addEventListener('keyup', function(e) {
  gameManager.pausePosition(c, e.keyCode);
})

window.addEventListener('keydown', function() {
  let key = event.keyCode;

  event.preventDefault();
  if (gameManager.isPaused === true) {
    //DO NOTHING GAME PAUSED
  } else {
    if (key === 87) {
      p2.y -= 20;
      flap.play();
    }
    if (key === 38) {
      p1.y -= 20;
      flap.play();
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
    player.teleport(cWidth);
    player.gravity(gameManager.gravity);
    player.respawn(respawn);
    player.platformPlayerCollision(platformArr);
    player.lavaCollision(death);
    enemyArr.forEach(function(enemy) {
      player.playerToEnemyCollision(enemy, death) 
    })
  })
    p1.playerToPlayerCollision(p2, death);
    p2.playerToPlayerCollision(p1, death);
}

function drawGameText(c) {
  gameManager.gameOver(c, playerArr);
  gameManager.scoreBox(c, playerArr);
  gameManager.pauseText(c);
  gameManager.level2(mainPlatform, c, playerArr);
}

function drawEnemy(c) {
  enemyArr.forEach((enemy, i, arr) => {
    enemy.draw(c)
    enemy.move()
    enemy.bounds(cWidth)
    enemy.platformEnemyCollision(platformArr);
    enemy.enemyToEnemyCollision(enemyArr);
    enemy.track(enemy, i);
    if(enemy.alive === false) {
      let egg = new Egg(enemyArr[i].x, enemyArr[i].y, 280, 250, 18, 18);
      eggArr.push(egg)
      console.log(eggArr)
      enemyArr.splice(i, 1)
    }
  })
}

function drawEgg(c) {
  eggArr.forEach(function(egg) {
    egg.draw(c);
    egg.gravity();
    egg.eggToPlatformCollision(platformArr)
  })
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  drawPlatform(c);
  drawPlayer(c);
  drawGameText(c);
  xMovement();
  drawEnemy(c)
  drawEgg(c)
  }