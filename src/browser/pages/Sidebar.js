
import { Observable } from 'rx';
import { h } from '@cycle/dom';

export default function Sidebar() {
  const view = () =>
    h('div.header', [
      h('h1.brand-title', 'Breeze'),
      h('h2.brand-tagline', 'FRP application')
    ]);

  const vtree$ = Observable.just(
    view()
  );

  return {
    DOM: vtree$
  };
}
