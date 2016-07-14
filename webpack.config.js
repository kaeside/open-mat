var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var packageData = require('./package.json');

var filename = [packageData.name, packageData.version, 'js'];

let plugins = [];

plugins.push(new ExtractTextPlugin('style.css'));

module.exports = {
    entry: path.resolve(__dirname, packageData.main),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: filename.join('.'),
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.scss$/,
          include: /(client\/sass)/,
          loader: ExtractTextPlugin.extract('css!sass')
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          loaders: [
              'url?limit=8192',
              'img'
          ]
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'react']
          }
        }
      ]
    },
    plugins: plugins,
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
};
