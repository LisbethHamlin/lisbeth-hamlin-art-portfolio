import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useMasonry } from './useMasonry';
import { usePhotoSwipe } from './usePhotoSwipe';
import styled from "styled-components"
import { GatsbyImage } from 'gatsby-plugin-image';

import 'photoswipe/dist/photoswipe.css'

const StyledGrid = styled.div`
  margin: 0 auto;
  .grid-item {
    margin-bottom: 16px;
    // display: inline-block;
  }
`

export const Portfolio = ({ nodes }) => {

  const images = nodes
    .map(({ description, title, file }) => {
      const { src, width, height } = file.childImageSharp.original;
      return {
        childImageSharp: file.childImageSharp,
        src,
        w: width,
        h: height,
        alt: `${title}: ${description}`
      }
    })

  const lightbox = usePhotoSwipe({
    dataSource: images
  });

  const [style, setStyle] = useState({ display: 'none'});

  /*useEffect(() => {
    setStyle(null);
  }, [])*/

  const msnry = useMasonry('.grid', {
    fitWidth: true,
    itemSelector: '.grid-item',
    gutter: 16,
  });

  const onClick = useCallback((event, index) => {
    event.preventDefault();
    lightbox.loadAndOpen(index);
  }, [lightbox]);

  const onLoad = useCallback(() => {
    msnry.layout();
  }, [msnry])

  const imageComponents = images.map(({ src, alt, childImageSharp, w, h }, index) => {
    return <a key={src} href={src} onClick={(event) => onClick(event, index)} target="_blank" rel="noreferrer" >
      <GatsbyImage image={childImageSharp.gatsbyImageData} alt={alt} className="grid-item" loading="lazy" onLoad={onLoad} />
    </a>
  });

  return (
    <StyledGrid className="grid">
      {imageComponents}
    </StyledGrid>
  );
}