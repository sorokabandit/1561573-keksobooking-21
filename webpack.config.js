const path = require("path");

module.exports = {
  entry: [
    "./js/debounce.js",
    "./js/movepin.js",
    "./js/XMLHttpRequest.js",
    "./js/main.js",
    "./js/data.js",
    "./js/card.js",
    "./js/form.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
