'use strict';

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomName() {
  var names = [
    'John',
    'Emily',
    'Bill',
    'Nick'
  ];
  return names[getRandomInt(0, names.length - 2)];
}

module.exports = randomName;
