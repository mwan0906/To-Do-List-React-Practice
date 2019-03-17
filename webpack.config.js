const path = require('path');

module.exports = {
  entry: "./client/index.js",
  mode: "production",
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module : {
    rules : [
      {
        test : /.jsx?$/,
        loader : "babel-loader",
        options : { presets : ["@babel/react"]}

      }
    ]
  },
  devtool : 'source-map'
};