'use strict';

var expect = require('chai').expect;
var ftest = require('../');

describe('fosify-sass', function() {
  it('exports a function', function() {
    expect(ftest).to.be.a('function');
  });
});
