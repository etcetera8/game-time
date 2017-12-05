const { assert } = require('chai');
const Player = require('../lib/Player.js');

describe('Player', function() {
  let player;

  beforeEach(function() {
    player = new Player(5,7,'pink');
  });

  it('should exist', function() {
    assert.equal(true, true);
  });

  it('is a class', function() {
    assert.isFunction(Player);
  });

  it('should take in parameters', function() {
    assert.equal(player.x, 5);
    assert.equal(player.y, 7);
    assert.equal(player.color, 'pink');
  })

  it('should have functions', function() {
    assert.isFunction(player.keyController, true);
    assert.isFunction(player.draw, true);
    assert.isFunction(player.teleport, true);
    assert.isFunction(player.gravity, true);
    assert.isFunction(player.respawn, true);
  })

  it('should have gravity on it', function() {
    let gravityTest = player.gravity(1);
    assert.equal(gravityTest, 8)
  })
})