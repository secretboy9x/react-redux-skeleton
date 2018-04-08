const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helpers = require('./helpers');

const METADATA = {
  title: 'Skeleton React Redux',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

/*
* Plugin: HtmlWebpackPlugin
* Description: Simplifies creation of HTML files to serve your webpack bundles.
* This is especially useful for webpack bundles that include a hash in the filename
* which changes every compilation.
*
* See: https://github.com/ampedandwired/html-webpack-plugin
*/
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: helpers.root('src/index.html'),
  title: METADATA.title,
  chunksSortMode: 'manual',
  chunks: ['bundle.common', 'bundle', 'react.bundle.1', 'react.bundle.2',
    'react.bootstrap.bundle', 'redux.bundle', 'app'],
  metadata: METADATA
});

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = require('./webpack.config.shared')({
  output: {
    path: helpers.root('src'),
    filename: '[name].[hash].js'
  },
 /**
  * Developer tool to enhance debugging
  *
  * See: http://webpack.github.io/docs/configuration.html#devtool
  * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
  */
  devtool: 'cheap-module-source-map',

  plugins: [
    htmlWebpackPlugin,
    new webpack.NoEmitOnErrorsPlugin()
  ],
/**
 * Webpack Development Server configuration
 * Description: The webpack-dev-server is a little node.js Express server.
 * The server emits information about the compilation state to the client,
 * which reacts to those events.
 *
 * See: https://webpack.github.io/docs/webpack-dev-server.html
 */
  devServer: {
    port: 8080,
    host: 'localhost',
    hot: true,
    contentBase: helpers.root('src'),
    stats: 'errors-only',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  }
});
