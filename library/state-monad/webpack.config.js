module.exports = {
    entry: {
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