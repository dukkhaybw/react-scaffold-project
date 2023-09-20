const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { appDirectory, isProduction } = require('./env');

module.exports = {
  entry: './src/index.js',
  output: {
    clean: isProduction,
    path: path.resolve(appDirectory, 'build'),
    filename: `js/[name]${isProduction ? '.[chunkhash:8]' : ''}.js`
  },
  resolve: {
    modules: ['node_modules', path.resolve(appDirectory, './packages')],
    extensions: ['.jsx', '.js', '.json', '.ts', '.tsx', '.wasm'],
    alias: {
      '@': path.join(appDirectory, './src')
    }
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(appDirectory, './loaders')]
  },
  plugins: [
    isProduction &&
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
      }),
    new WebpackBar({ name: isProduction ? '正在启动' : '正在打包' }),
    new HtmlwebpackPlugin({
      favicon: path.resolve(appDirectory, './public/favicon.ico'),
      template: path.resolve(appDirectory, './public/index.html'), // 使用的模板路径
      minify: isProduction
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true
          }
    }),
    // 忽略moment包的语言包，减小打包体积
    new webpack.IgnorePlugin({
      contextRegExp: /moment$/,
      resourceRegExp: /locale/
    })
  ].filter(Boolean),
  module: {
    noParse: /jquery|lodash/, // 不去解析jquery和lodash中的依赖库
    rules: [
      {
        test: /\.(png|jpg|gif|svg|)$/,
        type: 'asset',
        generator: {
          filename: 'img/[name].[hash:4][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        }
      },
      {
        test: /\.(ttf|woff|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash:4][ext]'
        }
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
};
