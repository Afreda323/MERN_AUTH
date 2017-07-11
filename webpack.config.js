var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var LiveReloadPlugin = require("webpack-livereload-plugin");
module.exports = {
  entry: "./client/src/index.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build")
  },
  devtool: "eval",
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
    new LiveReloadPlugin()
  ]
};
