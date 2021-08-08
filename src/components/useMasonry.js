import { useEffect, useState } from "react";
import { supportsCSSMasonryLayout } from "../utils";
import Masonry from "masonry-layout";

export const useMasonry = () => {
  const [msnry, setMsnry] = useState(null);

  useEffect(() => {
    if (supportsCSSMasonryLayout) {
      return;
    }

    console.log('Native masonry grid not supported. Falling back to masonry-layout');

    const instance = new Masonry('.grid', {
      initLayout: false,
      percentPosition: true,
      gutter: 16,
      itemSelector: '.grid .portfolio-image',
      transitionDuration: 0
    });

    setMsnry(instance);

    return () => {
      instance.destroy();
    }

  }, []);

  return [msnry, supportsCSSMasonryLayout];
}