/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	const Platform = __webpack_require__(1);
	const Player = __webpack_require__(3);
	const GameManager = __webpack_require__(4);
	const Enemy = __webpack_require__(5);
	const Egg = __webpack_require__(6);
	const gameManager = new GameManager();

	const canvasStart = document.getElementById('canvas-start-page');
	const canvas = document.getElementById('canvas');
	const c = canvas.getContext('2d');
	const cWidth = canvas.width;

	//Player Sprites 
	const player1Start = new Player(610, 297, 204, 163, 39, 42);
	const player2Start = new Player(38, 322, 515, 61, 40, 45);

	//Badies
	let enemyArr = [];
	for (let i = 0; i < 5; i++) {
	  let x = Math.random(Math.random() * (cWidth - 28));
	  let y = Math.random() * (500 - 28);
	  let dy = (Math.random() - 0.5) * 2;
	  let dx = (Math.random() - 0.5) * 4;
	  enemyArr.push(new Enemy(x, y, dx, dy, 48, 216, 33, 33));
	}

	//Egg
	const eggArr = [];
	//Platform Sprites
	const scoreboardPlatform = new Platform(250, 500, 290, 100, 32, 194, 165, 38);
	const mainPlatform = new Platform(0, 500, 800, 15, 0, 64, 300, 16);
	const topLeft = new Platform(0, 150, 100, 15, 0, 0, 64, 16);
	const topCenter = new Platform(275, 180, 175, 15, 180, 0, 180, 16);
	const topRight = new Platform(cWidth - 125, 150, 125, 15, 72, 0, 100, 16);
	const bottomLeft = new Platform(0, 350, 125, 15, 185, 0, 175, 16);
	const bottomCenter = new Platform(300, 400, 125, 15, 232, 32, 132, 16);
	const lowRightA = new Platform(550, 325, 125, 15, 0, 32, 116, 16);
	const lowRightB = new Platform(cWidth - 130, 350, 130, 15, 116, 32, 108, 12);
	const lava = new Platform(0, 550, 800, 100);

	const death = new Audio('../audio/joust_lance.wav');
	const flap = new Audio('../audio/joust_flap.wav');
	const spawn = new Audio('../audio/joust_energize2.wav');
	const respawn = new Audio('../audio/joust_energize1.wav');
	const platformArr = [];

	platformArr.push(mainPlatform, topLeft, topCenter, topRight, bottomLeft, bottomCenter, lowRightA, lowRightB);
	const playerArr = [];

	playerArr.push(player1Start, player2Start);
	let p1 = playerArr[0];
	let p2 = playerArr[1];
	let keys = {};

	canvasStart.addEventListener('click', function () {
	  gameManager.isRunning = true;
	  if (gameManager.isRunning === true) {
	    canvasStart.style.display = 'none';
	    spawn.play();
	    animate();
	  }
	});

	canvas.addEventListener('click', function () {
	  window.location.reload();
	});

	window.addEventListener('keyup', function (e) {
	  gameManager.pausePosition(c, e.keyCode);
	});

	window.addEventListener('keydown', function () {
	  let key = event.keyCode;

	  event.preventDefault();
	  if (gameManager.isPaused === true) {
	    //DO NOTHING GAME PAUSED
	  } else {
	    if (key === 87) {
	      p2.fly(flap, 'p2');
	    }
	    if (key === 38) {
	      p1.fly(flap, 'p1');
	    }
	  }
	});

	function xMovement() {
	  window.addEventListener('keydown', function (event) {
	    event.preventDefault();
	    keys[event.keyCode] = true;
	  });

	  window.addEventListener('keyup', function (event) {
	    keys[event.keyCode] = false;
	  });

	  function right(p) {
	    return p.dx < p.speed;
	  }

	  function left(p) {
	    return p.dx > -p.speed;
	  }

	  function moveRight(p, sx, sy) {
	    p.sx = sx;
	    p.sy = sy;
	    p.dx++;
	  }

	  function moveLeft(p, sx, sy) {
	    p.sx = sx;
	    p.sy = sy;
	    p.dx--;
	  }

	  if (gameManager.isPaused === true) {
	    //DO NOTHING GAME PAUSED
	  } else {
	    if (keys[39] && right(p1)) {
	      moveRight(p1, 513, 111);
	    }
	    if (keys[37] && left(p1)) {
	      moveLeft(p1, 204, 163);
	    }
	    if (keys[68] && right(p2)) {
	      moveRight(p2, 515, 61);
	    }
	    if (keys[65] && left(p2)) {
	      moveLeft(p2, 219, 110);
	    }
	    p1.dx *= p1.friction;
	    p2.dx *= p2.friction;
	    p1.x += p1.dx;
	    p2.x += p2.dx;
	  }
	}

	function drawPlatform(c) {
	  lava.drawLava(c);
	  scoreboardPlatform.draw2(c);
	  platformArr.forEach(function (platform) {
	    platform.draw(c);
	  });
	}

	function drawPlayer(c, eggArr) {
	  playerArr.forEach(function (player) {
	    player.draw(c);
	    player.teleport(cWidth);
	    player.gravity(gameManager.gravity);
	    player.respawn(respawn);
	    //player.platformPlayerCollision(platformArr);
	    player.lavaCollision(death);
	    player.playerToEggCollision(eggArr, c);
	    enemyArr.forEach(function (enemy) {
	      player.playerToEnemyCollision(enemy, death);
	    });
	  });
	  p1.platformPlayerCollision('p1', platformArr);
	  p1.playerToPlayerCollision(p2, death);
	  p1.displayPoints('p1', c);
	  p2.platformPlayerCollision('p2', platformArr);
	  p2.playerToPlayerCollision(p1, death);
	  p2.displayPoints('p2', c);
	}

	function drawGameText(c) {
	  gameManager.gameOver(c, playerArr);
	  gameManager.scoreBox(c, playerArr);
	  gameManager.pauseText(c);
	  gameManager.level2(mainPlatform, c, playerArr);
	}

	function drawEnemy(c) {
	  enemyArr.forEach((enemy, i, arr) => {
	    enemy.draw(c);
	    enemy.move();
	    enemy.bounds(cWidth);
	    enemy.platformEnemyCollision(platformArr);
	    enemy.enemyToEnemyCollision(enemyArr);
	    enemy.track(enemy, i);
	    if (enemy.alive === false) {
	      let egg = new Egg(enemyArr[i].x, enemyArr[i].y, 280, 250, 18, 18);
	      eggArr.push(egg);
	      enemyArr.splice(i, 1);
	    }
	  });
	}

	function drawEgg(c) {
	  eggArr.forEach(function (egg) {
	    egg.draw(c);
	    egg.gravity();
	    egg.eggToPlatformCollision(platformArr);
	  });
	}

	function animate() {
	  requestAnimationFrame(animate);
	  c.clearRect(0, 0, innerWidth, innerHeight);
	  drawPlatform(c);
	  drawPlayer(c, eggArr);
	  drawGameText(c);
	  xMovement();
	  drawEnemy(c);
	  drawEgg(c);
	}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	const GameElement = __webpack_require__(2);

	class Platform extends GameElement {
	  constructor(x, y, width, height = 15, sx, sy, swidth, sheight) {
	    super(x, y, sx, sy, swidth, sheight);
	    this.width = width;
	    this.height = height;
	  }

	  draw(c) {
	    let sprite = new Image();

	    sprite.src = "../images/sprites.jpg";
	    c.drawImage(sprite, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
	  }

	  draw2(c) {
	    let sprite2 = new Image();

	    sprite2.src = "../images/sprites2background.png";
	    c.drawImage(sprite2, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
	  }

	  drawLava(c) {
	    c.fillStyle = "red";
	    c.fillRect(this.x, this.y, this.width, this.height);
	  }
	}

	module.exports = Platform;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	class GameElement {
	  constructor(x, y, sx, sy, swidth, sheight) {
	    this.x = x;
	    this.y = y;
	    this.sx = sx;
	    this.sy = sy;
	    this.swidth = swidth;
	    this.sheight = sheight;
	  }
	}

	module.exports = GameElement;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	const GameElement = __webpack_require__(2);

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
	    c.drawImage(sprite, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
	  }

	  platformPlayerCollision(player, pArr) {
	    for (let i = 0; i < pArr.length; i++) {
	      let xDist = this.x + this.width / 2 - (pArr[i].x + pArr[i].width / 2);
	      let yDist = this.y + this.height / 2 - (pArr[i].y + pArr[i].height / 2);
	      let widthBtw = (this.width + pArr[i].width) / 2;
	      let heightBtw = (this.height + pArr[i].height) / 2;
	      let crossWidth = widthBtw * yDist;
	      let crossHeight = heightBtw * xDist;

	      if (Math.abs(xDist) <= widthBtw && Math.abs(yDist) <= heightBtw) {
	        if (crossWidth > crossHeight) {
	          if (crossWidth > -crossHeight === true) {
	            this.y = pArr[i].y + this.height;
	          } else if (crossWidth > -crossHeight === false) {
	            this.x -= 2;
	          }
	        } else if (crossWidth < crossHeight) {
	          this.y = pArr[i].y - this.height;
	          // if(player === 'p1') {
	          //   this.sx = 204;
	          //   this.sy = 163;
	          // } else {
	          //   this.sx = 295;
	          //   this.sy = 165;
	          // }
	        }
	      }
	    }
	  }

	  playerToPlayerCollision(player, death) {
	    let xDist = this.x + this.width / 2 - (player.x + player.width / 2);
	    let yDist = this.y + this.height / 2 - (player.y + player.height / 2);
	    let widthBtw = this.width;
	    let crossWidth = widthBtw * yDist;
	    let crossHeight = widthBtw * xDist;

	    if (Math.abs(xDist) <= widthBtw && Math.abs(yDist) <= widthBtw) {
	      if (crossWidth > crossHeight) {
	        if (crossWidth > -crossHeight === true) {
	          player.y -= 50;
	          this.lives -= 1;
	          death.play();
	          this.alive = false;
	        } else if (crossWidth > -crossHeight === false) {
	          player.x += 4;
	          this.x -= 4;
	        }
	      } else {
	        if (crossWidth > -crossHeight === true) {
	          player.x -= 4;
	          this.x += 4;
	        } else if (crossWidth > -crossHeight === false) {
	          this.y -= 50;
	          player.lives -= 1;
	          death.play();
	          player.alive = false;
	        }
	      }
	    }
	  }

	  playerToEnemyCollision(player, death) {
	    let xDist = this.x + this.width / 2 - (player.x + player.width / 2);
	    let yDist = this.y + this.height / 2 - (player.y + player.height / 2);
	    let widthBtw = this.width;
	    let crossWidth = widthBtw * yDist;
	    let crossHeight = widthBtw * xDist;

	    if (Math.abs(xDist) <= widthBtw && Math.abs(yDist) <= widthBtw) {
	      if (crossWidth > crossHeight) {
	        if (crossWidth > -crossHeight === true) {
	          player.y -= 50;
	          this.lives -= 1;
	          death.play();
	          this.alive = false;
	        } else if (crossWidth > -crossHeight === false) {
	          player.x += 4;
	          this.x -= 4;
	        }
	      } else {
	        if (crossWidth > -crossHeight === true) {
	          player.x -= 4;
	          this.x += 4;
	        } else if (crossWidth > -crossHeight === false) {
	          this.y -= 50;
	          player.lives -= 1;
	          death.play();
	        }
	      }
	    }
	  }

	  getDistance(x1, y1, x2, y2) {
	    let xDistance = x2 - x1;
	    let yDistance = y2 - y1;
	    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
	  }

	  playerToEggCollision(eggArr, c) {
	    eggArr.forEach((egg, i) => {
	      if (this.getDistance(this.x, this.y, egg.x, egg.y) - this.width < 0) {
	        this.points += 250;
	        eggArr.splice(i, 1);
	        let secs = 0;
	        c.font = "10px Arial";
	        c.fillText("250", this.x, this.y - 20);
	      }
	    });
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
	      if (Math.sign(this.dx) === 1) {
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
	      if (Math.sign(this.dx) === 1) {
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
	        this.timer++;
	      } else {
	        this.width = 28;
	        respawn.play();
	        this.alive = true;
	        this.timer = 0;
	      }
	    }
	  }

	  displayPoints(p, c) {
	    c.font = "12px arial";
	    c.fillStyle = "#fff";
	    if (p === 'p1') {
	      c.fillText(this.points, 480, 549);
	    } else {
	      c.fillText(this.points, 300, 549);
	    }
	  }

	}

	module.exports = Player;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

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
	      c.strokeText("Lower Thy Lance!", 150, 300);
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

	    const textArr = ["  I", " I I", "I I I"];

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

	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	const GameElement = __webpack_require__(2);

	class Enemy {
	  constructor(x, y, dx, dy, sx, sy, swidth, sheight) {
	    this.x = x;
	    this.y = y;
	    this.sx = sx;
	    this.sy = sy;
	    this.swidth = swidth;
	    this.sheight = sheight;
	    this.dx = dx;
	    this.dy = dy;
	    this.width = 28;
	    this.height = 28;
	    this.lives = 1;
	    this.alive = true;
	    this.timer = 0;
	  }

	  draw(c) {
	    let sprite = new Image();
	    sprite.src = "../images/sprites.png";

	    if (this.dx > 0) {
	      c.drawImage(sprite, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
	    } else if (this.dx < 0) {
	      c.drawImage(sprite, 354, 216, 35, this.sheight, this.x, this.y, this.width, this.height);
	    }
	  }

	  move() {
	    this.x += this.dx;
	    this.y += this.dy;

	    if (this.timer < Math.random() * 200) {
	      this.timer++;
	    } else {
	      if (this.timer < Math.random() * 50) {
	        this.dy += (Math.random() - 0.5) * 2;
	        this.dx += (Math.random() - 0.5) * 3;
	        this.timer++;
	      }
	    }
	  }

	  track(enemyArr, i) {
	    if (this.lives <= 0) {
	      this.alive = false;
	    }
	  }

	  bounds(cWidth) {
	    if (this.x + this.width > cWidth) {
	      this.x = 0;
	      this.x = this.dx;
	    } else if (this.x <= 0) {
	      this.x = cWidth - this.width;
	      this.dx = this.dx;
	    }

	    if (this.y + this.height > 500 || this.y < 0) {
	      this.dy = -this.dy;
	    }
	  }

	  platformEnemyCollision(pArr) {
	    for (let i = 0; i < pArr.length; i++) {
	      let xDist = this.x + this.width / 2 - (pArr[i].x + pArr[i].width / 2);
	      let yDist = this.y + this.height / 2 - (pArr[i].y + pArr[i].height / 2);
	      let widthBtw = (this.width + pArr[i].width) / 2;
	      let heightBtw = (this.height + pArr[i].height) / 2;
	      let crossWidth = widthBtw * yDist;
	      let crossHeight = heightBtw * xDist;

	      if (Math.abs(xDist) <= widthBtw && Math.abs(yDist) <= heightBtw) {
	        if (crossWidth > crossHeight) {
	          if (crossWidth > -crossHeight === true) {
	            this.dy = -this.dy;
	          } else if (crossWidth > -crossHeight === false) {
	            this.dx = -this.dx;
	          }
	        } else if (crossWidth < crossHeight) {
	          this.dy = -this.dy;
	        }
	      }
	    }
	  }

	  getDistance(x1, y1, x2, y2) {
	    let xDistance = x2 - x1;
	    let yDistance = y2 - y1;
	    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
	  }

	  enemyToEnemyCollision(enemyArr) {
	    for (let i = 0; i < enemyArr.length; i++) {
	      if (this === enemyArr[i]) continue;

	      if (this.getDistance(this.x, this.y, enemyArr[i].x, enemyArr[i].y) - this.width < 0) {
	        this.x += 5;
	        enemyArr[i].x -= 5;
	        this.dx = -this.dx;
	        this.dy = -this.dy;
	        enemyArr[i].dx = -enemyArr[i].dy;
	        enemyArr[i].dy = enemyArr[i].dx;
	      }
	    }
	  }
	}

	module.exports = Enemy;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	const GameElement = __webpack_require__(2);

	class Egg extends GameElement {
	  constructor(x, y, sx, sy, swidth, sheight) {
	    super(x, y, sx, sy, swidth, sheight);
	    this.points = 250;
	    this.width = 28;
	    this.height = 28;
	    this.grav = 1;
	    this.points = 250;
	  }

	  draw(c) {
	    let sprite = new Image();
	    sprite.src = "../images/sprites.png";

	    c.drawImage(sprite, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
	  }

	  gravity() {
	    this.y += this.grav;
	    if (this.y < 1) {
	      this.y = 0;
	    }
	  }

	  eggToPlatformCollision(pArr) {
	    for (let i = 0; i < pArr.length; i++) {
	      let xDist = this.x + this.width / 2 - (pArr[i].x + pArr[i].width / 2);
	      let yDist = this.y + this.height / 2 - (pArr[i].y + pArr[i].height / 2);
	      let widthBtw = (this.width + pArr[i].width) / 2;
	      let heightBtw = (this.height + pArr[i].height) / 2;
	      let crossWidth = widthBtw * yDist;
	      let crossHeight = heightBtw * xDist;

	      if (Math.abs(xDist) <= widthBtw && Math.abs(yDist) <= heightBtw) {
	        if (crossWidth > crossHeight) {
	          //if (crossWidth  > (-crossHeight) === true) {
	          this.y = pArr[i].y - this.height;
	          this.grav = 0;
	          //} 
	        }
	      }
	    }
	  }

	}

	module.exports = Egg;

/***/ })
/******/ ]);