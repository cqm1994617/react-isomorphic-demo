const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/ssr-test',
    filename: 'bundle.js'
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|PNG|jpe?g|JPG|gif|GIF)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[hash:5].[ext]'
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        include: /node_modules/,
        use: [
          'style-loader',
          {
            loader: "css-loader"
          },
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          },
          'postcss-loader',
          'sass-loader'
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      inject: true,
      title: 'Home',
      template: 'src/index.html',
      filename: 'index.html'
    })
  ],
  devServer: {
    port: 30001,
    contentBase: '/',
    publicPath: '/ssr-test',
    hot: true,
    historyApiFallback: true
  }
}