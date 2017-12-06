const { assert } = require('chai');
const Player = require('../lib/Player.js');
const Platform = require('../lib/Platform.js')

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
  })

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
  })
})

describe('Player Collisions', function() {
  it('should stop when colliding with bottom of platform', function() {
    let p = new Player(150, 170, 0, 0, 32, 32);    
    let plat = new Platform(150, 150, 100, 16, 0, 0, 64, 16);
    let arr = [];
    arr.push(plat)    
    p.platformPlayerCollision(arr) //before touch
    assert.equal(p.y, 170)  
    p.y = 166;
    p.platformPlayerCollision(arr) //at touch
    assert.equal(p.y, 178)
    p.y = 165;
    p.platformPlayerCollision(arr) //after touch new y returned is heightbtw
    assert.equal(p.y, 178)
  })

  it('should stop when colliding with top of platform', function() {
    let p = new Player(150, 120, 0, 0, 32, 32);    
    let plat = new Platform(150, 150, 100, 16, 0, 0, 64, 16);
    let arr = [];
    arr.push(plat);    //p height plus p y
    p.platformPlayerCollision(arr); //before collision
    assert.equal(p.y, 120);

    p.y = 122;
    p.platformPlayerCollision(arr); //at collision
    assert.equal(p.y, 122);

    p.y = 123;
    p.platformPlayerCollision(arr); //after collision
    assert.equal(p.y, 122);
  })
  

 })
