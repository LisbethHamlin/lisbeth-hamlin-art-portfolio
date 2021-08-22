import React from 'react';
import { graphql } from 'gatsby';
import { Page } from '../../components/page';
import { Portfolio } from '../../components/portfolio';

const PortfolioGroup = ({ data, pageContext }) => {
  const { group } = pageContext;
  const { nodes } = data.allPortfolioJson;

  return (
    <Page title={group} clean>
      <Portfolio nodes={nodes} />
    </Page>
  );
};

export default PortfolioGroup;

export const pageQuery = graphql`
  fragment PortfolioQuery on PortfolioJson {
    title
    description
    file {
      childImageSharp {
        thumbnail: gatsbyImageData(layout: FULL_WIDTH, breakpoints: [200, 300], formats: [AUTO, AVIF, WEBP], quality: 50)
        original {
          src
          width
          height
        }
      }
    }
  }
  query ($group: String!) {
    allPortfolioJson(filter: { group: { eq: $group } }) {
      nodes {
        ...PortfolioQuery
      }
    }
  }
`;
