'use strict';

var shuffle = function(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {}
  return o;
};

var generateDaySeed = function() {
  Math.seedrandom(Math.floor(Date.now() / 8.64e+7));
};

var buildPlugins = function($, masonry, imagesLoaded) {

  $.bridget('masonry', masonry, $);
  imagesLoaded.makeJQueryPlugin( $ );

  // reveals items iteratively
  // after each item has loaded its images
  $.fn.masonryImagesReveal = function( $items, beforeImagesLoadedCallback ) {
    var msnry = this.data('masonry');
    var itemSelector = msnry.options.itemSelector;
    // hide by default
    $items.hide();
    // append to container
    this.append( $items );
    beforeImagesLoadedCallback();
    $items.imagesLoaded()
      .progress( function( imgLoad, image ) {
        // get item
        // image is imagesLoaded class, not <img>, <img> is image.img
        var $item = $( image.img ).parents( itemSelector );
        // un-hide item
        $item.show();
        // masonry does its thing
        msnry.appended( $item );
      });

    return this;
  };
};

var initPhotoSwipeFromDOM = function($, photoswipe, photoswipeUI, gallerySelector) {

    // loop through all gallery elements and bind events
    var $galleryElements = $( gallerySelector );

    // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    var parseThumbnailElements = function($el) {
        var items = [];
        $el.children().each(function(i, e) {
          var $linkEl = $(e).find('a');
          if($linkEl.length) {
            var $thumbnailImgEl = $linkEl.find('img');
            var size = $linkEl.data('size').split('x');

            // create slide object
            items.push({
                src: $linkEl.attr('href'),
                msrc: $thumbnailImgEl.attr('src'),
                pid: $linkEl.data('index'),
                title: $linkEl.data('title') || ' ',
                desc: $linkEl.data('description'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10),
                el: e
            });
          }
        });

        return items;
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e.preventDefault();
        openPhotoSwipe(e.data.$links.index(this), $(e.target).closest(gallerySelector));
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if(pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, $galleryElement, disableAnimation, fromURL) {
        if(!$galleryElement.length) {
          return;
        }

        var pswpElement = $('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements($galleryElement);

        // define options (if needed)
        options = {
            // define gallery index (for URL)
            galleryUID: $galleryElement.data('pswp-uid'),
            galleryPIDs: true,
            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
            addCaptionHTMLFn: function(item, captionEl) {
                if(!item.title) {
                    captionEl.children[0].innerText = '';
                    return false;
                }
                captionEl.children[0].innerHTML = '<p>' + item.title + '</p>';

                if(item.desc) {
                  captionEl.children[0].innerHTML += '<p>' + item.desc + '</p>';
                }

                return true;
            }
        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid === index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new photoswipe( pswpElement, photoswipeUI, items, options);
        gallery.init();
    };

    $galleryElements.each(function(galleryIndex, gallery) {
      var $gallery = $(gallery);
      $gallery.data('pswp-uid', galleryIndex + 1);
      $gallery.on('click', '.grid-item a', {$links: $gallery.find('.grid-item a')}, onThumbnailsClick);
    });

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  $($galleryElements[ hashData.gid - 1 ]), true, true );
    }
};

var configureMasonry = function($, photoswipe, photoswipeUI) {
  var gridSelector = '.grid';
  var $grid = $(gridSelector).masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    gutter: '.gutter-sizer',
    percentPosition: true
  });

  if($grid.length && window.IMAGE_DATA) {
    if(window.RANDOMIZE_SETTINGS) {
      generateDaySeed();
      shuffle(window.IMAGE_DATA);
      window.IMAGE_DATA = window.IMAGE_DATA.slice(-window.RANDOMIZE_SETTINGS.limit);
    }

    $grid.masonryImagesReveal($(window.IMAGE_DATA.join('')), function() {
      initPhotoSwipeFromDOM($, photoswipe, photoswipeUI, gridSelector);
    });
    $('#jsonScript').remove();
  }
};

require([
   'masonryLayout', 'photoswipe',
   'photoswipeUI', 'imagesLoaded',
   'seedrandom', 'photoswipeCss', 'photoswipeUiCss'
 ],
function(masonry, photoswipe, photoswipeUI, imagesLoaded) {
  buildPlugins($, masonry, imagesLoaded);
  configureMasonry($, photoswipe, photoswipeUI);
});
