module.exports = {
    entry: ['babel-polyfill', './src/testtraverse.js'],
    output: {
        path: './target/',
        filename: 'main.js'
    },
    module: {
        loaders: [{
            test: /.js$/,
            loader: 'babel-loader'
        }]
    }
};