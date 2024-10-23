import path from 'path';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import common from './webpack.common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: path.resolve(__dirname, './src/scripts/sw.js'),
      swDest: 'sw.bundle.js',
    }),
  ],
});
