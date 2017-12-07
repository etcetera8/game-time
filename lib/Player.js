const GameElement = require('./GameElement.js');

class Player extends GameElement{
  constructor(x, y, sx, sy, swidth, sheight) {
    super(x, y, sx, sy, swidth, sheight);
    this.dx = 0;
    this.speed = 2;
    this.friction = 0.98;
    this.width = 28;
    this.height = 28;
    this.alive = true;
    this.timer = 0;
  }

  draw(c) {
    let sprite = new Image();
    sprite.src = "../images/sprites.png";
    c.drawImage(sprite, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
  }

  platformPlayerCollision(platformArr) {
    for (let i = 0; i < platformArr.length; i++) {
      let xDist = (this.x + this.width/2) - (platformArr[i].x + platformArr[i].width/2);
      let yDist = (this.y + this.height/2) - (platformArr[i].y + platformArr[i].height/2);
      let widthBtw = (this.width + platformArr[i].width)/2;      
      let heightBtw = (this.height + platformArr[i].height)/2;
      let crossWidth = widthBtw * yDist;
      let crossHeight = heightBtw * xDist;

      if(Math.abs(xDist) <= widthBtw && Math.abs(yDist) <= heightBtw) {
        if (crossWidth > crossHeight) {
          if (crossWidth > (-crossHeight) === true) {
            this.y = (platformArr[i].y + this.height)
          } else if (crossWidth > (-crossHeight) === false) {
            this.x -= 2;
          }
        } else if (crossWidth<crossHeight) {
          this.y = platformArr[i].y - this.height;
        }
      }
    }
  }

  playerToPlayerCollision(p1, p2, gameManager) {
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

  lavaCollision(p1, p2, gameManager) {
    if(p1.y >= 550 - p1.height) {
      p1.y = -20;
      console.log(gameManager.p1Lives);
      gameManager.p1Lives -= 1;
      p1.alive = false;
    }
    if(p2.y >= 550 - p2.height) {
      p2.y = -20;
      gameManager.p2Lives -= 1;
      p2.alive = false;
    }
  }

  teleport(canvasWidth) {
    if (this.x < 0) {
      this.x = canvasWidth - this.width;
    }
    if (this.x > canvasWidth-this.width/2) {
      this.x = 0;
    }
  }

  gravity(grav) {
      this.y += grav;
      if (this.y < 1) {
        this.y = 0;
      }
  }

  respawn(){
    if (this.alive === false) {
      if (this.timer <= 100) {
        this.x=350;
        this.y=400 - this.height;
        this.width = 0;
        this.timer++
      } else {
        this.width = 28;
        this.alive = true;
        this.timer = 0;
      }
    }
  }
  
} 

module.exports = Player;