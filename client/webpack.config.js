const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
      }),
    // new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc: './src-sw.js', // come back to this if it doesn't plug in
        swDest: 'src-sw.js',
      }),
      new WebpackPwaManifest({
        name: 'GetYourTextEditingDone',
        short_name: 'textEdit',
        description: 'My awesome Progressive Web App!',
        background_color: '#FFFFFF',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('./src/images/logo.png'), // come back to this if it doesn't compile
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons')// multiple sizes
          },
        ]
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']
            },
          },
        },
      ],
    },
  };
}