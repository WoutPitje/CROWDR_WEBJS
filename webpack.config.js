const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
	
	entry: {
  main: path.resolve(__dirname, './app.js'),
},
output: {
  filename: 'main.bundle.js',
  path: path.resolve(__dirname, 'dist')
},

  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack Output",
    }),
  ],
};