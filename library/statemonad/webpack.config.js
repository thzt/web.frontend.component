module.exports = {
    entry: ['./test/client.js'],
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