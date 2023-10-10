const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { appDirectory, isProduction, resolveApp } = require('./env');

module.exports = {
  entry: './src/index.jsx',
  output: {
    clean: isProduction,
    path: path.resolve(appDirectory, 'dist'),
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
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        extractComments: false, // 不将注释提取到单独的文件中
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        }
      }),
      new CssMinimizerPlugin()
    ]
  },
  plugins: [
    isProduction &&
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
      }),
    new WebpackBar({ name: isProduction ? '正在打包' : '正在启动' }),
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
    }),
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify(process.env.BASE_URL),
      TIME_OUT: JSON.stringify(process.env.TIME_OUT)
    }),
    new ESLintPlugin({
      extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
      fix: true,
      failOnError: true,
      cache: true,
      cacheLocation: path.resolve(resolveApp('node_modules'), '.cache/.eslintcache'),
      cwd: appDirectory
    })
  ].filter(Boolean),
  module: {
    noParse: /jquery/, // 不去解析jquery和lodash中的依赖库
    rules: [
      {
        test: /\.(js|jsx|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3
                }
              ],
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic'
                }
              ]
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-block-scoping',
              !isProduction && require.resolve('react-refresh/babel')
            ].filter(Boolean)
          }
        }
      },
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
