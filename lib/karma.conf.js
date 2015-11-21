'use strict';

var babelify = require('babelify');
var istanbul = require('browserify-istanbul');
var proxyquireify = require('proxyquireify');
var path = require('path');
var cwd = path.resolve(process.cwd());

module.exports = function(karma) {
  karma.set({
    basePath: cwd,

    exclude: [],

    files: ['./test/**/*.js'],

    preprocessors: {
      './test/**/*.js': ['browserify']
    },

    browserify: {
      debug: true,
      paths: [path.join(__dirname, '../node_modules')],
      plugin: [
        proxyquireify.plugin
      ],
      insertGlobalVars: {
        __version: function() {
          return '"1.0.0"';
        },
        __host: function() {
          return '"example.com"';
        },
        __secureHost: function() {
          return '"secure.example.com"';
        },
        __baseURL: function() {
          return '';
        }
      },
      transform: [
        istanbul({
          ignore: [
            '**/node_modules/**',
            '**/test/**',
            '**/*.{less,css,html,jade,txt}'
          ],
        }),
        babelify.configure()
      ]
    },

    frameworks: ['browserify', 'mocha'],

    reporters: ['nyan', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: './coverage/'
    },

    colors: true,

    logLevel: karma.LOG_WARN,

    port: 9876,

    browsers: [
      'Chrome'
    ]
  });
};
