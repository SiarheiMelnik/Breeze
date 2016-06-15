import webpack from 'webpack';
import koa from 'koa';
import webpackConfig from '../dev.config';
import webpackDev from 'koa-webpack-dev-middleware';
import webpackHot from 'koa-webpack-hot-middleware';

const app = koa();
const compiler = webpack(webpackConfig);

app.use(webpackDev(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHot(compiler));

app.listen(webpackConfig.hotPort, () => {
  console.log('listen dev hot', webpackConfig.hotPort);
});
