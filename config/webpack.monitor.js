const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const baseConfig = require('./webpack.base');

const smw = new SpeedMeasureWebpackPlugin();
const prodConfig = merge(baseConfig, {
  mode: 'production',
  devtool: false,
  plugins: [new BundleAnalyzerPlugin()]
});

module.exports = smw.wrap(prodConfig);
