const { assert } = require('chai');
const GameElement = require('../lib/GameElement.js');

describe('GameElememt', function() {
  let gameElement = new GameElement(24, 28, 10, 15, 100, 120);

  it('should exist', function() {
    assert.equal(true, true);
  })

  it('should be a function', function() {
    assert.isFunction(GameElement);
  })

  it('should take in parameters', function() {
    assert.equal(gameElement.x, 24);
    assert.equal(gameElement.y, 28);
    assert.equal(gameElement.sx, 10);
    assert.equal(gameElement.sy, 15);
    assert.equal(gameElement.swidth, 100);
    assert.equal(gameElement.sheight, 120);
  })
})