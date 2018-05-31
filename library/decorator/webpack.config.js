module.exports = {
    entry: {
        example: './example/index.js'
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