'use strict';

require('babel-register');
require('babel-polyfill');

delete process.env.BROWSER;

require('./app').start();
