'use strict';

var babelify = require('babelify');
var istanbul = require('browserify-istanbul');
var proxyquireify = require('proxyquireify');
var path = require('path');
var cwd = path.resolve(process.cwd());

module.exports = function(karma) {
  karma.set({
    basePath: cwd,

    exclude: [
      './**/node_modules/**',
      './**/bower_components/**',
    ],

    files: ['**/test/**/*.js'],

    preprocessors: {
      '**/test/**/*.js': ['browserify']
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
        babelify.configure({presets: ['es2015']}),
        istanbul({
          ignore: [
            '**/node_modules/**',
            '**/test/**',
            '**/*.{less,css,html,jade,txt}'
          ],
        }),
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
    ],

    customLaunchers: {
      'chrome_travis_ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  });
};
