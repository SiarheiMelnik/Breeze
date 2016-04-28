var path = require('path');
var Webpack = require('webpack');
var server = require('./utils/app-server');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var NODE_ENV = process.env.NODE_ENV;

module.exports = {
    entry: {
        breeze: [
            'webpack-dev-server/client',
            'webpack/hot/dev-server',
            path.join(__dirname, '../src/client/')
        ]
    },

    output: {
        path: path.join(__dirname, '../src/client/build'),
        filename: '[name]-build.js',
        publicPath: '/'
    },

    module: {
        loaders: [
            { test: /\.html/, loader: 'html-loader' },
            { test: /\.(js|es)$/, loader: 'babel-loader', exclude: /node_modules/ },
            //{ test: /\.(jsx|es)$/, loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0' },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.(png|jpg|jpeg|gif)$/, loader: 'file-loader' },
            { test: /\.(woff|woff2)$/, loader: 'url-loader?limit=100000' },
            { test: /\.(sass|scss)$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?minimize!sass-loader') },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?minimize') }
       ]
    },

    progress: true,
    devtool: NODE_ENV === 'development' ? "cheap-inline-module-source-map" : null,

    resolve: {
        modulesDirectories: ['node_modules', 'src/client', 'src/server'],
        extensions: ['', '.jsx', '.js', '.es', '.json', 'css', 'scss']
    },

    plugins: [
        new ExtractTextPlugin('[name]-build.css'),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NoErrorsPlugin(),

        new Webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(true),
                NODE_ENV: JSON.stringify('development')
            }
        }),

        function () {
            this.plugin("done", function(stats) {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1)
                {
                    console.log(stats.compilation.errors);
                } else {
                    console.log('success build');
                    server();
                }
            });
        }
    ]
};
