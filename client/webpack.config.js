const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app.js', // Your entry point
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public'), // Output directory
  },
  stats: {
    warnings: false, // Ignore warnings
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Path to your HTML template
    }),
    new CopyWebpackPlugin({
        patterns: [
          { from: 'src/assets', to: '.' },
          { from: 'src/style.css', to: '.' },
        ],
    }),
  ],
};
