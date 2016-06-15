import './App.scss';
import Rx from 'rx';
import { div, h1, h2 } from '@cycle/dom';

function App() {
  const view = () =>
    div('#layout .pure-g', [
      div('.sidebar pure-u-1 pure-u-md-1-4', [
        div('.header', [
          h1('.brand-title', 'Breeze'),
          h2('.brand-tagline', 'FRP application')
        ])
      ]),
      div('.content pure-u-1 pure-u-md-3-4', [
        div([
          h1('.content-subhead', 'How to use FRP')
        ])
      ])
    ]);

  const view$ = Rx.Observable.just(
    view()
  );

  const sinks = {
    DOM: view$,
  };

  return sinks;
}

export default App;
