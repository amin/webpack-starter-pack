const merge = require('webpack-merge')
const path = require('path');

const __ROOT = require('app-root-path').path;
const __APP = path.join(__ROOT, "app");
const __DIST = path.join(__ROOT, "dist");

const config = merge(require('./common.config.js'), {
  mode: 'development',

  devServer: {
    contentBase: __DIST,
    port: 9000,
    compress: true,
    open: true
  },

  module: {
    rules: [
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
});

module.exports = config;
