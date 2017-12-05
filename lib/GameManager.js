module.exports = class GameManager {
  constructor(p1Lives=3, p2Lives=3) {
    this.p1Lives = p1Lives;
    this.p2Lives = p2Lives;
    this.isRunning = false;
    this.isPaused = false;
    this.timer = 0;
  }

  startPageDraw(cStart) {
    const logo = new Image();
    logo.src = "../images/joustLogo3.png";
    cStart.drawImage(logo, 0, 0)
    cStart.font = '12px arial';
    cStart.fillStyle = 'black'
    cStart.fillText('Player 1 Controls - Left Arrow = left, Right Arrow = Right, Up Arrow = Fly', 5,225)
    cStart.fillText('Player 2 Controls - "A" = left, "D" = Right, "W" = Fly', 5, 255)
    cStart.font = '30px arial';
    cStart.fillStyle = '#FFF795';
    cStart.fillText("Start", 160, 325);
  }

  gameOver(c) {
    if(this.p1Lives <= 0 || this.p2Lives <= 0) {
      if (this.timer <= 400) {
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

  level2(mainPlatform, c){
    if (this.p1Lives < 3 || this.p2Lives < 3) {
      console.log(this.p2Lives);
      if(this.timer <= 200) {
        this.timer++;
        c.font = "38px impact";
        c.strokeStyle = "yellow";
        c.strokeText("Level 2", 350, 150);
        c.strokeText("That's not a bird bath, It's Lava!", 170, 250);
      } else {
        mainPlatform.x = 200;
        mainPlatform.width = 400;
      }
    }
  }

}