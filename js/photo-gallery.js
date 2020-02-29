import $ from 'jquery/dist/jquery.slim';
import photoswipe from 'photoswipe';
import photoswipeUI from 'photoswipe/dist/photoswipe-ui-default';

import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

const initPhotoSwipeFromDOM = ($galleryElements, gallerySelector) => {
  // parse slide data (url, title, size ...) from DOM elements
  // (children of gallerySelector)
  const parseThumbnailElements = ($el) => {
    const items = [];
    $el.children().each((i, e) => {
      const $linkEl = $(e).find('a');
      if ($linkEl.length) {
        const $thumbnailImgEl = $linkEl.find('img');

        // create slide object
        items.push({
          src: $linkEl.attr('href'),
          msrc: $thumbnailImgEl.attr('src'),
          pid: $linkEl.data('index'),
          title: $linkEl.data('title') || ' ',
          desc: $linkEl.data('description'),
          w: parseInt($linkEl.data('width')),
          h: parseInt($linkEl.data('height')),
          el: e
        });
      }
    });

    return items;
  };

  // triggers when user clicks on thumbnail
  const onThumbnailsClick = function(e) {
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
    $gallery.on('click', '.gallery-card a', {
      $links: $gallery.find('.gallery-card a')
    }, onThumbnailsClick);
  });

  // Parse URL and open gallery if it contains #&pid=3&gid=1
  const hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, $($galleryElements[hashData.gid - 1]), true, true);
  }
};

const gridSelector = '.grid';

const galleryElements = $(gridSelector);

initPhotoSwipeFromDOM(galleryElements, gridSelector);
