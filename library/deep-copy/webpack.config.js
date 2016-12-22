module.exports = {
    entry: {
        index: './index.js',
        test: './test/index.js'
    },
    output: {
        path: './dist/',
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