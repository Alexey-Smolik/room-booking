var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: {
    bargauge: __dirname + '/src/index.js'
    //You can add additional entry points if you want
         //grid: __dirname + '/app/grid/app.js'
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].bundle.js'
  },
    module: {
        loaders: [
          {
              test: /.jsx?$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                  presets: ['es2015', 'react']
              }
          }
        ]
    },
    plugins: [
      new webpack.DefinePlugin({
          'process.env': {
              'NODE_ENV': JSON.stringify('production')
          }
      }),
      new webpack.optimize.UglifyJsPlugin({
          mangle: true,
          sourcemap: false,
          compress: { warnings: false }
      })
    ]
};