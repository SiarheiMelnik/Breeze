import { Observable as $ } from 'rx';
import { h } from '@cycle/dom';

export default function Hello() {
  const view = () =>
    h('div', [
      h('h1.content-subhead', 'Hello'),
      h('p', 'Text')
    ]);

  const vtree$ = $.just(
    view()
  );

  return {
    DOM: vtree$
  };
}
