
import nconf from 'nconf';

nconf.env('__');

nconf.defaults({
  appName: require('../../package.json').name,
  isProduction: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
});

export default nconf.get();
