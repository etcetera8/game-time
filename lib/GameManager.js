module.exports = class GameManager {
  constructor(p1Lives=3, p2Lives=3) {
    this.p1Lives = p1Lives;
    this.p2Lives = p2Lives;
    this.isRunning = false;
    this.isPaused = false;
  }

  

  gameOver() {
    if(this.p1Lives <= 0 || this.p2Lives <= 0) {
      console.log('gameOver');
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