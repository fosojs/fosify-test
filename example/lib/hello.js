'use strict';

var randomName = require('./random-name');

function hello() {
  return 'Hello ' + randomName() + '!';
}

module.exports = hello;
