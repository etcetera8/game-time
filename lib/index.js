const Platform = require('./Platform.js');
const Player = require('./Player.js');

const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const gravity = 1;
const platformArr = [];
const playerArr = [];
const player2 = new Player(0, 325, 'pink');
const player1 = new Player(260, 300, '#00e9ff');
playerArr.push(player1, player2);
const mainPlatform = new Platform(0, 500, 800);
const topLeft = new Platform(0, 150, 100);
const topCenter = new Platform(275, 180, 175);
const topRight = new Platform((canvasWidth - 125), 150, 125);
const bottomLeft = new Platform(0, 350, 125);
const bottomCenter = new Platform(300, 400, 125);
const bottomRightA = new Platform(550, 325, 125);
const bottomRightB = new Platform((canvasWidth - 125), 350, 125);
platformArr.push(mainPlatform, topLeft, topCenter, topRight, bottomLeft, bottomCenter, bottomRightA, bottomRightB);
let p1 = playerArr[0];
let p2 = playerArr[1];

window.addEventListener('keydown', function() {
  let key = event.keyCode;
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

function playerToPlayerTopCollision() {
      // let xDist = (p1.x + p1.width/2) - (p2.x + p2.width/2);
      // let yDist = (p1.y + p1.height/2) - (p2.y + p2.height/2);
      // let widthBtw = (p1.width + p2.width)/2;      
      // let heightBtw = (p1.height + p2.height)/2;
      // let crossWidth = widthBtw * yDist;
      // let crossHeight = heightBtw * xDist;

      // if(Math.abs(xDist) <= widthBtw && Math.abs(yDist) <= heightBtw) {
      //   if (crossWidth > crossHeight) {
      //     console.log("botom")
      //     p1.y = p2.y + p1.height;
      //   } else if (crossWidth < crossHeight) {
      //     console.log("top")
      //     p1.y = p2.y - p1.height;
      //   }
      // }
      // && p1.x + p1.width > p2.x && p2.x > p1.x
  if (getDistance(p1.x, p1.y, p2.x, p2.y) - p1.height < 30 && p2.x + p2.width > p1.x) {
    console.log('p1 on top');
      p2.color = 'red';
    // p1.x += 2;
    // p2.x -= 2;
  } else {
    p2.color = 'pink';
  }
  // if (getDistance(p1.x, p1.y, p2.x, p2.y) < p1.height && p1.y < p2.y) {
  //   console.log('p1 on top');
  //   // p1.x -= 2;
  //   // p2.x +=2;
  // }    

}

function playerToPlayerSideCollision() {
  if (getDistance(p1.x, p1.y, p2.x, p2.y) - p1.width < 0 && p1.x > p2.x) {
    p1.x += 2;
    p2.x -= 2;
  }
  if (getDistance(p1.x, p1.y, p2.x, p2.y) < p1.width && p1.x < p2.x) {
    p1.x -= 2;
    p2.x +=2;
  }
}

function getDistance(p1x, p1y, p2x, p2y) {
  let xDist = p1x - p2x;
  let yDist = p1y - p2y;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  platformArr.forEach(function(platform) {
    platform.draw(c);
  })
  playerArr.forEach(function(player) {
    player.draw(c);
    player.teleport(canvasWidth);
    player.gravity(gravity);
  })
  console.log(getDistance(p1.x, p1.y, p2.x, p2.y))

  platformPlayerCollision();

  playerToPlayerTopCollision();
  playerToPlayerSideCollision();
}

animate();