
import switchPath from 'switch-path';
import Main from './pages/Main';
import Hello from './pages/Hello';

export default function CreateRouter(sources) {
  const sinks$ = sources.History.map(({ pathname }) => {
    const pathAndValue = switchPath(pathname, {
      '/': Main,
      '/hello': Hello
    });

    const component = pathAndValue.value;
    const Component$ = component(sources);

    return {
      Component: Component$,
    };
  });

  return {
    DOM: sinks$.flatMapLatest(s => s.Component.DOM),
    History: sinks$.flatMapLatest(s => s.Component.link),
  };
}
