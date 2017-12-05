const { assert } = require('chai');
const Platform = require('../lib/Platform.js')

describe('Platform', function() {
  let platform;

  beforeEach(function() {
    platform = new Platform(20, 25, 300);
  })  

  it('should exist', function() {
    assert.equal(true, true)
  })

  it('should take in parameters', function() {
    assert.equal(platform.x, 20);
    assert.equal(platform.y, 25);
    assert.equal(platform.width, 300);
    assert.equal(platform.height, 15);
  })

  it('should have functions', function() {
    assert.isFunction(platform.draw, true)
    assert.isFunction(platform.draw2, true)
    assert.isFunction(platform.drawLava, true)
  })
})