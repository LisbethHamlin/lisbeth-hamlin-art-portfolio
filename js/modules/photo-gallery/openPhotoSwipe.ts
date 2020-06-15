import photoswipe from 'photoswipe';
import photoswipeUI from 'photoswipe/dist/photoswipe-ui-default';
import 'photoswipe/dist/default-skin/default-skin.css';

// parse slide data (url, title, size ...) from DOM elements
// (children of gallerySelector)
const parseThumbnailElements = ($el: HTMLElement) => {
  const items = [];
  for (const child of $el.children) {
    const $linkEl = child.querySelector('a');
    if ($linkEl) {
      const $thumbnailImgEl = $linkEl.querySelector('img');
      const { dataset } = $linkEl;

      // create slide object
      items.push({
        src: $linkEl.getAttribute('href')!,
        msrc: $thumbnailImgEl!.getAttribute('src')!,
        pid: dataset.index!,
        title: dataset.title || ' ',
        desc: dataset.description!,
        w: parseInt(dataset.width!, 10),
        h: parseInt(dataset.height!, 10),
        el: child
      });
    }
  }

  return items;
};

export const openPhotoSwipe = ($gallery: HTMLElement, index: string, disableAnimation: boolean = false) => {
  try {
    const pswpElement = document.querySelector<HTMLElement>('.pswp');

    if (!pswpElement) {
      throw new Error('Cannot find pswp element');
    }

    const items = parseThumbnailElements($gallery);

    const options: any = {
      galleryPIDs: true,
      index: items.findIndex((item) => item.pid === index),
      getThumbBoundsFn: (index: number) => {
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
      addCaptionHTMLFn: (item: any, captionEl: any) => {
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

    // exit if index not found
    if (options.index === -1) {
      return;
    }

    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }

    // Pass data to PhotoSwipe and initialize it
    const gallery = new photoswipe(pswpElement, photoswipeUI, items, options);
    gallery.init();
  } catch (e) {
    console.error(e);
  }

};
