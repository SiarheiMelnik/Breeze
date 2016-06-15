
import mount from 'koa-mount';
import serve from 'koa-static';
import render from './render';

export default [
  mount('/assets', serve('build')),
  render()
];
