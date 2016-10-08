var webpack = require('webpack');

var host = 'localhost';
var port = 8080;
var path = __dirname + '/src/';

module.exports = {
    entry: './src/index.js',
    devtool: 'cheap-module-eval-source-map',
    contentBase: path,
    output: {
        path: path,
        filename: 'bundle.js',
        publicPath: '/'
    },
    watch: true,
    progress: true,
    devServer: {
        host: host,
        port: port,
        contentBase: path,
        inline: true
    }
};
