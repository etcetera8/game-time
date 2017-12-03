class Player {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.speed = 2;
    this.friction = 0.98;
    this.width = 24;
    this.height = 24;
    this.color = color;
    this.lives = 3;
    this.alive = true;
    this.timer = 0;

  }

  keyController1(keys, player, gameManager) {
    document.body.addEventListener('keydown', function(event) {
      event.preventDefault();
      keys[event.keyCode] = true;
    })

    document.body.addEventListener('keyup', function(event) {
      keys[event.keyCode] = false;
    })
    if (gameManager.isPaused === true) {
      //do nothing
    } else {


    if (keys[39]) {
      if(player.dx < this.speed) {
        player.dx++;
      }
    }

    if (keys[37]) {
      if (player.dx > -this.speed) {
        player.dx--;
      }
    }
    this.dx *= this.friction;
    this.x += this.dx;
    }
  }

    keyController2(keys, player, gameManager) {
    document.body.addEventListener('keydown', function(event) {
      event.preventDefault();
      keys[event.keyCode] = true;
    })

    document.body.addEventListener('keyup', function(event) {
      keys[event.keyCode] = false;
    })

    if (gameManager.isPaused === true) {
      //do nothing
    } else {
    if (keys[68]) {
      if(player.dx < this.speed) {
        player.dx++;
      }
    }

    if (keys[65]) {
      if (player.dx > -this.speed) {
        player.dx--;
      }
    }
    this.dx *= this.friction;
    this.x += this.dx;
    }
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