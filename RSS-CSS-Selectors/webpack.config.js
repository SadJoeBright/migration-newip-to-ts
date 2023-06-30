const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index'),
  output : {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist')

  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ts$/i,
        use: 'ts-loader',
      }
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  devtool: 'inline-source-map',

  plugins: [
    new HtmlWebpackPlugin ({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new CleanWebpackPlugin(),
  ],
  
  devServer: {
    watchFiles: path.resolve(__dirname, 'src'),
    port: 9000
  },
}