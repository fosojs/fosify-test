'use strict';

var proxyquire = require('proxyquireify')(require);

var stubs = {
  './random-name': function() {
    return 'Jack';
  }
};

var hello = proxyquire('../lib/hello', stubs);

describe('hello', function() {
  it('return hello with random name', function() {
    expect(hello()).to.equal('Hello Jack!');
  });
});
