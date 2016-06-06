import webpack from 'webpack';
import koa from 'koa';
import webpackConfig from '../dev.config';
import webpackDev from 'koa-webpack-dev-middleware';
import webpackHot from 'koa-webpack-hot-middleware';
import path from 'path';

const app = koa();
const compiler = webpack(webpackConfig);

app.use(webpackDev(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHot(compiler));

app.use(function *() {
  const filename = path.join(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    this.type = path.extname(filename);
    this.body = result;
  });
});

app.listen(webpackConfig.hotPort, () => {
  console.log('listen dev', webpackConfig.hotPort);
});
