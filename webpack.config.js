var path = require("path");
const webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var LiveReloadPlugin = require("webpack-livereload-plugin");
module.exports = {
  entry: "./client/src/index.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build")
  },
  devtool: process.env.NODE_ENV === "production" ? "source-map" : "",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        use: "babel-loader"
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html"
    }),
    new LiveReloadPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
};
