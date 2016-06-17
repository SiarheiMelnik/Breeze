
import { Observable } from 'rx';
import { h } from '@cycle/dom';

export default function Content() {
  const view = () => Observable.just(
    h('div.content pure-u-1 pure-u-md-3-4', [
      h('div', [
        h('h1.content-subhead', 'How to use FRP')
      ])
    ])
  );

  const vtree$ = view();

  return {
    DOM: vtree$
  };
}
