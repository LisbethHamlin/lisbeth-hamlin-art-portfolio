import React from 'react';
import { graphql } from 'gatsby';
import { Page } from '../../components/page';
import { Portfolio } from '../../components/portfolio';

const PortfolioGroup = ({ data, pageContext }) => {
  const { group } = pageContext;
  const { nodes } = data.allPortfolioJson;

  return (
    <Page pageTitle={group}>
      <Portfolio nodes={nodes} />
    </Page>
  )
}

export default PortfolioGroup;

export const pageQuery = graphql`
  fragment PortfolioQuery on PortfolioJson {
    title
    description
    file {
      childImageSharp {
        gatsbyImageData(width: 200)
        original {
          src,
          width
          height
        }
      }
    }
  }
  query($group: String!) {
    allPortfolioJson(filter: {group: {eq: $group}}) {
      nodes {
        ...PortfolioQuery
      }
    }
  }`
