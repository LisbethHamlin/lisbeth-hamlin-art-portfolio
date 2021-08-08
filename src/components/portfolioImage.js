import React, { useEffect, useRef } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import imagesLoaded from 'imagesloaded';

const loadImage = async (element) => {
  return new Promise((resolve) => {
    imagesLoaded(element, resolve);
  });
};

export const PortfolioImage = React.memo(({ image, alt, onLoad }) => {
  const ref = useRef();

  useEffect(() => {
    if (onLoad) {
      loadImage(ref.current).then(() => {
        onLoad(ref.current);
      });
    }
  }, [onLoad]);

  return <div ref={ref} className="portfolio-image">
    <GatsbyImage image={image} alt={alt}  loading="eager" decoding="sync" />
  </div>
});