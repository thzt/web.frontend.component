module.exports = {
    entry: ['babel-polyfill', './test/index.js'],
    output: {
        path: './dist/',
        filename: 'index.js'
    },
    module: {
        loaders: [{
            test: /.js$/,
            loader: 'babel-loader'
        }]
    }
};