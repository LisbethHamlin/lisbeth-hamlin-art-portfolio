import { graphql, Link, useStaticQuery } from 'gatsby';
import { Page } from '../components/page';
import { FontAwesomeIcon, faFolderOpen } from '../components/icons';

const Portfolio = () => {
  const { allPortfolioYaml } = useStaticQuery(graphql`
    query {
      allPortfolioYaml {
        nodes {
          title
          group
          id
        }
      }
    }
  `);

  const nodes = allPortfolioYaml.nodes;
  const groupElements = nodes.map(({ title, group, id }) => {
    return (
      <div className="col-6 col-md-4 col-lg-3 mb-3" key={id}>
        <Link to={group} className="d-block">
          <FontAwesomeIcon icon={faFolderOpen} size="5x" />
          <div> {title} </div>
        </Link>
      </div>
    );
  });

  return (
    <Page title="Portfolio" description="My art portfolio">
      <div className="row">{groupElements}</div>
    </Page>
  );
};

export default Portfolio;
