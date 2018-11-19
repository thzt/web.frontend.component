const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: {
        index: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        devtoolModuleFilenameTemplate: '[resource-path]',
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].js',
        publicPath: 'dist/'
    },
    module: {
        rules: [
            { test: /\.js$/, use: { loader: 'babel-loader', query: { presets: ['@babel/preset-env'] } } },
        ]
    },
    plugins: [
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        port: 8005,
        host: '127.0.0.1',
    }
};