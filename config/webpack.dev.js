const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const baseConfig = require('./webpack.base');

const devConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    port: 3000,
    hot: true,
    open: true
  },
  plugins: [new ReactRefreshWebpackPlugin()]
});

module.exports = devConfig;
