import { h, a } from '@cycle/dom';

export default function Nav(sources) {
  const routerSource = sources.router;
  const nav$ = routerSource
    .route$
    .map(() =>
      h('nav', [
        a({
          href: sources.router.buildUrl('home'),
          className: routerSource.isActive('home') ? 'active' : ''
        }, 'Home'),
        a({
          href: sources.router.buildUrl('hello', { id: 1 }),
          className: routerSource.isActive('hello') ? 'active' : ''
        }, 'Hello')
      ])
    );

  return {
    DOM: nav$
  };
}
