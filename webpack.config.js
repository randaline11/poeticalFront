'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const extractSass = new ExtractTextPlugin({
  filename: 'style.css',
  disable: process.env.NODE_ENV === 'development',
});

const config = {
  context: `${__dirname}/src`, // `__dirname` is root of project and `src` is source
  entry: {
    app: './app.js',
  },
  output: {
    path: path.join(__dirname, 'public/build'),
    // path: `${__dirname}/dist`, // `dist` is the destination
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  node: {
    fs: 'empty',
  },
  plugins: [
    /* prevent that webpack loads momentjs-support for all languages. Only DE and EN.
     * see http://stackoverflow.com/questions/25384360/how-to-prevent-moment-js-from-loading-locales-with-webpack
     */
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(de|en)$/),
  ],
  module: {
    rules: [{
      test: /node_modules[\\\/]vis[\\\/].*\.js$/, // vis.js files
      loader: 'babel-loader',
      query: {
        cacheDirectory: true,
        presets: ['babel-preset-es2015'].map(require.resolve),
        plugins: [
          'transform-es3-property-literals', // see https://github.com/almende/vis/pull/2452
          'transform-es3-member-expression-literals', // see https://github.com/almende/vis/pull/2566
          'transform-runtime', // see https://github.com/almende/vis/pull/2566
        ],
      },
    }, {
      test: /\.js$/, // Check for all js files
      loader: 'babel-loader',
      query: {
        presets: ['babel-preset-es2015'].map(require.resolve),
      },
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ],
    },
    {
      test: /(\.scss)$/,
      use: extractSass.extract({
        use: [
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
        fallback: 'style-loader', // use style-loader in development mode
      }),
    }, {
      test: /.*\.png$/i,
      loaders: ['file-loader', {
        loader: 'image-webpack-loader',
        query: {
          progressive: true,
          pngquant: {
            quality: '65-90',
            speed: 4,
          },
        },
      },
      ],
    },
    ],
  },
  plugins: [
    extractSass,
  ],
  // To run development server
  devServer: {
    contentBase: `${__dirname}/src`,
  },

  devtool: 'eval-source-map', // Default development sourcemap
};

// Check if build is running in production mode, then change the sourcemap type
if (process.env.NODE_ENV === 'production') {
  config.devtool = 'source-map';

  // Can do more here
  // JSUglify plugin
  // Offline plugin
  // Bundle styles seperatly using plugins etc,
}

module.exports = config;
