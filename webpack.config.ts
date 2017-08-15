import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import {CheckerPlugin} from 'awesome-typescript-loader';
import {Configuration} from 'webpack';
import * as webpack from 'webpack';

import {resolve, join} from 'path';

import * as RemoveWebpackPlugin  from 'remove-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';


declare const __dirname: string;

const config: Configuration = {
	context: resolve(__dirname, 'src'),
	entry: {
		popup: './index.ts'
	},
	devtool: 'source-map',
	resolve: {
		modules: ['node_modules'],
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},
	output: {
		path: resolve(__dirname, '.dist'),
		filename: '[name].[hash].js',
		publicPath: '/'
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(woff2|woff|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [{loader: 'url-loader', query: {name: '[name]_[hash].[ext]'}}]
			},
			{
				test: /\.tsx?$/,
				use: 'awesome-typescript-loader'
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader'
			}
		]
	},
	plugins: [
		new RemoveWebpackPlugin(['.dist'], {verbose: true, dry: false}),
		new CopyWebpackPlugin([{from: './assets', to: 'assets'}]),
		new CheckerPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			warnings: false, sourceMap: true,
		}),
		new HtmlWebpackPlugin({filename: 'popup.html', template: join(__dirname, 'src', 'popup', 'popup.html')})
	]
};


export default config;
