var webpack = require('webpack');
var path = require('path');

var config = {
    entry: path.resolve(__dirname, 'src/DoubleScrollbar.jsx'),
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'DoubleScrollbar.js',
        library: "DoubleScrollbar",
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [{
            test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
            loader: 'babel', // The module to load. "babel" is short for "babel-loader"
            exclude: /(node_modules|bower_components)/
        }]
    },
    resolve: {
      root: path.resolve('./src'),
      extensions: ['', '.js']
    },
    externals: {
        'react': {
          root: 'React',
          common2js: 'react',
          commonjs: 'react',
          amd: 'react'
        }
    }
};

module.exports = config;
