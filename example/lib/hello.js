'use strict';

import randomName from './random-name';

function hello() {
  return `Hello ${randomName()}!`;
}

module.exports = hello;
