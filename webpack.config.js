var webpack = require("webpack");
var path = require("path");

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
      jquery: "jquery/dist/jquery.min.js",
      seedrandom: "seedrandom/seedrandom.js",
      masonryLayout: "masonry-layout/dist/masonry.pkgd.js",
      photoswipe: __dirname + "/node_modules/photoswipe/dist/photoswipe.js",
      photoswipeUI: __dirname + "/node_modules/photoswipe/dist/photoswipe-ui-default.js",
      imagesLoaded: __dirname + "/node_modules/imagesloaded/imagesloaded.pkgd.js"
    }
  },
  module: {
    noParse: [
      /[\/\\]node_modules[\/\\]seedrandom[\/\\].*\.js$/
    ]
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
  ]
};
