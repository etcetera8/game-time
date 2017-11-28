class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 25;
    this.lives = 3;
  }

  draw(c) {
    c.fillStyle = 'pink';
    c.fillRect(this.x, this.y, this.width, this.height)
  }

  controls() {
    
  }
} 

module.exports = Player;