
import { run } from '@cycle/core';
import { makeDOMDriver } from '@cycle/dom';
import { isolate } from '@cycle/isolate';
// import { makeHistoryDriver } from '@cycle/history';
// import { useQueries, createHistory } from 'history';
import { restart, restartable } from 'cycle-restart';
import App from './components/App';

// const history = useQueries(createHistory)();

const drivers = {
  DOM: restartable(makeDOMDriver('#app'), { pauseSinksWhileReplaying: false }),
  // History: makeHistoryDriver(history),
};

const { sinks, sources } = run(App, drivers);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const app = require('./components/App');
    restart(app, drivers, { sinks, sources }, isolate);
  });
}
