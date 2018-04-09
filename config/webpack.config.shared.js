const webpack = require('webpack');
const DefinePlugin = webpack.DefinePlugin;
const ProvidePlugin = webpack.ProvidePlugin;
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CssChunkHashPlugin = require('css-chunks-html-webpack-plugin');

const HtmlElementsPlugin = require('./html-elements-plugin');
const helpers = require('./helpers');

const definePlugins = new DefinePlugin({
  TEST: process.env.NODE_ENV === 'test',
  UAT: process.env.NODE_ENV === 'uat',
  PROD: process.env.NODE_ENV === 'production',
  DEV: process.env.NODE_ENV === 'development'
});

// Define plugins for webpack
const providePlugins = new ProvidePlugin({ $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery', 'windows.jQuery': 'jquery' });
const progressBar = new ProgressBarPlugin();

/*
* Plugin: HtmlElementsPlugin
* Description: Generate html tags based on javascript maps.
*
* If a publicPath is set in the webpack output configuration, it will be automatically added to
* href attributes, you can disable that by adding a "=href": false property.
* You can also enable it to other attribute by settings "=attName": true.
*
* The configuration supplied is map between a location (key) and an element definition object (value)
* The location (key) is then exported to the template under then htmlElements property in webpack configuration.
*
* Example:
*  Adding this plugin configuration
*  new HtmlElementsPlugin({
*    headTags: { ... }
*  })
*
*  Means we can use it in the template like this:
*  <%= webpackConfig.htmlElements.headTags %>
*
* Dependencies: HtmlWebpackPlugin
*/
const htmlElementsPlugin = new HtmlElementsPlugin({
  headTags: require('./head-config.common')
});
const shareEntries = [
  'babel-polyfill',
  helpers.root('src/index.js')
];
/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = (options) => ({
  entry: options.entry ? options.entry.concat(shareEntries) : shareEntries,
  output: options.output,
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          // This is a feature of `babel-loader` for Webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel']
        }
      }, {
        test: /\.s?css$/,
        use: ExtractCssChunks.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]'
              }
            },
            {
              loader: 'sass-loader',
              options: {
                modules: true,
                localIdentName: '[local]'
              }
            }
          ]
        })
      }, {
        test: /\.(jpe?g|png|gif|ico)$/,
        exclude: /(node_modules)/,
        loader: 'url-loader?limit=500&name=assets/ex-images/[name].[ext]'
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=500&minetype=application/font-woff&name=assets/fonts/[name].[ext]'
      }, {
        test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=500&name=assets/fonts/[name].[ext]'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        // This loader will @import your SASS resources into every required SASS module
        // So you can use your shared variables & mixins across
        // all SASS styles without manually importing them in each file
        test: /\.scss$/,
        use: [
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                './src/assets/sass/mixins/common.scss',
                './src/assets/theme/dist/theme.scss'
              ]
            }
          },
          'import-glob'
        ]
      }
    ]
  },
  plugins: options.plugins.concat([
    definePlugins,
    providePlugins,
    htmlElementsPlugin,
    progressBar,
    new ExtractCssChunks(),
    new CssChunkHashPlugin({ inject: true }),
    new PreloadWebpackPlugin({
      rel: 'stylesheet',
      include: 'asyncChunks',
      fileBlacklist: [/\.map|.js/]
    }),
    new webpack.NamedModulesPlugin()
  ]),
  stats: {
    children: false
  },
  resolve: {
    modules: [helpers.root('src'), 'node_modules'],
    extensions: ['.js', '.css', '.scss', '.json', '.jsx']
  },

  devtool: options.devtool
});

