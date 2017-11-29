const Platform = require('./Platform.js');
const Player = require('./Player.js');

const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const gravity = 1;
const platformArr = [];
const playerArr = [];
const player2 = new Player(100, 325, 'pink');
const player1 = new Player(550, 300, '#00e9ff');
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

window.addEventListener('keyup', function() {
  let key = event.keyCode;
  console.log(playerArr[0])
  //p1 controls
  if(key === 37) {
    playerArr[0].x -= 10;
  }
  if(key === 38) {
    playerArr[0].y -= 10;
  }
  if(key === 39) {
    playerArr[0].x += 10;
  }
  //p2 controls
  if(key === 65) {
    playerArr[1].x -= 10;
  }
  if(key === 87) {
    playerArr[1].y -= 10;
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
      let hypotenuse = Math.sqrt((xDist * 2) + (widthBtw * 2));
     // ****check out get distance function****

      // console.log(hypotenuse);

      // if(hypotenuse === 0) {
      //   playerArr[j].color = 'yellow';
      // }
    }
  }
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
    player.gravity(gravity, canvasHeight);
  })
  platformPlayerCollision();
}

animate();