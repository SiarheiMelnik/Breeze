import Router5, { loggerPlugin } from 'router5';
import historyPlugin from 'router5-history';

export default function createRouter(routes, defaultRoute) {
  return new Router5()
      .add(routes)
      .setOption('useHash', false)
      .setOption('defaultRoute', defaultRoute)
      .usePlugin(loggerPlugin())
      .usePlugin(historyPlugin());
}
