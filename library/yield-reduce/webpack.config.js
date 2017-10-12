const path = require('path');

module.exports = {
    entry: {
        'index': ['babel-polyfill', './index.js'],
        'test-reduce': ['babel-polyfill', './example/test-reduce.js']
    },
    output: {
        path: path.resolve('./dist/'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
            test: /.js$/,
            loader: 'babel-loader'
        }]
    }
};