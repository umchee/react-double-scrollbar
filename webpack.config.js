var webpack = require('webpack');
var path = require('path');
var libraryName = 'DoubleScrollbar';
var outputFile = libraryName + '.js';

var config = {
    entry: path.resolve(__dirname, 'src/DoubleScrollbar.jsx'),
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [{
            test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
            loader: 'babel', // The module to load. "babel" is short for "babel-loader"
            exclude: /node_modules/
        },
        {
          test: /(\.jsx|\.js)$/,
          loader: "eslint-loader",
          exclude: /node_modules/
        }
        ]
    },
    resolve: {
      root: path.resolve('./src'),
      extensions: ['', '.js', 'jsx']
    },
    externals: {
        'react': 'react'
    }
};

module.exports = config;
