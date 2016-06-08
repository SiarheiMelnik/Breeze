import config from '../config';
import { Observable } from 'rx';
import { run } from '@cycle/core';
import serialize from 'serialize-javascript';
import {
  html,
  head,
  title,
  body,
  div,
  script,
  makeHTMLDriver
} from '@cycle/dom';

function wrapVTreeWithHTMLBoilerplate(context, { js }) {
  return (
    html([
      head([
        title(config.appName),
      ]),
      body([
        div('#app'),
        script(`window.__APP__CONTEXT__ = ${serialize(context)};`),
        script({ src: js })
      ])
    ])
  );
}

function wrapAppResultWithBoilerplate(context$, bundle$) {
  return function wrappedAppFn() {
    const wrappedVTree$ = Observable.combineLatest(
      context$,
      bundle$,
      wrapVTreeWithHTMLBoilerplate
    );
    return {
      DOM: wrappedVTree$
    };
  };
}

export default () => function * render() {
  const ctx = this;
  ctx.type = 'text/html';

  const {
    styles: { app: cssFilename },
    javascript: { app: jSFilename }
  } = webpackIsomorphicTools.assets();

  if (!config.isProduction) {
    webpackIsomorphicTools.refresh();
  }

  console.log(`==> Req: ${ctx.method} ${ctx.url}`);

  const context$ = Observable.just({ route: ctx.req.url });
  const clientBundle$ = Observable.just({ css: cssFilename, js: jSFilename });
  const wrappedAppFn = wrapAppResultWithBoilerplate(context$, clientBundle$);
  const { sources } = run(wrappedAppFn, {
    DOM: makeHTMLDriver(),
    context: () => context$
  });
  const html$ = sources.DOM.map(data => `<!doctype html>${data}`);
  ctx.body = yield new Promise((resolve) => html$.subscribe(res => resolve(res)));
};
