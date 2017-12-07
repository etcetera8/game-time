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

  platformEnemyCollision() {

  }

}

module.exports = Enemy;