import React from 'react';
import { graphql } from 'gatsby';
import { Page } from '../../components/page';
import { Gallery } from '../../components/gallery';

const PortfolioGroup = ({ data, pageContext }) => {
  const { group } = pageContext;
  const { images } = data.portfolioYaml;

  const description = `${group} art portfolio`;

  return (
    <Page title={group} description={description} clean>
      <Gallery images={images} />
    </Page>
  );
};

export default PortfolioGroup;

export const pageQuery = graphql`
  fragment PortfolioQuery on PortfolioImage {
    image
    title
    description
    file {
      childImageSharp {
        thumbnail: gatsbyImageData(layout: FULL_WIDTH, breakpoints: [200, 300], quality: 50)
        original {
          src
          width
          height
        }
      }
    }
  }
  query ($group: String!) {
    portfolioYaml(group: { eq: $group }) {
      description
      images {
        ...PortfolioQuery
      }
    }
  }
`;
