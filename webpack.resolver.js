"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpack = _interopRequireDefault(require("webpack"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _path = _interopRequireDefault(require("path"));

var _hardSourceWebpackPlugin = _interopRequireDefault(require("hard-source-webpack-plugin"));

var _dotenvWebpack = _interopRequireDefault(require("dotenv-webpack"));

var _webpackPwaManifest = _interopRequireDefault(require("webpack-pwa-manifest"));

var _workboxWebpackPlugin = _interopRequireDefault(require("workbox-webpack-plugin"));

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

var _default = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    // To support react-hot-loader
    alias: {
      'react-dom': '@hot-loader/react-dom',
      src: _path.default.resolve(__dirname, 'src'),
      components: _path.default.resolve(__dirname, 'src', 'components'),
      res: _path.default.resolve(__dirname, 'src', 'res'),
      icons: _path.default.resolve(__dirname, 'src', 'res', 'icons'),
      utils: _path.default.resolve(__dirname, 'src', 'utils')
    }
  },
  devtool: 'cheap-module-eval-source-map',
  // more info:https://webpack.js.org/guides/development/#using-source-maps and https://webpack.js.org/configuration/devtool/
  entry: [// must be first entry to properly set public path
  './src/webpack-public-path', 'react-hot-loader/patch', 'webpack-hot-middleware/client?reload=true', _path.default.resolve(__dirname, 'src/index.js') // Defining path seems necessary for this to work consistently on Windows machines.
  ],
  target: 'web',
  mode: 'development',
  // externals: [nodeExternals({ whitelist: ['react-colour-wheel'] })],
  output: {
    path: _path.default.resolve(__dirname, 'dist'),
    // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [new _hardSourceWebpackPlugin.default(), new _webpack.default.HotModuleReplacementPlugin(), new _webpack.default.NoEmitOnErrorsPlugin(), new _htmlWebpackPlugin.default({
    // Create HTML file that includes references to bundled CSS and JS.
    template: 'src/index.ejs',
    favicon: 'src/res/icons/logo.png',
    minify: {
      removeComments: true,
      collapseWhitespace: true
    },
    inject: true
  }), new _webpackPwaManifest.default({
    name: 'My SmartHome',
    short_name: 'MyMoSA2.0',
    description: 'My awesome Progressive Web App for my Smart home system!',
    background_color: '#ffffff',
    theme_color: '#456df5',
    display: 'fullscreen',
    crossorigin: 'use-credentials',
    icons: [{
      src: _path.default.resolve('src/res/icons/logo.png'),
      sizes: [96, 128, 192, 256, 384, 512],
      purpose: 'maskable any'
    }]
  }), new _workboxWebpackPlugin.default.GenerateSW({
    // these options encourage the ServiceWorkers to get in there fast
    // and not allow any straggling "old" SWs to hang around
    clientsClaim: true,
    skipWaiting: true
  }), new _dotenvWebpack.default()],
  module: {
    rules: [{
      test: /\.jsx?$/,
      // exclude: /node_modules(?!(\/react-colour-wheel))/,
      exclude: /node_modules/,
      // include: /node_modules\/react-colour-wheel/,
      use: ['babel-loader']
    }, {
      test: /\.eot(\?v=\d+.\d+.\d+)?$/,
      use: ['file-loader']
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff'
        }
      }]
    }, {
      test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream'
        }
      }]
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml'
        }
      }]
    }, {
      test: /\.(jpe?g|png|gif|ico)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }]
    }, {
      test: /(\.css|\.scss|\.sass)$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: function plugins() {
            return [// eslint-disable-next-line global-require
            require('autoprefixer')];
          },
          sourceMap: true
        }
      }, {
        loader: 'sass-loader',
        options: {
          includePaths: [_path.default.resolve(__dirname, 'src')],
          sourceMap: true
        }
      }]
    }]
  }
};
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "C:\\Users\\Lorenzo\\Desktop\\REPS\\smarthome-admin-panel\\webpack.config.dev.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
