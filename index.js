'use strict';

var futil = require('fosify');
var pkg = require('./package.json');
var server = require('karma').server;
var path = require('path');
var spawn = require('child_process').spawn;

module.exports = function(app, opts, next) {
  futil.notifyUpdate(pkg);

  app.expose('bundle', function(cb) {
    var karmaOpts = {
      configFile: path.join(__dirname, './lib/karma.conf'),
      singleRun: !opts.watch,
      autoWatch: opts.watch
    };

    // Start the server
    var child = spawn(
      'node',
      [
        path.join(__dirname, 'lib', 'background.js'),
        JSON.stringify(karmaOpts)
      ],
      {
        stdio: 'inherit'
      }
    );

    // Cleanup when the child process exits
    child.on('exit', function(code) {
      console.log('Karma child process ended');
    });

    process.on('exit', function() {
      child.kill();
    });

    cb();
  });

  next();
};

module.exports.attributes = {
  pkg
};
