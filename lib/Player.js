class Player {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 25;
    this.color = color;
    this.lives = 3;
  }

  draw(c) {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height)
  }

  teleport(canvasWidth) {
    if (this.x < 0) {
      this.x = canvasWidth - this.width;
    }
    if (this.x > canvasWidth-this.width/2) {
      this.x = 0;
    }
  }

  gravity(gravity, canvasHeight) {
    if (this.y >= canvasHeight-this.height) {
      this.y = canvasHeight-this.height;
    } else {
      this.y += gravity;
    }
  }
} 

module.exports = Player;