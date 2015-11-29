'use strict';

var Foso = require('foso');
var test = require('../');

var foso = new Foso();
foso
  .register(test, {
    watch: true
  })
  .then(() => foso.bundle());
