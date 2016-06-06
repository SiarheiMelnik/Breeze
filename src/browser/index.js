
require('babel-polyfill');
window.Promise = require('../common/bootstrapBluebird');
require('./main');
