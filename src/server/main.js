
import koa from 'koa';
import http from 'http';
import config from './config';

const app = koa();

http.createServer(app.callback()).listen(config.port);
