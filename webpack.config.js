const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line

module.exports = {
  mode: process.env.NODE_ENV,
  context: __dirname,
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name]-[contenthash].js',
    publicPath: '/',
  },
  node: {
    fs: 'empty',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/public/',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'url-loader',
      },
      { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name]-[contenthash].css',
      chunkFilename: '[id].css',
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        REACT_APP_API_URL: JSON.stringify('http://localhost:9090/api'),
        EXPERIMENTAL_FEATURES: JSON.stringify('true'),
      },
    }),
    new HtmlWebpackPlugin({
      template: 'public/index_template.html',
      robots: 'noindex',
      title: 'Example',
      descripcion: 'Template for React.',
    }),
  ],
};
