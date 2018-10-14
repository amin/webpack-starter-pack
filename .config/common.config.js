const path = require('path');

const __ROOT = require('app-root-path').path;
const __APP = path.join(__ROOT, "app");
const __DIST = path.join(__ROOT, "dist");

module.exports = {

  entry: path.join(__APP, "javascript", "index.js"),
  output: {
    path: __DIST,
    filename: 'app.js'
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: (/node_modules|bower_componenets/),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ]
  }

}
