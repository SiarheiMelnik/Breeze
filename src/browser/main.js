/*
eslint no-underscore-dangle:0
*/
import { run } from '@cycle/core';
import { makeDOMDriver } from '@cycle/dom';
import { Observable } from 'rx';
import { makeHistoryDriver } from '@cycle/history';
import { useQueries, createHistory } from 'history';
import { rerunner, restartable } from 'cycle-restart';
import App from './components/App';

const history = useQueries(createHistory)();

const drivers = {
  DOM: restartable(makeDOMDriver('#app'), { pauseSinksWhileReplaying: false }),
  History: makeHistoryDriver(history),
  context: () => Observable.just(window.__APP__CONTEXT__),
};

const rerun = rerunner(run);
rerun(App, drivers);

if (module && module.hot) {
  module.hot.accept('./components/App', () => {
    const app = require('./components/App');
    rerun(app, drivers);
  });
  module.hot.accept();
}
