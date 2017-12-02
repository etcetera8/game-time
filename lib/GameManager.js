module.exports = class GameManager {
  constructor(p1Lives=3, p2Lives=3) {
    this.p1Lives = p1Lives;
    this.p2Lives = p2Lives;
  }

  startPageDraw(cStart) {
    const logo = new Image();
    logo.src = "../images/joustLogo3.png"
    cStart.drawImage(logo, 0, 0, 400, 200)
    cStart.font = '12px arial';
    cStart.fillStyle = 'black'
    cStart.fillText('Player 1 Controls - Left Arrow = left, Right Arrow = Right, Up Arrow = Fly', 5,225)
    cStart.fillText('Player 2 Controls - "A" = left, "D" = Right, "W" = Fly', 5,255)
    cStart.font = '30px arial';
    cStart.fillStyle = '#FFF795';
    cStart.fillText("Start", 160, 325);
  }

  gameOver() {
    if(this.p1Lives <= 0 || this.p2Lives <= 0) {
      console.log('gameOver');
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
        c.fillText(" I I", x, y);
        break;

      case 1:
        c.font = "20px arial";
        c.fillStyle = '#ffffff';
        c.fillText("  I", x, y);
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