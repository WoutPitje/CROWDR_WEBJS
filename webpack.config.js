const path = require('path');
var webpack = require("webpack");


module.exports = [{
  
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  mode: 'development',
},
{
  entry: './src/simulation.js',
  output: {
    filename: 'simulation.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  mode: 'development',
}];