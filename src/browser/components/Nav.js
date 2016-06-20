import { Observable as $ } from 'rx';
import { h } from '@cycle/dom';
import latestObj from 'rx-combine-latest-obj';

export default function Nav(sources) {
  const view = () =>
    h('nav.nav', [
      h('ul.nav-list', [
        h('li.nav-item .link', [
          h('a.pure-button', { href: '/' }, ['Home'])
        ]),
        h('li.nav-item .link', [
          h('a.pure-button', { href: '/hello' }, ['Hello'])
        ]),
      ])
    ]);

  const intent = ({ DOM }) => ({
    click$: $.merge([
      'click',
      'touchstart',
    ].map(event => DOM.select('.link a').events(event)))
  });


  const model = ({ actions }) =>
    latestObj({
      url: actions.click$
        .map(event => {
          event.preventDefault();
          return event.target.href.replace(location.origin, '');
        }),
    }).startWith();

  const actions = intent(sources);
  const state$ = model({ actions });
  const vtree$ = $.just(
    view(sources)
  );

  return {
    DOM: vtree$,
    url: state$.map(st => st.url)
  };
}
