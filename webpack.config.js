const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const srcPath = path.resolve(__dirname, './lib');
const assetsPath = path.resolve(srcPath, 'assets');
const isDev = (process.env.NODE_ENV !== 'production');

module.exports = {
  entry: {
    index: './lib/index',
    //vendors: ['react']
  },
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/',
    libraryTarget: "umd",
    filename: `[name].js`,
  },
  externals: {
    "react": 'react',
    "react-dom": 'reactDOM',
    "prop-types": 'prop-types',
    "react-3g": 'react-3g'
  },
  module: {
    rules: [
      {
          test: /\.(jsx|js)?$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: ['es2015', 'react','stage-0']
              }
          }
      },
      {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                  {
                      loader: 'css-loader'
                  },
                  {
                      loader: 'postcss-loader',
                      options: {
                          plugins: [autoprefixer({browsers: ['> 1%', 'last 2 versions', 'ie >= 8', 'iOS 7']})],
                      }
                  }
              ]
          })
      },
      {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                  {
                      loader: 'css-loader'
                  },
                  {
                      loader: 'postcss-loader',
                      options: {
                          plugins: [autoprefixer({browsers: ['> 1%', 'last 2 versions', 'ie >= 8', 'iOS 7']})]
                      }
                  },
                  'less-loader'
              ]
          })
      },
      {
          test: /\.(jpeg|jpg|png|gif|svg)$/,
          use: [{
              loader: 'url-loader',
              options: {
                  limit: 2048,
                  name: `image/[name]${isDev ? '' : '_[hash]'}.[ext]`
              }
          }]
      },
      {
          test: /\.(woff|woff2|ttf|eot)$/,
          use: [{
              loader: 'file-loader',
              options: {
                  name: `font/[name]${isDev ? '' : '_[hash]'}.[ext]`
              }
          }]
      },
      {
          test: /\.json$/,
          use: 'json-loader'
      },
    ],
  },
  resolve: {
    modules: [
        "node_modules",
        path.resolve(__dirname,"/lib")
    ],
    extensions: ['.js','jsx','.less']
  },
  devServer: {
    contentBase: './build',
    //hot: true
  },
  plugins: [
    new ExtractTextPlugin(`css/index.css`, {allChunks: true}),
    //new webpack.optimize.CommonsChunkPlugin({names: ["vendors","webpackassets"]}),
    new webpack.optimize.UglifyJsPlugin({
        mangle: {
            except: ['$super', '$', 'exports', 'require', 'module', '_']
        },
        compress: {
            warnings: false
        },
        output: {
            comments: false,
        }
    }),
    //new webpack.optimize.OccurrenceOrderPlugin(),
    //new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devtool: "source-map"
};
