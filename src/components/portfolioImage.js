import { GatsbyImage } from 'gatsby-plugin-image';

export const PortfolioImage = ({ onClick, originalImageSrc, image, alt, ...otherProps }) => {
  return (
    <a href={originalImageSrc} target="_blank" rel="noreferrer" {...otherProps}>
      <GatsbyImage image={image} alt={alt} />
    </a>
  );
};
