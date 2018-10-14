const merge = require('webpack-merge')
const path = require('path');
const zip = require('zip-webpack-plugin');
const clean = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const __ROOT = require('app-root-path').path;
const __APP = path.join(__ROOT, "app");
const __BUILD = path.join(__ROOT, "build");

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

  new HtmlWebpackPlugin({
        template: path.join(__APP, "views", "index.html"),
        inject: 'true',
        filename: path.join(__BUILD, "index.html"),
      }),
      new MiniCssExtractPlugin({filename: "app.[chunkhash].css"})
]

});

module.exports = config;
