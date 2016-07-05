module.exports = {
    entry: ['./testfncreator.js'],
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