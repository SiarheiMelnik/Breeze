import './App.scss';
import { Observable } from 'rx';
import { h } from '@cycle/dom';

function App() {
  const view = () => Observable.just(
    h('div#layout .pure-g', [
      h('div.sidebar pure-u-1 pure-u-md-1-4', [
        h('div.header', [
          h('h1.brand-title', 'Breeze'),
          h('h2.brand-tagline', 'FRP application')
        ])
      ]),
      h('div.content pure-u-1 pure-u-md-3-4', [
        h('div', [
          h('h1.content-subhead', 'How to use FRP')
        ])
      ])
    ])
  );

  const view$ = view();

  return {
    DOM: view$
  };
}

export default App;
