var path = require('path');

module.exports = {
  entry: './main.js',
  output: {
    path: './',
    filename: 'public/index.js'
    //devtoolLineToLine: true,
  },
  //devtool: 'eval',
  //devtool: 'eval-source-map',

  module: {
    loaders: [
      {
        //test: /\.es6$/,
        //test: /\.js$/,
        //test: path.join(__dirname, 'src_browser'),
        exclude: /(node_modules|bower_components)/,
        //exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]

  }
};
