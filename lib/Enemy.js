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

  enemyToPlayerCollision(p1, p2, gameManager, death) {
    let xDist = (p1.x + p1.width / 2) - (p2.x + p2.width / 2);
    let yDist = (p1.y + p1.height / 2) - (p2.y + p2.height / 2);
    let widthBtw = p1.width;
    let crossWidth = widthBtw * yDist;
    let crossHeight = widthBtw * xDist;

    if (Math.abs(xDist) <= widthBtw && Math.abs(yDist) <= widthBtw) {
      if (crossWidth > crossHeight) {
        if (crossWidth > (-crossHeight) === true ) {
          p2.y -= 50;
          gameManager.p1Lives -= 1;
          death.play();
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
          death.play();
          p2.alive = false;
        }
      }
    } 
  }

}

module.exports = Enemy;