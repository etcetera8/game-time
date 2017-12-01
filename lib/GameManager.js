module.exports = class GameManager {
  constructor(p1Lives=3, p2Lives=3) {
    this.p1Lives = p1Lives;
    this.p2Lives = p2Lives;
  }

  gameOver() {
    if(this.p1Lives <= 0 || this.p2Lives <= 0) {
      console.log('gameOver');
    }
  }
}