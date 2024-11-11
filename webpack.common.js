// webpack.common.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'src/scripts/index.js'),
	},
	
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		publicPath: '/',
	},
	
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpg|jpeg)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name][ext]'
				}
			},
		],
	},
	
	optimization: {
		splitChunks: {
			chunks: 'all',
			minSize: 20000,
			maxSize: 70000,
			minChunks: 1,
			maxAsyncRequests: 30,
			maxInitialRequests: 30,
			automaticNameDelimiter: '~',
			enforceSizeThreshold: 50000,
			cacheGroups: {
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
	},
	
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, 'src/templates/index.html'),
			scriptLoading: 'defer'
		}),
		
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/public/'),
					to: path.resolve(__dirname, 'dist/'),
					globOptions: {
						ignore: ['**/heros/hero-image_4.jpg'],
					},
				},
				{
					from: path.resolve(__dirname, 'src/public/images/'),
					to: path.resolve(__dirname, 'dist/images/'),
				},
			],
		}),
		
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		
		new ImageminWebpackPlugin({
			plugins: [
				ImageminMozjpeg({
					quality: 50,
					progressive: true,
				}),
			],
		}),
		
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			openAnalyzer:false,
			reportFilename: path.resolve(__dirname, 'dist/report.html'),
		}),
	],
};