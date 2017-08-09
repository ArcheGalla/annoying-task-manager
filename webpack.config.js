const webpack = require('webpack');
const path = require('path');


module.exports = {
    context: __dirname,

    entry: "./src/index",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/assets/"
    }
};