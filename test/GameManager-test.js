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

})