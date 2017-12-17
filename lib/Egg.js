const GameElement = require('./GameElement.js');

class Egg extends GameElement {
  constructor(x, y, sx, sy, swidth, sheight) {
  super(x, y, sx, sy, swidth, sheight);
  this.points = 250;
  this.width = 28;
  this.height = 28;
  this.grav = 1;
  this.points = 250;
  }

draw(c) {
  let sprite = new Image(); 
  sprite.src = "../images/sprites.png";

  c.drawImage(sprite, this.sx, this.sy, this.swidth, this.sheight,
      this.x, this.y, this.width, this.height)
  }

  gravity() {
    this.y += this.grav;
    if (this.y < 1) {
      this.y = 0;
    }
  }

  eggToPlatformCollision(pArr) {
    for (let i = 0; i < pArr.length; i++) {
      let xDist = (this.x + this.width / 2) - (pArr[i].x + pArr[i].width / 2);
      let yDist = (this.y + this.height / 2) - (pArr[i].y + pArr[i].height / 2);
      let widthBtw = (this.width + pArr[i].width) / 2;      
      let heightBtw = (this.height + pArr[i].height) / 2;
      let crossWidth = widthBtw * yDist;
      let crossHeight = heightBtw * xDist;

      if (Math.abs(xDist) <= widthBtw && Math.abs(yDist) <= heightBtw) {
        if (crossWidth > crossHeight) {
          //if (crossWidth  > (-crossHeight) === true) {
            this.y = (pArr[i].y - this.height)
            this.grav = 0;
          //} 
        }
      }
    }
  }

  getDistance(x1, y1, x2, y2) {
    let xDistance = x2-x1;
    let yDistance = y2-y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
  }

  eggToPlayerCollision(playerArr) {
    playerArr.forEach(player => {
      console.log(player.x)
      if (this.getDistance(this.x, this.y, player.x, player.y) - this.width < 0) {
        console.log('touching')
        
      } else {
        console.log("not touching");
      }
    })
  }
}

module.exports = Egg;