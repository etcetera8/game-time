const GameElement = require('./GameElement.js');

class Player extends GameElement {
  constructor(x, y, sx, sy, swidth, sheight) {
    super(x, y, sx, sy, swidth, sheight);
    this.dx = 0;
    this.speed = 2;
    this.friction = 0.98;
    this.width = 28;
    this.height = 28;
    this.alive = true;
    this.timer = 0;
    this.lives = 3;
    this.points = 0;
  }

  draw(c) {
    let sprite = new Image();

    sprite.src = "../images/sprites.png";
    c.drawImage(sprite, this.sx, this.sy, this.swidth, this.sheight,
      this.x, this.y, this.width, this.height);
  }

  platformPlayerCollision(pArr) {
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
            this.y = (pArr[i].y + this.height)
          } else if (crossWidth > (-crossHeight) === false) {
            this.x -= 2;
          }
        } else if (crossWidth < crossHeight) {
          this.y = pArr[i].y - this.height;
        }
      }
    }
  }

  playerToPlayerCollision(player, death) {
    let xDist = (this.x + this.width / 2) - (player.x + player.width / 2);
    let yDist = (this.y + this.height / 2) - (player.y + player.height / 2);
    let widthBtw = this.width;
    let crossWidth = widthBtw * yDist;
    let crossHeight = widthBtw * xDist;

    if (Math.abs(xDist) <= widthBtw && Math.abs(yDist) <= widthBtw) {
      if (crossWidth > crossHeight) {
        if (crossWidth > (-crossHeight) === true ) {
          player.y -= 50;
          this.lives -= 1;
          death.play();
          this.alive = false;
        } else if (crossWidth > (-crossHeight) === false) {
          player.x += 4;
          this.x -= 4;
        }
      } else {
        if (crossWidth > -(crossHeight) === true) {
          player.x -= 4;
          this.x += 4;
        } else if (crossWidth > -(crossHeight) === false) {
          this.y -= 50;
          player.lives -= 1;
          death.play();
          player.alive = false;
        }
      }
    } 
  }

  playerToEnemyCollision(player, death) {
    let xDist = (this.x + this.width / 2) - (player.x + player.width / 2);
    let yDist = (this.y + this.height / 2) - (player.y + player.height / 2);
    let widthBtw = this.width;
    let crossWidth = widthBtw * yDist;
    let crossHeight = widthBtw * xDist;

    if (Math.abs(xDist) <= widthBtw && Math.abs(yDist) <= widthBtw) {
      if (crossWidth > crossHeight) {
        if (crossWidth > (-crossHeight) === true ) {
          player.y -= 50;
          this.lives -= 1;
          death.play();
          this.alive = false;
        } else if (crossWidth > (-crossHeight) === false) {
          player.x += 4;
          this.x -= 4;
        }
      } else {
        if (crossWidth > -(crossHeight) === true) {
          player.x -= 4;
          this.x += 4;
        } else if (crossWidth > -(crossHeight) === false) {
          this.y -= 50;
          player.lives -= 1;
          death.play();
        }
      }
    } 
  }

  getDistance(x1, y1, x2, y2) {
    let xDistance = x2-x1;
    let yDistance = y2-y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
  }

  playerToEggCollision(eggArr,c ) {
    eggArr.forEach( (egg, i) => {
      if (this.getDistance(this.x, this.y, egg.x, egg.y) - this.width < 0) {
        this.points += 250;
        eggArr.splice(i, 1)
        let secs = 0;
        c.font = "10px Arial";
        c.fillText("250", this.x, this.y-20)

        }
      }
    )
  }

  lavaCollision(death) {
    if (this.y >= 550 - this.height) {
      this.y = -20;
      this.lives -= 1;
      death.play();
      this.alive = false;
    }
  }

  fly(flap, player) {
    if (player === 'p1') {
      if (Math.sign(this.dx) === 1 ) {
        this.sx = 47;
        this.sy = 165;
      } //left sprite
      else if (Math.sign(this.dx) === -1) {
        this.sx = 342;
        this.sy = 162;
      }
      this.y -= 20;
      flap.play();
    } else if (player === 'p2') {
      if (Math.sign(this.dx) === 1 ) {
        this.sx = 47;
        this.sy = 114;
      } else if (Math.sign(this.dx) === -1) {
        this.sx = 346;
        this.sy = 115;
      }
      this.y -= 20;
      flap.play();
    }
  }

  teleport(canvasWidth) {
    if (this.x < 0) {
      this.x = canvasWidth - this.width;
    }
    if (this.x > canvasWidth - this.width / 2) {
      this.x = 0;
    }
  }

  gravity(grav) {
    this.y += grav;
    if (this.y < 1) {
      this.y = 0;
    }
  }

  respawn(respawn) {
    if (this.alive === false) {
      if (this.timer <= 100) {
        this.x = 350;
        this.y = 400 - this.height;
        this.width = 0;
        this.timer++
      } else {
        this.width = 28;
        respawn.play();
        this.alive = true;
        this.timer = 0;
      }
    }
  }

  displayPoints(p, c) {
    c.font="12px arial";
    c.fillStyle= "#fff"
    if (p === 'p1') {
      c.fillText(this.points, 480, 549)
    } else {
      c.fillText(this.points, 300, 549)
    }
  }
  
} 

module.exports = Player;