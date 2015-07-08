'use strict';

var lessify = require('node-lessify');
var stringify = require('stringify');
var jadeify = require('jadeify');
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
      transform: [
        istanbul({
          ignore: [
            '**/node_modules/**',
            '**/test/**',
            '**/*.{less,css,html,jade,txt}'
          ],
        }),
        lessify,
        [jadeify, { pretty: false }],
        babelify.configure({
          extensions: ['.babel', '.es6']
        }),
        stringify({
          extensions: ['.html', '.txt'],
          minify: true,
          minifier: {
            extensions: ['.html']
          }
        })
      ]
    },

    frameworks: ['browserify', 'mocha', 'chai'],

    reporters: ['nyan', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: './coverage/'
    },

    colors: true,

    logLevel: karma.LOG_INFO,

    port: 9876,

    browsers: [
      'PhantomJS'
    ]
  });
};
