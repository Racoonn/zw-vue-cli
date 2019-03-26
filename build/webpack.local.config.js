const merge = require('webpack-merge');

const base = require('./webpack.base.config.js');

module.exports = merge(base, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: '0.0.0.0',
        historyApiFallback: true,
        port: 8888
    },
});