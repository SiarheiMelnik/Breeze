import './App.scss';
import Rx from 'rx';
import { div, h1 } from '@cycle/dom';

function App() {
  const view = () =>
    div('#app .pure-g', [
      h1('.title', ['APP'])
    ]);
  };

  const view$ = Rx.Observable.just(
    view(sources)
  );

  const sinks = {
    DOM: view$,
  };

  return sinks;
}

export default App;
