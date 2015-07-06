'use strict';

var istanbul = require('browserify-istanbul');
var proxyquireify = require('proxyquireify');
var path = require('path');
var cwd = path.resolve(process.cwd());

module.exports = function(config) {
  config.set({

    basePath: cwd,

    exclude: [],

    files: ['./test/**/*.js'],

    preprocessors: {
      './test/**/*.js': ['browserify']
    },

    browserify: {
      debug: true,
      plugin: [
        proxyquireify.plugin
      ],
      transform: [istanbul({
        ignore: ['**/node_modules/**', '**/test/**'],
      })]
    },

    frameworks: ['browserify', 'jasmine'],

    reporters: ['nyan', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: './coverage/'
    },

    colors: true,

    logLevel: config.LOG_INFO,

    port: 9876,

    browsers: [
      'PhantomJS'
    ]
  });
};
