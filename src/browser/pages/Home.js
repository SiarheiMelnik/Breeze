import { Observable as $ } from 'rx';
import { h } from '@cycle/dom';

export default function Home() {
  const view = () =>
    h('div', [
      h('h1.content-subhead', 'How to use FRP')
    ]);

  const vtree$ = $.just(
    view()
  );

  return {
    DOM: vtree$
  };
}
