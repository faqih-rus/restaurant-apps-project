const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const WorkBoxWebpackPlugin = require('workbox-webpack-plugin');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WorkBoxWebpackPlugin.InjectManifest({
      swSrc: path.resolve(__dirname, 'src/scripts/sw.js'),
      swDest: './sw.bundle.js',
    }),

	new BundleAnalyzerPlugin({
		analyzerMode: 'static',
		reportFilename: 'bundle-report.html',
		openAnalyzer: true,
	  }),
  ],
});
