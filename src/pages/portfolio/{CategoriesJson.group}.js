import React, { useCallback } from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import { useMasonry } from '../../components/useMasonry';
import { usePhotoSwipe } from '../../components/usePhotoSwipe';
import { Page } from '../../components/page';
import styled from "styled-components"

import 'photoswipe/dist/photoswipe.css'

const StyledGrid = styled.div`
  margin: 0 auto;
  .grid-item {
    margin-bottom: 16px;
  }
`

const PortfolioGroup = ({ data, pageContext }) => {

  const images = data.allPortfolioJson.nodes
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

  useMasonry('.grid', {
    fitWidth: true,
    itemSelector: '.grid-item',
    gutter: 16,
  });

  const onClick = useCallback((event, index) => {
    event.preventDefault();
    lightbox.loadAndOpen(index);
  }, [lightbox]);

  const imageComponents = images.map(({ src, alt, childImageSharp, w, h }, index) => {
    return <a key={src} href={src} onClick={(event) => onClick(event, index)} target="_blank" rel="noreferrer" >
      <GatsbyImage image={childImageSharp.gatsbyImageData} alt={alt} className="grid-item" loading="eager" />
    </a>
  });

  return (
    <Page pageTitle={pageContext.group} >
      <StyledGrid className="grid">
        {imageComponents}
      </StyledGrid>
    </Page>
  );
}

export default PortfolioGroup;

export const pageQuery = graphql`
  query($group: String!) {
    allPortfolioJson(filter: {group: {eq: $group}}) {
      nodes {
        title
        description
        file {
          childImageSharp {
            gatsbyImageData(width: 200, layout: FIXED)
            original {
              src,
              width
              height
            }
          }
        }
      }
    }
  }`
