import './App.scss';
import { Observable } from 'rx';
import { h } from '@cycle/dom';
import Sidebar from './Sidebar';
import Content from './Content';

function App(sources) {
  const sidebar = Sidebar(sources);
  const content = Content(sources);

  const view = () => {
    const sidebarVtree$ = sidebar.DOM;
    const contentVtree$ = content.DOM;
    return Observable.combineLatest(
      sidebarVtree$,
      contentVtree$,
      (sidebarVtree, contentVtree) =>
        h('div#layout .pure-g', [
          sidebarVtree,
          contentVtree
        ])
    );
  };

  const view$ = view();

  return {
    DOM: view$
  };
}

export default App;
