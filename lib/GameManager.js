module.exports = class GameManager {
  constructor(p1Lives=3, p2Lives=3) {
    this.p1Lives = p1Lives;
    this.p2Lives = p2Lives;
    this.isRunning = false;
    this.isPaused = false;
    this.timer = 0;
  }

//For loop with changing font in arr
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

//REfactor each scorebox with text into array
  scoreBox(c) {
    function lifeDisplay(text, x=410, y = 551) {
      c.font = "20px arial";
      c.fillStyle = '#ffffff';
      c.fillText(text, x, y);
    }

    const textArr = [ "  I", " I I", "I I I"];

    for(let i = 3; i > 0; i--) {
      if(this.p1Lives === i) {
        lifeDisplay(textArr[i - 1]);
      }
      if(this.p2Lives === i) {
        lifeDisplay(textArr[i - 1], 355, 551);
      }
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