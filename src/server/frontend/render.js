import config from '../config';
import { Observable as $ } from 'rx';
import { run } from '@cycle/core';
import serialize from 'serialize-javascript';
import {
  html,
  head,
  title,
  body,
  div,
  script,
  link,
  meta,
  makeHTMLDriver
} from '@cycle/dom';
// import App from '../../browser/components/App';

function wrapVTreeWithHTMLBoilerplate(context, { js, css }) {
  return (
    html({ lang: 'en' }, [
      head([
        meta({ charset: 'utf-8' }),
        meta({ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }),
        title(config.appName),
        css ? link({
          href: css,
          rel: 'stylesheet'
        }) : null
      ]),
      body([
        div('#app', [
          // vtree
        ]),
        script(`window.__APP__CONTEXT__ = ${serialize(context)};`),
        script({ src: js })
      ])
    ])
  );
}

function wrapAppResultWithBoilerplate(context$, bundle$) {
  return function wrappedAppFn() {
    // const vtree$ = appFn(sources).DOM;
    const wrappedVTree$ = $.combineLatest(
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

  const context$ = $.just({ route: ctx.req.url });
  const clientBundle$ = $.just({ css: cssFilename, js: jSFilename });

  const wrappedAppFn = wrapAppResultWithBoilerplate(context$, clientBundle$);

  const { sources } = run(wrappedAppFn, {
    DOM: makeHTMLDriver(),
    context: () => context$
  });

  const html$ = sources.DOM.map(data => `<!doctype html>${data}`);
  ctx.body = yield html$.toPromise(Promise);
};
