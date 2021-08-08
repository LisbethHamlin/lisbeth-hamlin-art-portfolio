import React, { useCallback } from 'react';
import { usePhotoSwipe } from './usePhotoSwipe';
import { useMasonry } from './useMasonry';
import styled from "styled-components"
import { PortfolioImage } from './portfolioImage';
import { cleanGroup } from '../utils';

const StyledGrid = styled.div`
  @supports (grid-template-rows: masonry) {
    display: grid;
    grid-template-columns: repeat(auto-fit, 200px);
    grid-template-rows: masonry;
    grid-gap: 1rem;
  }
  @supports not (grid-template-rows: masonry) {
    .portfolio-image {
        margin-bottom: 1rem;
    }
  }
`

export const Portfolio = ({ nodes }) => {

  const images = nodes
    .map(({ description, title, file }) => {
      const { src, width, height } = file.childImageSharp.original;
      const captionDescription = description ? `<p>${description}</p>` : '';
      return {
        childImageSharp: file.childImageSharp,
        src,
        w: width,
        h: height,
        alt: `${title}: ${description}`,
        captionHTML: `
          <p>${cleanGroup(title)}</p>
          ${captionDescription}
        `
      }
    })

  const lightbox = usePhotoSwipe({
    dataSource: images
  });

  const [msnry, msnrySupported] = useMasonry();

  const onLoad = useCallback((element) => {
    msnry.addItems(element);
    msnry.layout();
  }, [msnry]);
  
  if (!msnry && !msnrySupported) {
    return <StyledGrid className="grid" />
  }

  const rootClasses = msnrySupported ? null : 'grid';
  const gridItemClasses = msnrySupported ? '' : 'g-col-2';

  const imageComponents = images.map(({ src, alt, childImageSharp }, index) => {
    const onClick = (event, index) => {
      event.preventDefault();
      lightbox.loadAndOpen(index);
    };

    return <a key={src} href={src} onClick={(event) => onClick(event, index)} target="_blank" rel="noreferrer" className={gridItemClasses}>
      <PortfolioImage image={childImageSharp.gatsbyImageData} src={src} alt={alt} onLoad={!msnrySupported && onLoad} />
    </a>
  });

  return (
    <StyledGrid className={rootClasses}>
      {imageComponents}
    </StyledGrid>
  );
}