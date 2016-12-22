module.exports = {
    entry: ['./test/index.js'],
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