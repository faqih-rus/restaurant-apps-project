import path from 'path';
import { merge } from 'webpack-merge';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import common from './webpack.common.js';

export default merge(common, {
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
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: path.resolve(path.dirname(new URL(import.meta.url).pathname), 'src/scripts/sw.js'),
      swDest: './sw.bundle.js',
    }),
  ],
});