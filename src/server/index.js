
require('babel-register');
require('babel-polyfill');

global.Promise = require('../common/bootstrapBluebird');
require('./main');
