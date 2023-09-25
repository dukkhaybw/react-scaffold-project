const zopfli = require('@gfx/zopfli');
const { merge } = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const baseConfig = require('./webpack.base');

const prodConfig = merge(baseConfig, {
  mode: 'production',
  devtool: false,
  plugins: [
    new CompressionPlugin({
      compressionOptions: {
        numiterations: 15
      },
      algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback);
      }
    })
  ]
});

module.exports = prodConfig;
