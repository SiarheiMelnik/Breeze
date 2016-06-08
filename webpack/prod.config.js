
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import constants from './constants';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import webpackIsomorphicAssets from './assets';

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicAssets);

const config = {
  cache: false,
  debug: false,
  devtool: '',
  entry: {
    app: [
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
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
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
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('[name]-[hash].css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // eslint-disable-line camelcase
        warnings: false // Because uglify reports irrelevant warnings.
      }
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    }),
    webpackIsomorphicToolsPlugin,
  ],
  output: {
    path: constants.BUILD_DIR,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/assets/',
  },
  postcss: () => [autoprefixer({ browsers: 'last 2 version' })],
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['src', 'node_modules'],
    root: constants.ABSOLUTE_BASE,
  },
};

export default config;
