const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base');
const devConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    port: 3000,
    hot: true,
    open: true
  },
  plugins: []
});

module.exports = devConfig;
