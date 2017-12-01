class Player {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = 24;
    this.height = 24;
    this.color = color;
    this.lives = 3;
    this.alive = true;
    this.timer = 0;
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

  gravity(gravity) {
      this.y += gravity;
      if (this.y < 1) {
        this.y = 0;
      }
  }

  respawn(spawnX, spawnY){
    if (this.alive === false) {

      if (this.timer <= 200) {
        this.x=350;
        this.y=400 - this.height;
        this.width = 0;
        this.timer++
      } else {
        this.width = 24;
        this.alive = true;
        this.timer = 0;
      }
    }
 
  };
} 

module.exports = Player;