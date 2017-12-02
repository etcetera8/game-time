const canvasStart = document.getElementById('canvas-start-page');
const cStart = canvasStart.getContext('2d');


const Platform = require('./Platform.js');
const Player = require('./Player.js');
const GameManager = require('./GameManager.js');

const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const gravity = 1;
const platformArr = [];
const playerArr = [];
const player2 = new Player(150, 325, 'pink');
const player1 = new Player(260, 300, '#00e9ff');
const gameManager = new GameManager();
playerArr.push(player1, player2);
const scoreboardPlatform = new Platform(250, 500, 290, 100, 32, 194, 165, 38);
const mainPlatform = new Platform(0, 500, 800, 15, 0, 64, 300, 16);
const topLeft = new Platform(0, 150, 100, 15, 0, 0, 64, 16);
const topCenter = new Platform(275, 180, 175, 15, 180, 0, 180, 16);
const topRight = new Platform((canvasWidth - 125), 150, 125, 15, 72, 0, 100, 16);
const bottomLeft = new Platform(0, 350, 125, 15, 185, 0, 175, 16);
const bottomCenter = new Platform(300, 400, 125, 15, 232, 32, 132, 16);
const bottomRightA = new Platform(550, 325, 125, 15, 0, 32, 116, 16);
const bottomRightB = new Platform((canvasWidth - 130), 350, 130, 15, 116, 32, 108, 12);
platformArr.push(mainPlatform, topLeft, topCenter, topRight, bottomLeft, bottomCenter, bottomRightA, bottomRightB);
let p1 = playerArr[0];
let p2 = playerArr[1];

window.addEventListener('keydown', function() {
  let key = event.keyCode;
  event.preventDefault();
  //p1 controls
  if(key === 37) {
    playerArr[0].x -= 10;
  }
  if(key === 38) {
    playerArr[0].y -= 15;
  }
  if(key === 39) {
    playerArr[0].x += 10;
  }
  //p2 controls
  if(key === 65) {
    playerArr[1].x -= 10;
  }
  if(key === 87) {
    playerArr[1].y -= 15;
  }
  if(key === 68) {
    playerArr[1].x += 10;
  }
})

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
          playerArr[j].y = platformArr[i].y + playerArr[j].height+5;
        } else if (crossWidth<crossHeight) {
          playerArr[j].y = platformArr[i].y - playerArr[j].height;
        }
      }
    }
  }
}

function playerToPlayerCollision() {
        
        let xDist = (p1.x + p1.width/2) - (p2.x + p2.width/2);
        let yDist = (p1.y + p1.height/2) - (p2.y + p2.height/2);
        let widthBtw = p1.width;
        let crossWidth = widthBtw * yDist;
        let crossHeight = widthBtw * xDist;

        if(Math.abs(xDist) <= widthBtw && Math.abs(yDist) <= widthBtw) {
          if (crossWidth > crossHeight) {
            if (crossWidth > (-crossHeight) === true ) {
              console.log('p2 bottom')
              p2.y -= 50;
              gameManager.p1Lives -= 1;
              p1.alive = false;
            } else if (crossWidth > (-crossHeight) === false) {
              console.log('p2 left')
              p2.x += 2;
              p1.x -= 2;
            }
          } else {
            if (crossWidth >-(crossHeight) === true) {
              console.log('p2 right')
              p2.x -= 2;
              p1.x += 2;
            } else if (crossWidth >-(crossHeight) === false) {
              console.log('p2 top')
              p1.y -= 50;
              gameManager.p2Lives -= 1;
              p2.alive = false;
              console.log(gameManager.p2Lives);
          }
        }
      } 
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  scoreboardPlatform.draw2(c);
  //lava.draw2(c)
  platformArr.forEach(function(platform) {
    platform.draw(c);
  })
  playerArr.forEach(function(player) {
    player.draw(c);
    player.teleport(canvasWidth);
    player.gravity(gravity);
    player.respawn()
  })
  platformPlayerCollision();
  playerToPlayerCollision();
  gameManager.gameOver();
  gameManager.scoreBoxP1(c, 355, 551);
  gameManager.scoreBoxP2(c, 410, 551);
  gameManager.startPageDraw(cStart)
}

canvasStart.addEventListener('click', function() {
  gameManager.isRunning = true;
  if(gameManager.isRunning === true) {
    canvasStart.style.display = 'none';
    animate();
  }
})
