import PropTypes from 'prop-types';
import { usePhotoSwipe } from './usePhotoSwipe';
import { PortfolioImage } from './portfolioImage';
import { cleanGroup } from '../utils';
import { prevent } from './prevent';
import { renderToStaticMarkup } from 'react-dom/server.browser';

export const Gallery = (props) => {
  const images = props.images.map(({ image, title, description, file }) => {
    const { childImageSharp } = file;
    const { src, width, height } = childImageSharp.original;
    const displayTitle = title || cleanGroup(image);
    let alt = displayTitle;

    if (description) {
      alt += ': ' + description;
    }

    const caption = (
      <>
        <p className="text-capitalize">{displayTitle}</p>
        {description && <p>{description}</p>}
      </>
    );

    return {
      childImageSharp: file.childImageSharp,
      src,
      w: width,
      h: height,
      alt,
      captionHTML: renderToStaticMarkup(caption),
    };
  });

  const lightbox = usePhotoSwipe({
    dataSource: images,
  });

  const onClick = prevent((item) => {
    const index = item.target?.closest('a')?.dataset.index;
    if (index) {
      lightbox.loadAndOpen(Number(index));
    }
  });

  const imageComponents = images.map(({ childImageSharp: { thumbnail }, src, alt }, index) => {
    return <PortfolioImage image={thumbnail} originalImageSrc={src} alt={alt} key={src} data-index={index} className="grid-item" />;
  });

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="photo-gallery" onClick={onClick} role="link" tabIndex={0}>
      {imageComponents}
    </div>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
