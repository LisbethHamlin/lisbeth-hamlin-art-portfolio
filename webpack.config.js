var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, "js"),
  entry: {
    vendor: ["jquery", "./_common.js"],
    photoGallery: ["./_photo-gallery.js"],
    artShows: ["./_art-shows.js"],
  },
  output: {
    path: path.resolve('./js/'),
    publicPath: '/js/',
    filename: "[name].js"
  },
  resolve: {
    alias: {
      jquery: __dirname + "/node_modules/jquery/dist/jquery.min.js",
      seedrandom: __dirname + "/node_modules/seedrandom/seedrandom.js",
      masonryLayout:  __dirname + "/node_modules/masonry-layout/dist/masonry.pkgd.js",
      photoswipe: __dirname + "/node_modules/photoswipe/dist/photoswipe.js",
      photoswipeUI: __dirname + "/node_modules/photoswipe/dist/photoswipe-ui-default.js",
      photoswipeCss: __dirname + "/node_modules/photoswipe/dist/photoswipe.css",
      photoswipeUiCss: __dirname + "/node_modules/photoswipe/dist/default-skin/default-skin.css",
      imagesLoaded: __dirname + "/node_modules/imagesloaded/imagesloaded.pkgd.js"
    }
  },
  module: {
     loaders: [
       { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
       { test: /\.(png|svg|gif)$/, loader: 'url-loader?limit=8192' }
     ],
     noParse: [/[\/\\]node_modules[\/\\]seedrandom[\/\\].*\.js$/]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({output: {comments: false}}),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.js",
    }),
    new ExtractTextPlugin("../css/[name].css")
  ]
};
