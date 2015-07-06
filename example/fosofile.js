'use strict';

var foso = require('foso');
var test = require('../');

foso
  .please({
    watch: true
  })
  .fosify(test)
  .now();
