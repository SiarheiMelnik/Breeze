
import Hello from '../pages/Hello';
import Home from '../pages/Home';
import { Observable as $ } from 'rx';
import { startsWithSegment } from 'router5.helpers';

export default function Viewport(sources) {
  const routerSource = sources.router;
  const routeComponent$ = routerSource
    .routeNode$('')
    .map(route => {
      const startsWith = startsWithSegment(route);

      if (startsWith('home')) {
        return Home(sources);
      }

      if (startsWith('hello')) {
        return Hello(sources);
      }

      return Home(sources);
    });

  return {
    DOM: routeComponent$.flatMapLatest(
      component => component.DOM
    ),
    router: routeComponent$.flatMapLatest(
      component => component.router || $.empty()
    )
  };
}
