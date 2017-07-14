var path = require("path");
const webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./client/src/index.js",
  output: {
    filename: process.env.NODE_ENV === "production" ? "[name].[chunkhash].js" : "[name].js",
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
        exclude: /node_modules/,
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
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
};
