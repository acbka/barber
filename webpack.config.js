const webpack = require("webpack");
module.exports = {
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
               use: [
                  {
                     loader: 'script-loader',
                     options: {
                     sourceMap: true,
                     },
                  },
               ]
               },

               {
               test: /\.(png|jpe?g|gif|jpg)$/,
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
                     },
                  },
               ],
               },  
         ]
    },
    plugins:[new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),]
    
};
