const path = require('path');

module.exports = {
    entry: "./client/index.jsx",
    mode: "production",
    output: {
      path: __dirname,
      filename: "./dist/bundle.js"
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    devtool : 'source-map'
  };