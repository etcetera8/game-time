class Platform {
  constructor(x, y, width, height = 15, sx, sy, swidth, sheight) {
    this.x = x;
    this.y = y;
    this.width = width; 
    this.height = height;
    this.sx = sx;
    this.sy = sy;
    this.swidth = swidth;
    this.sheight = sheight;
  }

  draw(c) {
    let sprite = new Image();
    sprite.src = "../images/sprites.jpg"
    c.drawImage(sprite, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height)
  }

  draw2(c) {
    let sprite2 = new Image();
    sprite2.src = "../images/sprites2.png"
    c.drawImage(sprite2, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height)

  }
}

module.exports = Platform;