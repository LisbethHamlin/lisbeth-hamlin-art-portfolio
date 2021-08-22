import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage } from 'gatsby-plugin-image';

export const PortfolioImage = ({ onClick, originalImageSrc, image, alt, ...otherProps }) => {
  return (
    <a href={originalImageSrc} onClick={onClick} target="_blank" rel="noreferrer" {...otherProps}>
      <GatsbyImage image={image} alt={alt} />
    </a>
  );
};

PortfolioImage.propTypes = {
  originalImageSrc: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
