const merge = require('webpack-merge')
const path = require('path');
const zip = require('zip-webpack-plugin');
const clean = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dirTree = require('directory-tree');


const __ROOT = require('app-root-path').path;
const __APP = path.join(__ROOT, "app");
const __BUILD = path.join(__ROOT, "build");

let pages = [];

const config = merge(require('./common.config.js'), {

  mode: 'production',

  output: {
    path: __BUILD,
    filename: "app.[chunkhash].js"
  },

  module: {
    rules: [
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: __BUILD
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname)
              }
            }
          },
          'sass-loader',
        ]
      }
    ]
  },

  plugins: [
  new clean(__BUILD, {
    root: __ROOT
  }),

      new MiniCssExtractPlugin({filename: "app.[chunkhash].css"})
]

});

const tree = dirTree(path.join(__ROOT, "app/views/"), {extensions:/\.hbs$/}, (item) => {
    pages.push(item.name.replace(/\.[^/.]+$/, ""));
});


pages.forEach((file) => {

  config.plugins.push(
    new HtmlWebpackPlugin({
          template: path.join(__APP, `views/${file}.hbs`),
          inject: 'true',
          filename: path.join(__BUILD, `${file}.html`),
        }),
  );
}),

module.exports = config;
