var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');

module.exports = {
    // context: path.join(__dirname, 'public', 'js'), // context for webpackserver
    devtool: debug
        ? 'inline-sourcemap'
        : null,
    entry: path.join(__dirname, 'src', 'app.js'),
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
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
                }
            }, {
                test: /\.css$/,
                loader: 'style!css!'
            },{
                test: /\.json$/, 
                loader: 'json-loader'
            }
        ]
    },
    output: {
        // output path
        path: path.join(__dirname, 'public'),
        // output file
        filename: 'app.min.js'
    },
    externals: {
        // example
        // require('jquery') is external and available
        // on the global var jQuery
        // 'jquery': 'jQuery'
    },
    plugins: debug
        ? [new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('development'),
                    'API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:8080')
                }
            })]
        : [
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
};
