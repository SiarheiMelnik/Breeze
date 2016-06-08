import config from '../config';

const renderPage = () => {
  const assets = webpackIsomorphicTools.assets();
  console.log(assets);
  if (!config.isProduction) {
    webpackIsomorphicTools.refresh();
  }
};

export default () => function * render(next) {
  renderPage();
  yield next;
};
