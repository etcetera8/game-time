const { assert } = require('chai');
const GameManager = require('../lib/GameManager.js');

describe('GameManager', function() {
  
  let gameManager;

  beforeEach(function() {
    gameManager = new GameManager();
  });

  it('should return true', function() {
    assert.equal(true, true);
  })

  it('is a class', function() {
    assert.isFunction(GameManager);
  })

  it('should be an object', function() {
    assert.isObject(gameManager);
  })

  it('should three lives per player', function() {
    assert.equal(gameManager.p1Lives, 3);
    assert.equal(gameManager.p2Lives, 3);
  })

  it('should not be running by default', function() {
    assert.equal(gameManager.isRunning, false);
  })

  it('should not be paused by default', function() {
    assert.equal(gameManager.isPaused, false);
  })

  it('should have functions', function() {
    assert.isFunction(gameManager.gameOver, true);
    assert.isFunction(gameManager.pauseText, true);
    assert.isFunction(gameManager.pausePosition, true);
    assert.isFunction(gameManager.scoreBox, true);
    assert.isFunction(gameManager.level2, true);
  })

  it('should have default gravity', function() {
    assert.equal(gameManager.gravity, 1);
  })

  it('should have a timer', function() {
    assert.equal(gameManager.timer, 0);
  })
})