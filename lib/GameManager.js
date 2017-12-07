module.exports = class GameManager {
  constructor() {
    this.isRunning = false;
    this.isPaused = false;
    this.timer = 0;
    this.gravity = 1;
  }

  gameOver(c, playerArr) {
    function textDisplay(winNum, loseNum) {
      c.font = "72px impact";
      c.strokeStyle = 'yellow';
      c.strokeText("Player " + winNum + " Victory", 175, 300);
      c.strokeText("Player " + loseNum + " Buzzard Bait", 110, 400);
    }
    
    if (playerArr[0].lives <= 0 || playerArr[1].lives <= 0) {
      if (this.timer <= 500) {
        this.timer++;
        if (playerArr[0].lives === 0) {
          textDisplay(2, 1);
        } else if (playerArr[1].lives === 0) {
          textDisplay(1, 2);
        }
      } else {
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

  pausePosition(c, keycode) {
    if (keycode === 32) {
      if (!this.isPaused) {
        this.isPaused = true;
        this.gravity = 0;
      } else if (this.isPaused === true) {
        this.isPaused = false;
        this.gravity = 1; 
      }
    }
  }

  scoreBox(c, arr) {
    
    c.font = "12px arial";
    c.fillStyle = '#ffffff';
    c.fillText('RESET GAME', 358, 585);

    function lifeDisplay(text, x = 410, y = 551) {
      c.font = "20px arial";
      c.fillStyle = '#ffffff';
      c.fillText(text, x, y);
    }

    const textArr = [ "  I", " I I", "I I I"];

      for (let i = 3; i > 0; i--) {
        if (arr[0].lives === i) {
          lifeDisplay(textArr[i - 1]);
        }
        if (arr[1].lives === i) {
          lifeDisplay(textArr[i - 1], 355, 551);
        }
      }
  } 

  level2(mainPlatform, c, playerArr) {
    if (playerArr[0].lives < 3 || playerArr[1].lives < 3) {
      if (this.timer <= 200) {
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