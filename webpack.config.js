/**
 * @see https://github.com/JonathanCallewaert/SWC-Typescript-Webpack-React-Emotion
 * @see https://github.com/LukeGeneva/swc-react-template
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    publicPath: '/',
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
  ],
  devServer: {
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
};
