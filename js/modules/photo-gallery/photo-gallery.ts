import 'photoswipe/dist/photoswipe.css';
import imagesLoaded from 'imagesloaded';
import Masonry from 'masonry-layout';

const initPhotoSwipeFromDOM = async ($gallery: HTMLElement) => {
  // parse picture index and gallery index from URL (#&pid=1&gid=2)
  const photoswipeParseHash = () => {
    const hash = window.location.hash.substring(1);
    const params: Record<string, any> = {};

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

  $gallery.addEventListener('click', async (event) => {
    event.preventDefault();

    const target = event.target as HTMLElement;

    if (target.tagName === 'IMG' && target.parentElement) {
      const { openPhotoSwipe } = await import('./openPhotoSwipe');
      openPhotoSwipe($gallery, target.parentElement.dataset.index!);
    }

  });

  // Parse URL and open gallery if it contains #&pid=3&gid=1
  const hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    const { openPhotoSwipe } = await import('./openPhotoSwipe');
    openPhotoSwipe($gallery, hashData.pid, true);
  }
};

const init = async (gallery: HTMLElement) => {
  initPhotoSwipeFromDOM(gallery);

  const loadImage = ($element: HTMLElement) => {
    return new Promise((resolve) => {
      imagesLoaded($element, resolve);
    });
  };

  const masonryGrid: any = new Masonry(gallery, {
    fitWidth: true,
    itemSelector: '.grid-item',
    gutter: 16,
  });

  for (const gridItem of gallery.querySelectorAll<HTMLElement>('.grid-item')) {
    await loadImage(gridItem);

    gridItem.classList.remove('d-none');

    masonryGrid.layout();
  }
}

const gallery = document.querySelector<HTMLElement>('.grid');

if (gallery) {
  init(gallery);
}
