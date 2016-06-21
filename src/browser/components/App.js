import './App.scss';
import { Observable as $ } from 'rx';
import { h } from '@cycle/dom';
import Sidebar from './Sidebar';
import Viewport from './Viewport';
import { shouldInterceptEvent, onClick } from '../router5/link-on-click';

const view = (sidebar, content) =>
  h('div#layout .pure-g', [
    h('div.sidebar pure-u-1 pure-u-md-1-4', [sidebar]),
    h('div.content pure-u-1 pure-u-md-3-4', [content])
  ]);

function App(sources) {
  const navigationInstruction$ = $.fromEvent(document, 'click', 'a')
    .filter(shouldInterceptEvent(sources.router))
    .map(onClick(sources.router));

  const sidebar = Sidebar(sources);
  const viewport = Viewport(sources);

  const routerInstructions$ = viewport.router;
  const router$ = $.merge(navigationInstruction$, routerInstructions$);

  const view$ = $.just(
    view(
      sidebar.DOM,
      viewport.DOM
    )
  );

  return {
    DOM: view$,
    router: router$
  };
}

export default App;
