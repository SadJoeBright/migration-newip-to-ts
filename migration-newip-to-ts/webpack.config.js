const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/index'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.ts$/i,
                use: 'ts-loader'
            },
            {
                test: /\.(jpe?g|webp|gif|)$/i,
                type: 'asset/resource',
                generator: {
                  filename: 'assets/images/[name][ext]',
                },
              },
            {
                test: /\.(png|svg|)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/icons/[name][ext]',
                },
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
        assetModuleFilename: path.join('assets/icons', '[name].[contenthash][ext]'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new EslintPlugin({ extensions: 'ts' }),
        new MiniCssExtractPlugin({ filename: 'styles.css' }),
        new FaviconsWebpackPlugin({
            logo: path.resolve(__dirname, './src//assets/icons/global.png'),
            inject: true,
            outputPath: 'assets/icons',
          }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
