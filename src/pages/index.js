import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Page } from '../components/page';
import { Portfolio } from '../components/portfolio';

const PortfolioGroup = () => {
  const { randomPortfolioItems } = useStaticQuery(graphql`
    query {
      randomPortfolioItems(limit: 16) {
        ...PortfolioQuery
      }
    }
  `);

  return (
    <Page title="Artistic Statement">
      <p className="lead">
        Ethnic humanity is my subject matter and a source of my inspiration. My figurative images depict life of indigenous cultures that record primitive life
        with an ethnological perspective. Experiencing different cultures has helped me to realize there is not one way of living, but thousands.
      </p>
      <Portfolio nodes={randomPortfolioItems} />
    </Page>
  );
};

export default PortfolioGroup;
