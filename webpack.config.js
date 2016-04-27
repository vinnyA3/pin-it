var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {
  context: path.resolve('public/assets/js'),
  devtool: debug ? "inline-sourcemap" : null,
  entry: ["./script.js","../../app/app.js"],
  output: {
    path: path.resolve('build/js/'),
    publicPath: "/public/assets/js",
    filename: "bundle.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
  devServer:{
    contentBase: 'public/app/views'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test:/\.scss$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader'
      },
      {
        test:/\.html$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      }
    ]
  },
  postcss: function() {
    return [precss, autoprefixer];
  },
  resolve:{
    extensions: ['','.js']
  }
};
