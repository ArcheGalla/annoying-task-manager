import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import {CheckerPlugin} from 'awesome-typescript-loader';
import {Configuration} from 'webpack';

import {resolve, join} from 'path';

import * as RemoveWebpackPlugin  from 'remove-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

declare const __dirname: string;

const config: Configuration = {
    context: resolve(__dirname, 'src'),
    devtool: false,
    entry: {
        vendor: './vendor.tsx',
        popup: './popup/popup.tsx',
        main: './new-tab-page/main.tsx',
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            },
            {
                test: /\.(woff2|woff|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        query: {name: '[name]_[hash].[ext]'}
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {loader: "style-loader"}, // creates style nodes from JS strings
                    {loader: "css-loader"},   // translates CSS into CommonJS
                    {loader: "less-loader"}   // compiles Less to CSS
                ]
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
        new CheckerPlugin(),
        new RemoveWebpackPlugin(['dist'], {
            verbose: true,
            dry: false
        }),
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            template: join(__dirname, 'src', 'popup', 'popup.html'),
            chunks: ['vendor', 'popup']
        }),
        new HtmlWebpackPlugin({
            filename: 'main.html',
            template: join(__dirname, 'src', 'new-tab-page', 'main.html'),
            chunks: ['vendor', 'main']
        }),
        new CopyWebpackPlugin([
            {from: './assets', to: 'assets'},
            {from: './manifest.json', to: 'manifest.json'}
        ]),
    ]
};


export default config;
