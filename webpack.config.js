var path = require('path');
var config = {
    entry: path.resolve(__dirname, 'src/DoubleScrollbar.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
            loader: 'babel' // The module to load. "babel" is short for "babel-loader"
        }]
    },
    externals: {
        'react': 'React'
    }
};

module.exports = config;
