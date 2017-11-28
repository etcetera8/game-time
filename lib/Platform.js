class Platform {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width; 
    this.height = 15;
  }

  draw(c) {
    c.fillStyle = 'brown';
    c.fillRect(this.x, this.y, this.width, this.height)
  }
}

module.exports = Platform;