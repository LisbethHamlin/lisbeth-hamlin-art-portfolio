import React from 'react';
import PropTypes from 'prop-types';
import { usePhotoSwipe } from './usePhotoSwipe';
import { PortfolioImage } from './portfolioImage';
import { cleanGroup } from '../utils';
import { prevent } from './prevent';
import '@appnest/masonry-layout';

export const gridClass = 'grid';
export const gridItemClass = 'grid-item';

export const Portfolio = ({ nodes }) => {
  const images = nodes.map(({ description, title, file }) => {
    const { src, width, height } = file.childImageSharp.original;
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

  const imageComponents = images.map(({ src, alt, childImageSharp }, index) => {
    const onClick = prevent(() => {
      lightbox.loadAndOpen(index);
    });

    return <PortfolioImage key={src} image={childImageSharp.gatsbyImageData} originalImageSrc={src} alt={alt} onClick={onClick} className="col" />;
  });

  if (typeof window === 'undefined') {
    return <div className="row portfolio-grid">{imageComponents}</div>;
  }

  return <masonry-layout maxcolwidth="250">{imageComponents}</masonry-layout>;
};

Portfolio.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
