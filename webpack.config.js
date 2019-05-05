const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  devtool: false,
  context: path.resolve(__dirname, "js"),
  entry: {
    common: ["./_common.js"],
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
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["@babel/preset-env", {
                corejs: '^3.0.1',
                useBuiltIns: "usage",
                targets: {
                  browsers: [
                    "last 1 version",
                    "> 1%",
                    "IE 11",
                    "not dead"
                  ]
                }
              }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader'
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
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          output: {
            comments: false
          },
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', {
            discardComments: {
              removeAll: true
            }
          }],
        },
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "bundle.css",
      chunkFilename: "bundle.css"
    })
  ],
};
