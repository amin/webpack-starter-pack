const merge = require('webpack-merge')
const path = require('path');
const dirTree = require('directory-tree');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const __ROOT = require('app-root-path').path;
const __APP = path.join(__ROOT, "app");
const __DIST = path.join(__ROOT, "dist");
let pages = [];

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
  },

  plugins: []
});


const tree = dirTree(path.join(__ROOT, "app/views/"), {extensions:/\.html$/}, (item) => {
    pages.push(item.name.replace(/\.[^/.]+$/, ""));
});


pages.forEach((file) => {

  config.plugins.push(
    new HtmlWebpackPlugin({
      template: path.join(__APP, `views/${file}.html`),
      inject: 'true',
      filename: path.join(__DIST, `${file}.html`),
    })
  );
}),

module.exports = config;
