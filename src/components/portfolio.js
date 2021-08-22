import React from 'react';
import PropTypes from 'prop-types';
import { usePhotoSwipe } from './usePhotoSwipe';
import { PortfolioImage } from './portfolioImage';
import { cleanGroup } from '../utils';
import { prevent } from './prevent';

export const Portfolio = ({ nodes }) => {
  const images = nodes.map(({ description, title, file }) => {
    const { childImageSharp } = file;
    const { src, width, height } = childImageSharp.original;
    let captionDescription = '';
    let alt = title;

    if (description) {
      captionDescription = `<p>${description}</p>`;
      alt += ': ' + description;
    }

    return {
      childImageSharp: file.childImageSharp,
      src,
      w: width,
      h: height,
      alt,
      captionHTML: `
          <p>${cleanGroup(title)}</p>
          ${captionDescription}
        `,
    };
  });

  const lightbox = usePhotoSwipe({
    dataSource: images,
  });

  const imageComponents = images.map(({ childImageSharp: { thumbnail }, src, alt }, index) => {
    const onClick = prevent(() => {
      lightbox.loadAndOpen(index);
    });
    return <PortfolioImage image={thumbnail} originalImageSrc={src} alt={alt} key={src} onClick={onClick} className="grid-item" />;
  });

  return <div className="photo-gallery">{imageComponents}</div>;
};

Portfolio.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
