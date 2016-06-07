
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import constants from './constants';
import path from 'path';
import ip from 'ip';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const devtools = 'eval-source-map';

const serverIp = ip.address();

const config = {
  hotPort: constants.HOT_RELOAD_PORT,
  cache: true,
  debug: true,
  devtool: devtools,
  entry: {
    app: [
      `webpack-hot-middleware/client?path=http://${serverIp}:${constants.HOT_RELOAD_PORT}/__webpack_hmr`,
      path.join(constants.SRC_DIR, 'browser/index.js'),
    ],
  },
  module: {
    loaders: [
      {
        loader: 'url-loader?limit=10000',
        test: /\.(gif|jpg|png|svg)$/,
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass',
      },
      {
        loader: 'url-loader?limit=100000',
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
      },
      {
        test: /\.js$/,
        exclude: constants.NODE_MODULES_DIR,
        loader: 'babel',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(constants.WEBPACK_DIR, 'server/index.html'),
      inject: 'body',
      filename: 'index.html'
    }),
  ],
  output: {
    path: constants.BUILD_DIR,
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: `http://${serverIp}:${constants.HOT_RELOAD_PORT}/build/`,
  },
  postcss: () => [autoprefixer({ browsers: 'last 2 version' })],
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['src', 'node_modules'],
    root: constants.ABSOLUTE_BASE,
  },
};

export default config;
