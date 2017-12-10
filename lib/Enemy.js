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
    this.timer = 0;
  }

  draw(c) {
    let sprite = new Image(); 
    sprite.src = "../images/sprites.png";

    if (this.dx > 0) {
    c.drawImage(sprite, this.sx, this.sy, this.swidth, this.sheight,
      this.x, this.y, this.width, this.height);
    } else if ( this.dx < 0) {
      c.drawImage(sprite, 354, 216, 35, this.sheight,
      this.x, this.y, this.width, this.height);
    }
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.timer < Math.random()*200) {
      this.timer++
    } else {
      if (this.timer < Math.random()*50) {
              this.dy += (Math.random() - 0.5) * 2;
              this.dx += (Math.random() - 0.5) * 3;
              this.timer++
      }   
    }
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
            this.dy = -this.dy;
          } else if (crossWidth > (-crossHeight) === false) {
            this.dx = -this.dx;
          }
        } else if (crossWidth < crossHeight) {
          this.dy = -this.dy
        }
      }
    }
  }

  getDistance(x1, y1, x2, y2) {
    let xDistance = x2-x1;
    let yDistance = y2-y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
  }

  enemyToEnemyCollision(enemyArr) {
    for (let i = 0; i < enemyArr.length; i++) {
      if (this === enemyArr[i]) continue;

      if (this.getDistance(this.x, this.y, enemyArr[i].x, enemyArr[i].y) - this.width  < 0) {
        this.x += 5;
        enemyArr[i].x -= 5;
        this.dx = -this.dx;
        this.dy = -this.dy;
        enemyArr[i].dx = -enemyArr[i].dy;
        enemyArr[i].dy = enemyArr[i].dx;  
      }
    }
    }
  }

module.exports = Enemy;