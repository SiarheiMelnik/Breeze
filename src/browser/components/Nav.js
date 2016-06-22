import { h, a } from '@cycle/dom';

export default function Nav(sources) {
  const routerSource = sources.router;
  const nav$ = routerSource
    .route$
    .map(() =>
      h('nav.nav', [
        h('ul.nav-list', [
          h('li.nav-item', [
            a({
              href: sources.router.buildUrl('home'),
              className: routerSource.isActive('home') ? 'active pure-button' : 'pure-button'
            }, 'Home')
          ]),
          h('li.nav-item', [
            a({
              href: sources.router.buildUrl('hello', { id: 1 }),
              className: routerSource.isActive('hello') ? 'active pure-button' : 'pure-button'
            }, 'Hello')
          ])
        ])
      ])
    ).startWith();

  return {
    DOM: nav$
  };
}
