const GameElement = require('./GameElement.js');

class Enemy {
  constructor(x, y, dx, dy, sx, sy, swidth, sheight) {
    this.x = x;
    this.y = y;
    this.sx = sx;
    this.sy = sy;
    this.swidth = swidth;
    this.sheight = sheight;
    this.dx = dx;
    this.dy = dy;
    this.width = 28;
    this.height = 28;
    this.lives = 1;
    this.alive = true;
  }

  draw(c) {
    let sprite = new Image(); 
    sprite.src = "../images/sprites.png";

    c.drawImage(sprite, this.sx, this.sy, this.swidth, this.sheight,
      this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  bounds(cWidth) {
    if (this.x + this.width > cWidth) {
      this.x = 0;
      this.x = this.dx;
     } 
    else if (this.x <= 0) {
      this.x = cWidth-this.width;
      this.dx = this.dx;
    }

    if (this.y + this.height > 500 || this.y < 0) {
      this.dy = -this.dy;
    }
  }

  platformEnemyCollision(pArr) {
    for (let i = 0; i < pArr.length; i++) {
      let xDist = (this.x + this.width / 2) - (pArr[i].x + pArr[i].width / 2);
      let yDist = (this.y + this.height / 2) - (pArr[i].y + pArr[i].height / 2);
      let widthBtw = (this.width + pArr[i].width) / 2;      
      let heightBtw = (this.height + pArr[i].height) / 2;
      let crossWidth = widthBtw * yDist;
      let crossHeight = heightBtw * xDist;

      if (Math.abs(xDist) <= widthBtw && Math.abs(yDist) <= heightBtw) {
        if (crossWidth > crossHeight) {
          if (crossWidth > (-crossHeight) === true) {
            this.y = (pArr[i].y + this.height)
          } else if (crossWidth > (-crossHeight) === false) {
            this.x -= 2;
          }
        } else if (crossWidth < crossHeight) {
          this.y = pArr[i].y - this.height;
        }
      }
    }

  }

}

module.exports = Enemy;