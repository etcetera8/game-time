const GameElement = require('./GameElement.js');

class Platform extends GameElement {
  constructor(x, y, width, height = 15, sx, sy, swidth, sheight) {
    super(x, y, sx, sy, swidth, sheight);
    this.width = width;
    this.height = height
  }

  draw(c) {
    let sprite = new Image();

    sprite.src = "../images/sprites.jpg";
    c.drawImage(sprite, this.sx, this.sy, this.swidth, this.sheight,
      this.x, this.y, this.width, this.height);
  }

  draw2(c) {
    let sprite2 = new Image();

    sprite2.src = "../images/sprites2background.png";
    c.drawImage(sprite2, this.sx, this.sy, this.swidth, this.sheight,
      this.x, this.y, this.width, this.height);
  }

  drawLava(c) {
    c.fillStyle = "red";
    c.fillRect(this.x, this.y, this.width, this.height);
  }
}

module.exports = Platform;