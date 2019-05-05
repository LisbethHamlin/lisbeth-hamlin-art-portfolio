import $ from 'jquery'
import masonry from 'masonryLayout'
import photoswipe from 'photoswipe'
import photoswipeUI from 'photoswipeUI'
import imagesLoaded from 'imagesLoaded'
import seedrandom from 'seedrandom'

import 'photoswipeCss'
import 'photoswipeUiCss'

$.bridget('masonry', masonry, $);
imagesLoaded.makeJQueryPlugin($);

const shuffle = (a) => {
  const rng = new seedrandom(Math.floor(Date.now() / 8.64e+7));
  
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const initPhotoSwipeFromDOM = ($galleryElements, gallerySelector) => {
  // parse slide data (url, title, size ...) from DOM elements
  // (children of gallerySelector)
  const parseThumbnailElements = ($el) => {
    const items = [];
    $el.children().each((i, e) => {
      const $linkEl = $(e).find('a');
      if ($linkEl.length) {
        const $thumbnailImgEl = $linkEl.find('img');
        const size = $linkEl.data('size').split('x');

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
  const onThumbnailsClick = function (e) {
    e.preventDefault();
    openPhotoSwipe(e.data.$links.index(this), $(e.target).closest(gallerySelector));
  };

  // parse picture index and gallery index from URL (#&pid=1&gid=2)
  const photoswipeParseHash = () => {
    const hash = window.location.hash.substring(1),
      params = {};

    if (hash.length < 5) {
      return params;
    }

    const consts = hash.split('&');
    for (let i = 0; i < consts.length; i++) {
      if (!consts[i]) {
        continue;
      }
      const pair = consts[i].split('=');
      if (pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }

    if (params.gid) {
      params.gid = parseInt(params.gid, 10);
    }

    return params;
  };

  const openPhotoSwipe = (index, $galleryElement, disableAnimation, fromURL) => {
    if (!$galleryElement.length) {
      return;
    }

    const pswpElement = $('.pswp')[0];
    let gallery,
      options;

    const items = parseThumbnailElements($galleryElement);

    // define options (if needed)
    options = {
      // define gallery index (for URL)
      galleryUID: $galleryElement.data('pswp-uid'),
      galleryPIDs: true,
      getThumbBoundsFn: (index) => {
        // See Options -> getThumbBoundsFn section of documentation for more info
        const thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
          pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();

        return {
          x: rect.left,
          y: rect.top + pageYScroll,
          w: rect.width
        };
      },
      addCaptionHTMLFn: (item, captionEl) => {
        if (!item.title) {
          captionEl.children[0].innerText = '';
          return false;
        }
        captionEl.children[0].innerHTML = '<p>' + item.title + '</p>';

        if (item.desc) {
          captionEl.children[0].innerHTML += '<p>' + item.desc + '</p>';
        }

        return true;
      }
    };

    // PhotoSwipe opened from URL
    if (fromURL) {
      if (options.galleryPIDs) {
        // parse real index when custom PIDs are used
        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
        for (let j = 0; j < items.length; j++) {
          if (items[j].pid === index) {
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
    if (isNaN(options.index)) {
      return;
    }

    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }

    // Pass data to PhotoSwipe and initialize it
    gallery = new photoswipe(pswpElement, photoswipeUI, items, options);
    gallery.init();
  };

  $galleryElements.each((galleryIndex, gallery) => {
    const $gallery = $(gallery);
    $gallery.data('pswp-uid', galleryIndex + 1);
    $gallery.on('click', '.grid-item a', {
      $links: $gallery.find('.grid-item a')
    }, onThumbnailsClick);
  });

  // Parse URL and open gallery if it contains #&pid=3&gid=1
  const hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, $($galleryElements[hashData.gid - 1]), true, true);
  }
};

if (window.RANDOMIZE_SETTINGS) {
  window.IMAGE_DATA = shuffle(window.IMAGE_DATA).slice(-window.RANDOMIZE_SETTINGS.limit);
}

const images = $(window.IMAGE_DATA.join('')).hide();

const gridSelector = '.grid';
const $grid = $(gridSelector);

$grid
  .masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    gutter: '.gutter-sizer',
    percentPosition: true
  })
  .append(images);

initPhotoSwipeFromDOM($grid, gridSelector);

const loadImage = ($element) => {
  return new Promise((resolve, reject) => {
    $element
      .imagesLoaded()
      .done(resolve)
      .fail(reject);
  })
}

(async () => {
  for(const child of $grid.children('.grid-item')) {
    const $child = $(child);
    try {
      await loadImage($child);

      $child.show();
      $grid.masonry('appended', $child);
    } catch(e) {
      console.error(e);
    }
  }
})();
