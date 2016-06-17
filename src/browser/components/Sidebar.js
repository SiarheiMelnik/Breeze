
import { Observable } from 'rx';
import { h } from '@cycle/dom';

export default function Sidebar() {
  const view = () => Observable.just(
    h('div.sidebar pure-u-1 pure-u-md-1-4', [
      h('div.header', [
        h('h1.brand-title', 'Breeze'),
        h('h2.brand-tagline', 'FRP application')
      ])
    ])
  );

  const vtree$ = view();

  return {
    DOM: vtree$
  };
}
