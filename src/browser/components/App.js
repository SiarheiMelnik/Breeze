import './App.scss';
import { Observable as $ } from 'rx';
import { h } from '@cycle/dom';
import Sidebar from './Sidebar';
import createRouter from '../createRouter';

const view = (sidebar, content) =>
  h('div#layout .pure-g', [
    h('div.sidebar pure-u-1 pure-u-md-1-4', [sidebar]),
    h('div.content pure-u-1 pure-u-md-3-4', [content])
  ]);

function App(sources) {
  const sidebar = Sidebar(sources);
  const content = createRouter(sources);

  const view$ = $.just(
    view(
      sidebar.DOM,
      content.DOM
    )
  );

  return {
    DOM: view$,
  };
}

export default App;
