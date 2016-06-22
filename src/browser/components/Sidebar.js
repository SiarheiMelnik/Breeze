
import { Observable as $ } from 'rx';
import { h } from '@cycle/dom';
import Nav from './Nav';

export default function Sidebar(sources) {
  const view = (nav) =>
    h('div.header', [
      h('h1.brand-title', 'Breeze'),
      h('h2.brand-tagline', 'FRP application'),
      nav
    ]);

  const nav$ = Nav(sources);

  const vtree$ = $.just(
    view(nav$.DOM)
  );

  return {
    DOM: vtree$
  };
}
