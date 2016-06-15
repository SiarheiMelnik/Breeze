// we use nodejs modules
const Bluebird = require('bluebird');
require('babel-runtime/core-js/promise').default = Bluebird;

module.exports = Bluebird;
