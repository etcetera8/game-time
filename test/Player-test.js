const { assert } = require('chai');
const Player = require('../lib/Player.js');
const Platform = require('../lib/Platform.js');
const GameManager = require('../lib/GameManager.js');

describe('Player', function() {
  let player;
  let platform;

  beforeEach(function() {
    player = new Player(150, 325, 0, 0, 32, 32);
    platform = new Platform(0, 150, 100, 16, 0, 0, 64, 16);
  });

  it('should exist', function() {
    assert.equal(true, true);
  });

  it('is a class', function() {
    assert.isFunction(Player);
  });

  it('should take in parameters', function() {
    assert.equal(player.x, 150);
    assert.equal(player.y, 325);
    assert.equal(player.sx, 0);
    assert.equal(player.sy, 0);
    assert.equal(player.swidth, 32);
    assert.equal(player.sheight, 32);
  });

  it('should have default parameters', function() {
    assert.equal(player.dx, 0);
    assert.equal(player.speed, 2);
    assert.equal(player.friction, .98);
    assert.equal(player.width, 28);
    assert.equal(player.height, 28);
    assert.equal(player.alive, true);
    assert.equal(player.timer, 0);
  });

  it('should have functions', function() {
    assert.isFunction(player.draw, true);
    assert.isFunction(player.platformPlayerCollision, true);
    assert.isFunction(player.playerToPlayerCollision, true);
    assert.isFunction(player.lavaCollision, true);
    assert.isFunction(player.teleport, true);
    assert.isFunction(player.gravity, true);
    assert.isFunction(player.respawn, true);
  });
})

describe('Player Collisions', function() {
  
  it('should stop when colliding with bottom of platform', function() {
    let p = new Player(150, 170, 0, 0, 32, 32);    
    let plat = new Platform(150, 150, 100, 16, 0, 0, 64, 16);
    let arr = [];
    arr.push(plat);    
    p.platformPlayerCollision(arr);
    assert.equal(p.y, 170);  
    p.y = 166;
    p.platformPlayerCollision(arr);
    assert.equal(p.y, 178);
    p.y = 165;
    p.platformPlayerCollision(arr);
    assert.equal(p.y, 178);
  });

  it('should stop when colliding with top of platform', function() {
    let p = new Player(150, 120, 0, 0, 32, 32);    
    let plat = new Platform(150, 150, 100, 16, 0, 0, 64, 16);
    let arr = [];
    arr.push(plat);
    p.platformPlayerCollision(arr);
    assert.equal(p.y, 120);

    p.y = 122;
    p.platformPlayerCollision(arr);
    assert.equal(p.y, 122);

    p.y = 123;
    p.platformPlayerCollision(arr);
    assert.equal(p.y, 122);
  })

  it('should bounce off of other player when left collision occurs', function() {
    let p1 = new Player(150, 120, 0, 0, 32, 32);     
    let p2 = new Player(200, 120, 0, 0, 32, 32);
    let gm = new GameManager();

    p1.playerToPlayerCollision(p1, p2, gm);
    assert.equal(p1.x, 150);     
    assert.equal(p2.x, 200);

    p1.x = 201;
    p1.playerToPlayerCollision(p1, p2, gm);
    assert.equal(p1.x, 205);     
    assert.equal(p2.x, 196);     
  });

   it('should bounce off of other player when right collision occurs', function() {
    let p1 = new Player(200, 120, 0, 0, 32, 32);     
    let p2 = new Player(150, 120, 0, 0, 32, 32);
    let gm = new GameManager();

    p1.playerToPlayerCollision(p1, p2, gm);
    assert.equal(p1.x, 200);
    assert.equal(p2.x, 150);     

    p1.x = 149;
    p1.playerToPlayerCollision(p1, p2, gm);
    assert.equal(p1.x, 145);     
    assert.equal(p2.x, 154);     
  });

   it('should kill other player when bottom collision occurs', function() {
    let p1 = new Player(200, 80, 0, 0, 32, 32);     
    let p2 = new Player(200, 120, 0, 0, 32, 32);
    let gm = new GameManager();

    p1.playerToPlayerCollision(p1, p2, gm);
    assert.equal(p1.y, 80);
    assert.equal(p2.y, 120);
    assert.equal(p2.alive, true);
    assert.equal(gm.p2Lives, 3);

    p1.y = 93;
    p1.playerToPlayerCollision(p1, p2, gm);
    assert.equal(p1.y, 43);
    assert.equal(p2.y, 120);
    assert.equal(p2.alive, false);
    assert.equal(gm.p2Lives, 2);
   })

   it('should die when collides with lava', function() {
    let p1 = new Player(200, 500, 0, 0, 32, 32);     
    let p2 = new Player(250, 120, 0, 0, 32, 32);
    let gm = new GameManager();

    p1.lavaCollision(p1, p2, gm);
    assert.equal(p1.y, 500);
    assert.equal(p1.alive, true);

    p1.y = 522;
    p1.lavaCollision(p1, p2, gm); 
    assert.equal(p1.alive, false);
    assert.equal(gm.p1Lives, 2);

    p1.respawn();                 
    assert.isAbove(p1.timer, 0);
    assert.equal(p1.x, 350);
    assert.equal(p1.y, 400 - p1.height);
    assert.equal(p1.width, 0);
    assert.equal(p1.alive, false);
    
    p1.timer = 201;
    p1.respawn();
    p1.alive = true;
    assert.equal(p1.width, 28);
    assert.equal(p1.alive, true);
    assert.equal(p1.timer, 0);
   })
 })

describe('Player mechanics', function() {
  
  it('should teleport across the screen left to right', function() {
    let p = new Player(1, 500, 0, 0, 32, 32);
    p.teleport(800);
    assert.equal(p.x, 1);

    p.x = -1;
    p.teleport(800);
    assert.equal(p.x, 772);
  })

  it('should teleport across the screen right to left', function() {
    let p = new Player(772, 500, 0, 0, 32, 32);
    p.teleport(800);
    assert.equal(p.x, 772);

    p.x = 773 + p.width;
    p.teleport(800);
    assert.equal(p.x, 0);
  })

  it('should have gravity', function() {
    let p = new Player(772, 500, 0, 0, 32, 32);
    assert.equal(p.y, 500);
    p.gravity(1);
    assert.equal(p.y, 501);
  })

  it('should have a ceiling', function() {
    let p = new Player(772, 1, 0, 0, 32, 32);
    assert.equal(p.y, 1);
    p.gravity(1);
    p.y = -1;
    p.gravity(1);
    assert.equal(p.y, 0)
  })
})
