const GameElement = require('./GameElement.js');

class Player extends GameElement{
  constructor(x, y, sx, sy, swidth, sheight) {
    super(x, y, sx, sy, swidth, sheight);
    this.dx = 0;
    this.speed = 2;
    this.friction = 0.98;
    this.width = 28;
    this.height = 28;
    this.lives = 3;
    this.alive = true;
    this.timer = 0;
  }

  //Move out to index
  //make map of keys with individula move functions
  //add y movement in here too
  keyController(keys, player, gameManager) {
    window.addEventListener('keydown', function(event) {
      event.preventDefault();
      keys[event.keyCode] = true;
    })

    window.addEventListener('keyup', function(event) {
      keys[event.keyCode] = false;
    })
    if (gameManager.isPaused === true) {
      //DO NOTHING GAME PAUSED
    } else {
      if (player == 1) {
        if (keys[39]) {
          if(this.dx < this.speed) {
            this.dx++;
          }
        }
        if (keys[37]) {
          if (this.dx > -this.speed) {
            this.dx--;
          }
        }
      }
      if (player == 2) {
        if (keys[68]) {
          if(this.dx < this.speed) {
            this.dx++;
          }
        }
        if (keys[65]) {
          if (this.dx > -this.speed) {
            this.dx--;
          }
        }
      }
      this.dx *= this.friction;
      this.x += this.dx;
    }
  }

  draw(c) {
    let sprite = new Image();
    sprite.src = "../images/sprites.png";
    c.drawImage(sprite, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
  }

  teleport(canvasWidth) {
    if (this.x < 0) {
      this.x = canvasWidth - this.width;
    }
    if (this.x > canvasWidth-this.width/2) {
      this.x = 0;
    }
  }

  gravity(grav) {
      this.y += grav;
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
        this.width = 28;
        this.alive = true;
        this.timer = 0;
      }
    }
  }
  
} 

module.exports = Player;