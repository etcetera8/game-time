class Platform {
  constructor(x, y, width, sx, sy, swidth, sheight) {
    this.x = x;
    this.y = y;
    this.width = width; 
    this.height = 15;
    this.sx = sx;
    this.sy = sy;
    this.swidth = swidth;
    this.sheight = sheight;
  }

  draw(c,) {
    // c.fillStyle = 'brown';
    // c.fillRect(this.x, this.y, this.width, this.height)
    //context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
    //
    let sprite= new Image();
    sprite.src = "../sprites.jpg"

    c.drawImage(sprite, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height)
  }
}

module.exports = Platform;