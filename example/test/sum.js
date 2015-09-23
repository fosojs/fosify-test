'use strict';

var expect = require('chai').expect;
var sum = require('../lib/sum');

describe('sum', function() {
  it('corretly adds positive numbers', function() {
    expect(sum(1, 2)).to.equal(3);
  });
});
