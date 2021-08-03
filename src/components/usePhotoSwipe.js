import { useEffect, useState } from "react";
import PhotoSwipeLightbox from 'photoswipe/dist/photoswipe-lightbox.esm.js';
import PhotoSwipe from 'photoswipe/dist/photoswipe.esm.js';

export const usePhotoSwipe = ({ dataSource }) => {

  const [defaultState] = useState(() => ({ dataSource }));
  const [lightbox, setLightbox] = useState();

  useEffect(() => {
    const instance = new PhotoSwipeLightbox({
      pswpModule: PhotoSwipe,
      dataSource: defaultState.dataSource,
      bgOpacity: 1.0,
    });
    instance.init();

    setLightbox(instance);

    return () => {
      instance.destroy();
    }
  }, [defaultState.dataSource]);

  return lightbox;
}