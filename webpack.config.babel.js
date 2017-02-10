import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: 'app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    // Enables automatic reloading when files are changed.
    //
    // As of February 10, 2017, Webpack's docs mention that: "By default the
    // application will be served with inline mode enabled." This doesn't seem
    // to be the case, as without the inline option specified, there is no auto
    // reloading.
    //
    // Reference: https://webpack.js.org/configuration/dev-server/#devserver-inline-cli-only
    inline: true
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ],
    extensions: [
      '.js', '.json', // Defaults
      '.jsx'
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Match both .js and .jsx.
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: [ 'css-loader', 'sass-loader' ]
        })
      },
      {
        test: /\.(png|jpg|ico)/,
        use: 'url-loader?limit=10000'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: 'img/favicon.ico',
      template: 'index.html',
    }),

    new ExtractTextPlugin('style.css')
  ]
};
