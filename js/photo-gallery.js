import photoswipe from 'photoswipe';
import photoswipeUI from 'photoswipe/dist/photoswipe-ui-default';

import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

const initPhotoSwipeFromDOM = ($gallery, gallerySelector) => {
  // parse slide data (url, title, size ...) from DOM elements
  // (children of gallerySelector)
  const parseThumbnailElements = ($el) => {
    const items = [];
    for (const child of $el.children) {
      const $linkEl = child.querySelector('a');
      if ($linkEl) {
        const $thumbnailImgEl = $linkEl.querySelector('img');
        const { dataset } = $linkEl;

        // create slide object
        items.push({
          src: $linkEl.getAttribute('href'),
          msrc: $thumbnailImgEl.getAttribute('src'),
          pid: dataset.index,
          title: dataset.title || ' ',
          desc: dataset.description,
          w: parseInt(dataset.width),
          h: parseInt(dataset.height),
          el: child
        });
      }
    }

    return items;
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

  const openPhotoSwipe = (index, disableAnimation) => {
    const pswpElement = document.querySelector('.pswp');
    let gallery,
      options;

    const items = parseThumbnailElements($gallery);

    // define options (if needed)
    options = {
      // define gallery index (for URL)
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

    options.index = items.findIndex((item) => item.pid === index);

    // exit if index not found
    if (options.index === -1) {
      return;
    }

    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }

    // Pass data to PhotoSwipe and initialize it
    gallery = new photoswipe(pswpElement, photoswipeUI, items, options);
    gallery.init();
  };

  $gallery.addEventListener('click', (event) => {
    event.preventDefault();

    if (event.target.tagName === 'IMG' && event.target.parentElement) {
      openPhotoSwipe(event.target.parentElement.dataset.index);
    }
  });

  // Parse URL and open gallery if it contains #&pid=3&gid=1
  const hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, true);
  }
};

const gridSelector = '.grid';

const galleryElements = document.querySelector(gridSelector);

initPhotoSwipeFromDOM(galleryElements, gridSelector);
