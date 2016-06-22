/*
eslint no-underscore-dangle:0
*/
import { run } from '@cycle/core';
import { makeDOMDriver } from '@cycle/dom';
import { Observable as $ } from 'rx';
import { isolate } from '@cycle/isolate';
import makeRouter5Driver from './router5/driver';
import createRouter from './create-router';
import routes from './routes';
import { restart, restartable } from 'cycle-restart';
import App from './components/App';

const drivers = {
  DOM: restartable(makeDOMDriver('#app'), { pauseSinksWhileReplaying: false }),
  router: makeRouter5Driver(createRouter(routes, 'home')),
  context: () => $.just(window.__APP__CONTEXT__),
};

const { sinks, sources } = run(App, drivers);

if (module.hot) {
  module.hot.dispose(() => {
    sinks.dispose();
    sources.dispose();
  });

  module.hot.accept('./components/App', () => {
    const app = require('./components/App');
    restart(app, drivers, { sinks, sources }, isolate);
  });
}
