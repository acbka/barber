const webpack = require("webpack");
const path = require('path'); //today
const HTMLWebpackPlugin = require('html-webpack-plugin'); //today

module.exports = {
   entry: './src/index.js', // today
   output: {                  //today
      filename: 'main.js',
      path: path.resolve(__dirname, './dist'),
   },
   mode: 'development',
   module: {
   rules: [
            {
               test: /\.scss$/,
               use: [
                  "style-loader", // creates style nodes from JS strings
                  { loader: 'css-loader', options: { importLoaders: 1 } },
                  "sass-loader", // compiles Sass to CSS, using Node Sass by default
                  "postcss-loader"
               ],
            },
            {
               test: /\.css$/,
               loader: 'style-loader!css-loader'
             },
            {
               test: /\.script\.js$/,
               exclude: /(node_modules|bower_components)/, //today
               use: [
                  {
                  loader: 'babel-loader', //was script-loader
                  options: {
                     presets: ['@babel/preset-env'], //today
                     sourceMap: true,
                  },
                  },
               ]
            },
            {
               test: /\.(png|svg|jpe?g|gif|jpg)$/,
               use: [
                  {
                  loader: 'file-loader',
                  options: {
                  name: '[path][name].[ext]',
                  },
                  },
               ]
            },

            {
            test: /\.(png|jpg|gif)$/i,
            use: [
               {
                  loader: 'url-loader',
                  options: {
                  limit: 8000000000,
                  name: '[path][name].[ext]',
                  },
               },
            ],
            },  
            {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                  {
                     loader: 'file-loader',
                     options: {
                     name: '[path][name].[ext]'
                     },
                  },
               ],
             },
             {                         //today
               test: /\.(html)$/,
               use: {
                 loader: 'html-loader',
                 options: {
                   attrs: [':data-src']
                 }
               }
             }, 
         ]
   },

   plugins:[new webpack.ProvidePlugin({
     $: 'jquery',
     jQuery: 'jquery',
   }),
   new HTMLWebpackPlugin(),] //today
};