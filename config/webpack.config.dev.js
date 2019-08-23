const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.tsx",
  output: {
    path: path.resolve(__dirname) + "../../dist/",
    filename: "[name].[hash:8].js",
    chunkFilename: "[name].[hash:8].js",
    publicPath: "/"
  },
  resolve: {
    alias: {
      "@src": path.resolve("./src"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    port: '8080',
    publicPath: '/'
  },
  optimization: {
    runtimeChunk: {
      name: "runtime"
    },
    splitChunks: {
      chunks: "all",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: /src/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        include: /src/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[local]_[hash:base64:5]"
              }
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        loader: "url-loader",
        include: /src/,
        exclude: /node_modules/,
        options: {
          limit: 1024 * 8,
          name: "[name]_[hash:8].[ext]",
          outputPath: "assets",
          publicPath: ""
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]_[hash:8].css",
      chunkFilename: "[id]_[hash:8].css"
    }),
    new HtmlWebpackPlugin({
      title: "Broccoli",
      template: "./src/main.template",
      minify: false
    })
  ]
};
