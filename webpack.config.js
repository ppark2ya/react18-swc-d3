/**
 * @see https://github.com/JonathanCallewaert/SWC-Typescript-Webpack-React-Emotion
 * @see https://github.com/LukeGeneva/swc-react-template
 * @see https://webpack.js.org/loaders/
 * @see https://michaelceber.medium.com/how-to-setup-and-use-css-modules-in-react-with-webpack-7f512b946ae0
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      mode: 'local',
      auto: true,
      exportLocalsConvention: 'camelCase',
      localIdentName: '[name]_[local]_[hash:base64:5]',
    },
    importLoaders: 2,
    sourceMap: devMode, // turned off as causes delay
  },
};

// For our normal CSS files we would like them globally scoped
const CSSLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      mode: 'global',
      auto: true,
      exportLocalsConvention: 'camelCase',
    },
    importLoaders: 2,
    sourceMap: devMode, // turned off as causes delay
  },
};

const SASSLoader = {
  loader: 'sass-loader',
  options: {
    // Prefer `dart-sass`
    implementation: require('sass'),
    sassOptions: {
      indentWidth: 4,
      includePaths: [path.resolve(__dirname, 'styles/')],
      sourceMap: devMode,
    },
  },
};

// Standard style loader (prod and dev covered here)
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const styleLoader = devMode ? 'style-loader' : MiniCssExtractPlugin.loader;

module.exports = {
  mode: 'none',
  entry: './src/index.tsx',
  output: {
    clean: true,
    filename: '[name].bundle.js',
    chunkFilename: '[id].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          // `.swcrc` can be used to configure swc
          loader: 'swc-loader',
        },
      },
      {
        test: /\.(sa|sc|c|pc)ss$/i,
        exclude: /\.module\.(sa|sc|c|pc)ss$/,
        use: [styleLoader, CSSLoader, 'postcss-loader', SASSLoader],
      },
      {
        test: /\.module\.(sa|sc|c|pc)ss$/,
        use: [styleLoader, CSSModuleLoader, 'postcss-loader', SASSLoader],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'public/index.html'),
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  devServer: {
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
};
