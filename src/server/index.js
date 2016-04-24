'use strict';

require('babel-core/register');
require("babel-polyfill");

delete process.env.BROWSER;

require('./app.js').default.start();
