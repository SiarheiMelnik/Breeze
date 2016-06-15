/*
eslint no-underscore-dangle:0
*/
import { run } from '@cycle/core';
import { makeDOMDriver } from '@cycle/dom';
import { isolate } from '@cycle/isolate';
import { Observable } from 'rx';
// import { makeHistoryDriver } from '@cycle/history';
// import { useQueries, createHistory } from 'history';
import { restart, restartable } from 'cycle-restart';
import App from './components/App';

// const history = useQueries(createHistory)();

const drivers = {
  DOM: restartable(makeDOMDriver('#app'), { pauseSinksWhileReplaying: false }),
  context: () => Observable.just(window.__APP__CONTEXT__),
  // History: makeHistoryDriver(history),
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
