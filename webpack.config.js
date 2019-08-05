const path = require('path');

module.exports = { 
  entry: {
    app:"./app/assets/scripts/app.js"
  
  },
  output: {
    path: path.resolve(__dirname, "./app/temp/scripts"),  
    filename: "[name].js" 
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  mode: 'development'
} 