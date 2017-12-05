const canvasStart = document.getElementById('canvas-start-page');
const cStart = canvasStart.getContext('2d');
const logo = new Image();
logo.src = "../images/joustLogo3.png";
let keys = [];

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


window.addEventListener('keyup', (e) => (gameManager.pausePosition(c, e.keyCode)))

//refactor into player
function platformPlayerCollision() {
  for (let i = 0; i < platformArr.length; i++) {
    for (let j = 0; j < playerArr.length; j++) {
      let xDist = (playerArr[j].x + playerArr[j].width/2) - (platformArr[i].x + platformArr[i].width/2);
      let yDist = (playerArr[j].y + playerArr[j].height/2) - (platformArr[i].y + platformArr[i].height/2);
      let widthBtw = (playerArr[j].width + platformArr[i].width)/2;      
      let heightBtw = (playerArr[j].height + platformArr[i].height)/2;
      let crossWidth = widthBtw * yDist;
      let crossHeight = heightBtw * xDist;

      if(Math.abs(xDist) <= widthBtw && Math.abs(yDist) <= heightBtw) {
        if (crossWidth > crossHeight) {
          if (crossWidth > (-crossHeight) === true) {
            playerArr[j].y = (platformArr[i].y + playerArr[j].height)
          } else if (crossWidth > (-crossHeight) === false) {
            playerArr[j].x -= 2;
          }
        } else if (crossWidth<crossHeight) {
          playerArr[j].y = platformArr[i].y - playerArr[j].height;
        }
      }
    }
  }
}

//refactor into player
function playerToPlayerCollision() {
        let xDist = (p1.x + p1.width/2) - (p2.x + p2.width/2);
        let yDist = (p1.y + p1.height/2) - (p2.y + p2.height/2);
        let widthBtw = p1.width;
        let crossWidth = widthBtw * yDist;
        let crossHeight = widthBtw * xDist;
        if(Math.abs(xDist) <= widthBtw && Math.abs(yDist) <= widthBtw) {
          if (crossWidth > crossHeight) {
            if (crossWidth > (-crossHeight) === true ) {
              p2.y -= 50;
              gameManager.p1Lives -= 1;
              p1.alive = false;
            } else if (crossWidth > (-crossHeight) === false) {
              p2.x += 4;
              p1.x -= 4;
            }
          } else {
            if (crossWidth > -(crossHeight) === true) {
              p2.x -= 4;
              p1.x += 4;
            } else if (crossWidth > -(crossHeight) === false) {
              p1.y -= 50;
              gameManager.p2Lives -= 1;
              p2.alive = false;
          }
        }
      } 
}

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
    player.respawn()
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
  cStart.drawImage(logo, 0, 0)
  drawPlatform(c)
  drawPlayer(c)
  drawGameText(c)
  platformPlayerCollision();
  playerToPlayerCollision();
  player1Start.keyController(keys, 1, gameManager);
  player2Start.keyController(keys, 2, gameManager);
  lavaCollision();
}

canvasStart.addEventListener('click', function() {
  gameManager.isRunning = true;
  if (gameManager.isRunning === true) {
    canvasStart.style.display = 'none';
    animate();
  }
})
