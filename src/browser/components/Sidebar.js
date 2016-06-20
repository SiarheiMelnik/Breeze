
import { Observable as $ } from 'rx';
import { h } from '@cycle/dom';
import Nav from './Nav';

export default function Sidebar(sources) {
  const view = () =>
    h('div.header', [
      h('h1.brand-title', 'Breeze'),
      h('h2.brand-tagline', 'FRP application')
    ]);

  const nav = Nav(sources);

  const vtree$ = $.just(
    view(nav.DOM)
  );

  return {
    DOM: vtree$
  };
}
