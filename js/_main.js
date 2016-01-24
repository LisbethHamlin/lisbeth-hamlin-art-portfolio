// Off Canvas Sliding
$(document).ready(function(){
  // Menu button click
  $('#js-menu-trigger,#js-menu-screen').on('click touchstart', function(e){
    // $('#js-body').toggleClass('no-scroll');
    $('#js-menu, #js-menu-screen').toggleClass('is-visible');
    $('#js-menu-trigger').toggleClass('slide close');
    // $('#masthead, #page-wrapper').toggleClass('slide');
    e.preventDefault();
  });
});

// FitVids
$(document).ready(function(){
	// Target your .container, .wrapper, .post, etc.
	$("#main").fitVids();
});

// Table of Contents title. Change text to localize
$("#markdown-toc").prepend("<li><h6>Overview</h6></li>");

var initPhotoSwipeFromDOM = function(gallerySelector) {

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            divEl,
            linkEl,
            thumbnailImgEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {
            divEl = thumbElements[i]; // <div> element
            // include only element nodes
            if(divEl.nodeType !== 1) {
                continue;
            }

            linkEl = divEl.children[0]; // <a> element
            thumbnailImgEl = linkEl.children[0];

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                msrc: thumbnailImgEl.getAttribute('src'),
                pid: linkEl.getAttribute('data-index'),
                title: linkEl.getAttribute('data-title') || ' ',
                desc: linkEl.getAttribute('data-description'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10),
            };

            item.el = divEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var $eTarget = $(e.target || e.srcElement);
        var $parent = $eTarget.parent();

        if($parent.prop('tagName') !== 'A') {
          return;
        }

        // find root element of slide
        var $clickedListItem = $eTarget.closest('.grid-item');

        if(!$clickedListItem.length) {
            return;
        }

        var $clickedGallery = $clickedListItem.parent();
        var index;

        $.each($clickedGallery.children(), function(i, e) {
          if(e === $clickedListItem[0]) {
            index = i;
            return false;
          }
        });

        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, $clickedGallery[0] );
        }
        return false;
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

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        if(!galleryElement) {
          return;
        }

        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {
            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            galleryPIDs: true,
            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
            addCaptionHTMLFn: function(item, captionEl, isFake) {
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
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

var updateUpcomingShows = function($) {
  var $showRoot = $('#show-root');

  if(!$showRoot.length) {
    return;
  }

  var currentTime = Math.floor(Date.now() / 1000);
  var $shows = $('#current-shows > div');
  var $target = $('#previous-shows');

  for(var i = 0; i < $shows.length; ++i) {
    var $currentShow = $($shows[i]);
    var showTime = +$currentShow.attr('data-time');
    if(currentTime > showTime) {
      $currentShow.detach();
      $target.prepend($currentShow);
    }
  }

  if($('#current-shows > div').length === 0) {
    $('#current-shows').remove();
    $('#no-current-shows-message').removeClass('hidden');
  }
  $showRoot.removeClass('load');
};

var configureMasonry = function($) {
  var $grid = $('.grid').imagesLoaded( function() {
    $grid.masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      gutter: '.gutter-sizer',
      percentPosition: true
    });
  });
};

initPhotoSwipeFromDOM('.my-gallery');
updateUpcomingShows(window.jQuery);
configureMasonry(window.jQuery);
