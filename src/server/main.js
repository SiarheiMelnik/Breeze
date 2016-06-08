
import koa from 'koa';
import http from 'http';
import bodyParser from 'koa-bodyparser';
import compose from 'koa-compose';
import config from './config';
import frontend from './frontend';
import errorHandler from './lib/errorHandler';

const app = koa();

const middlewares = [
  bodyParser(),
  errorHandler(),
  ...frontend
];

app.use(compose(middlewares));

http.createServer(app.callback()).listen(config.port, () => {
  console.log(`Server started in port ${config.port}`);
});
