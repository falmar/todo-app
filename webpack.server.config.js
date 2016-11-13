var debug = process.env.NODE_ENV !== 'production'
var webpack = require('webpack')
var path = require('path')

module.exports = {
  devtool: debug
        ? 'inline-sourcemap'
        : null,
  entry: path.join(__dirname, 'src', 'server', 'index.js'),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: [
            'react', 'es2015', 'stage-0'
          ],
          plugins: [
            'transform-react-constant-elements',
            'transform-react-inline-elements'
          ]
        }
      }, {
        test: /\.css$/,
        loader: 'style!css!'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  output: {
        // output path
    path: path.join(__dirname),
        // output file
    filename: 'server.min.js'
  },
  target: 'node',
  node: {
    fs: 'empty',
    net: 'empty',
    __dirname: false
  },
  plugins: debug
        ? [
          new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('development'),
              'API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:8080')
            }
          }),
          new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
        ] : [
          new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourcemap: false,
            compress: {
              warnings: false
            }
          }),
          new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('production'),
              'API_URL': JSON.stringify(process.env.API_URL)
            }
          })
        ]
}
