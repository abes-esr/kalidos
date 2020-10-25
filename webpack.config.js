const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs')

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

module.exports = (env, argv) => {
  console.log(argv.mode);
  return {
    watch: true,
    entry: './src/index.jsx',
    output: { // NEW
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
    },
    plugins: [htmlPlugin],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: 'file-loader',
          options: { name: '/static/[name].[ext]' },
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
        { 
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader" },
        { 
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader"
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss'],
    },
  };
};
