import Rx from 'rx';
import { div, h1 } from '@cycle/dom';

function App() {
  const view = function () {
    return div('#app .pure-g', [
      h1('.title', ['APP'])
    ]);
  };

  const view$ = Rx.Observable.just(
    view()
  );
  const sinks = {
    DOM: view$,
  };
  return sinks;
}

export default App;
