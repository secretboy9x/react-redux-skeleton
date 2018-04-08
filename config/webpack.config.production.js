const webpack = require('webpack');
const optimize = webpack.optimize;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const helpers = require('./helpers');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const METADATA = {
  title: 'Skeleton React Redux',
  baseUrl: '/'
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
  metadata: METADATA,
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true
  },
  inject: true
});

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = require('./webpack.config.shared')({
  output: {
    path: helpers.root('dist'),
    filename: '[name].[hash].js'
  },

  plugins: [
    htmlWebpackPlugin,
    new BundleAnalyzerPlugin(),
    new optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        drop_console: false,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false
      },
      mangle: {
        except: [
          'exports',
          'require'
        ]
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin(
      [{
        from: 'src/index.html'
      }, {
        from: 'src/assets/images',
        to: 'assets/images'
      }], {
        // Doesn't copy any files with a txt extension
        ignore: ['*.txt'],
        copyUnmodified: true
      }),
    new optimize.CommonsChunkPlugin({
      name: ['bundle'],
      chunks: ['app'],
      minChunks (module) {
        return helpers.isExternal(module);
      }
    }),
    new optimize.CommonsChunkPlugin({
      name: ['bundle.common'],
      chunks: ['bundle'],
      minChunks (module) {
        let targets = ['jquery', 'immutable', 'prop-types', 'bootstrap',
          'moment', 'axios', 'babel-polyfill', 'lodash', 'babel-runtime'];
        return helpers.checkChunk(module, targets);
      }
    }),
    new optimize.CommonsChunkPlugin({
      name: ['react.bundle.1'],
      chunks: ['bundle'],
      minChunks (module) {
        let targets = ['react', 'react-intl', 'react-overlays', 'react-highlight-words',
          'react-s-alert'];
        return helpers.checkChunk(module, targets);
      }
    }),
    new optimize.CommonsChunkPlugin({
      name: ['react.bundle.2'],
      chunks: ['bundle'],
      minChunks (module) {
        let targets = ['react-dom', 'react-router-redux', 'react-router', 'react-select'];
        return helpers.checkChunk(module, targets);
      }
    }),
    new optimize.CommonsChunkPlugin({
      name: ['redux.bundle'],
      chunks: ['bundle'],
      minChunks (module) {
        let targets = ['redux', 'redux-module-builder', 'redux-thunk', 'redux-logger',
          'redux-debounce', 'react-redux', 'redux-form'];
        return helpers.checkChunk(module, targets);
      }
    })
  ]
});
