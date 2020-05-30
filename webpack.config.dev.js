import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import WorkboxPlugin from 'workbox-webpack-plugin';


export default {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    // To support react-hot-loader
    alias: {
      'react-dom': '@hot-loader/react-dom',
      src: path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src', 'components'),
      res: path.resolve(__dirname, 'src', 'res'),
      icons: path.resolve(__dirname, 'src', 'res', 'icons'),
      utils: path.resolve(__dirname, 'src', 'utils'),
    },
  },
  devtool: 'cheap-module-eval-source-map', // more info:https://webpack.js.org/guides/development/#using-source-maps and https://webpack.js.org/configuration/devtool/
  entry: [
    // must be first entry to properly set public path
    './src/webpack-public-path',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, 'src/index.js'), // Defining path seems necessary for this to work consistently on Windows machines.
  ],
  target: 'web',
  mode: 'development',
  // externals: [nodeExternals({ whitelist: ['react-colour-wheel'] })],
  output: {
    path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({ // Create HTML file that includes references to bundled CSS and JS.
      template: 'src/index.ejs',
      favicon: 'src/res/icons/logo.png',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
    }),
    new WebpackPwaManifest({
      name: 'My SmartHome',
      short_name: 'MyMoSA2.0',
      description: 'My awesome Progressive Web App for my Smart home system!',
      background_color: '#ffffff',
      theme_color: '#456df5',
      display: 'fullscreen',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: path.resolve('src/res/icons/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          purpose: 'maskable any',
        },
      ],
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // exclude: /node_modules(?!(\/react-colour-wheel))/,
        exclude: /node_modules/,
        // include: /node_modules\/react-colour-wheel/,
        use: ['babel-loader'],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: ['file-loader'],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/octet-stream',
            },
          },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/svg+xml',
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                // eslint-disable-next-line global-require
                require('autoprefixer'),
              ],
              sourceMap: true,
            },
          }, {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, 'src')],
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
