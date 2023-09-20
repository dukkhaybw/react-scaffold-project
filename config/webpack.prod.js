const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const prodConfig = merge(baseConfig, {
  mode: 'production',
  devtool: false,
  plugins: []
});

module.exports = prodConfig;
