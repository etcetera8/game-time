module.exports = class GameManager {
  constructor(p1Lives=3, p2Lives=3) {
    this.p1Lives = p1Lives;
    this.p2Lives = p2Lives;
    this.isRunning = false;
    this.isPaused = false;
    this.timer = 0;
  }

  gameOver(c) {
    if(this.p1Lives <= 0 || this.p2Lives <= 0) {
      if (this.timer <= 200) {
        this.timer++;
        if(this.p1Lives === 0) {
          c.font = "72px impact";
          c.strokeStyle = 'yellow';
          c.strokeText("Player 2 Victory", 175, 300);
          c.strokeText("Player 1 Buzzard Bait", 110, 400)
    } else if(this.p2Lives === 0) {
        c.font = "72px impact";
          c.strokeStyle = 'yellow';
          c.strokeText("Player 1 Victory", 175, 300);
          c.strokeText("Player 2 Buzzard Bait", 110, 400)
    }
      } else{
        window.location.reload();
      }
    }
  }

  pauseText(c) {
    if (this.isPaused === true) {
      c.font = "72px impact";
      c.strokeStyle = "yellow";
      c.strokeText("Lower Thy Lance!", 150, 300)
    }
  }

  scoreBoxP1(c, x, y) {
    switch(this.p1Lives) {
      case 3:
        c.font = "20px arial";
        c.fillStyle = '#ffffff';
        c.fillText("I I I", x, y);
        break;

      case 2:
        c.font = "20px arial";
        c.fillStyle = '#ffffff';
        c.fillText("I I", x, y);
        break;

      case 1:
        c.font = "20px arial";
        c.fillStyle = '#ffffff';
        c.fillText("I", x, y);
        break;
    }
  }

  scoreBoxP2(c, x, y) {
    switch(this.p2Lives) {
      case 3:
        c.font = "20px arial";
        c.fillStyle = '#ffffff';
        c.fillText("I I I", x, y);
        break;

      case 2:
        c.font = "20px arial";
        c.fillStyle = '#ffffff';
        c.fillText("I I", x, y);
        break;

      case 1:
        c.font = "20px arial";
        c.fillStyle = '#ffffff';
        c.fillText("I", x, y);
        break;
    }
  }
}