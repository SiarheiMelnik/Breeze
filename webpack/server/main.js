
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';
import config from '../dev.config';
import koa from 'koa';
import path from 'path';

const app = express();

const compiler = webpack(config);

app.use(webpackDev(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true
}));

app.use(webpackHot(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(config.hotPort, () => {
  console.log('Hot server started at port %d', config.hotPort); // eslint-disable-line no-console
});
