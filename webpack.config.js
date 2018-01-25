const webpack = require("webpack");
const path = require("path");

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
    filename: "[name].[chunkhash].js"
  },
  resolve: {
    alias: {
      jquery$: "jquery/dist/jquery.min.js",
      seedrandom$: "seedrandom/seedrandom.js",
      masonryLayout$: "masonry-layout/dist/masonry.pkgd.js",
      photoswipe$: "photoswipe/dist/photoswipe.js",
      photoswipeUI$: "photoswipe/dist/photoswipe-ui-default.js",
      photoswipeCss$: "photoswipe/dist/photoswipe.css",
      photoswipeUiCss$: "photoswipe/dist/default-skin/default-skin.css",
      imagesLoaded$: "imagesloaded/imagesloaded.pkgd.js"
    }
  },
  module: {
     rules: [
       {
         test: /\.css$/,
         loader: ['style-loader', {
           loader: 'css-loader',
           options: {
            minimize: { discardComments: { removeAll: true } }
           }
         }]
       },
       {
        test: /\.(png|svg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }
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
      filename: "vendor.[chunkhash].js",
    })
  ]
};
