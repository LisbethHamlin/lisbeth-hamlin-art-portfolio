import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { Page } from '../components/page';
import { FontAwesomeIcon, faFolderOpen }from '../components/icons';

const Portfolio = () => {
  const { allCategoriesJson } = useStaticQuery(graphql`
    query {
      allCategoriesJson {
        nodes {
          title
          group
        }
      }
    }
  `);

  const nodes = allCategoriesJson.nodes;
  const groupElements = nodes.map(({ title, group}) => {
    return (
      <div className="col-6 col-md-4 col-lg-3 mb-3" key={group}>
        <Link to={group} className="d-block">
          <FontAwesomeIcon icon={faFolderOpen} size="5x" />
          <div> { title } </div>
        </Link>
      </div>
    );
  });
  
  return (
    <Page pageTitle="Portfolio">
      <div className="row">
        { groupElements }
      </div>
    </Page>
  )
}

export default Portfolio;