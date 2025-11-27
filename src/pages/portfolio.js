import { graphql, Link, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Page } from '../components/page';

const Portfolio = () => {
  const { allPortfolioYaml } = useStaticQuery(graphql`
    query {
      allPortfolioYaml {
        nodes {
          title
          group
          id
          firstImage {
            file {
              childImageSharp {
                gatsbyImageData(width: 300, height: 300, quality: 50, transformOptions: { fit: COVER, cropFocus: CENTER })
              }
            }
          }
        }
      }
    }
  `);

  const nodes = allPortfolioYaml.nodes;
  const groupElements = nodes.map(({ title, group, id, firstImage }) => {
    const image = firstImage?.file?.childImageSharp?.gatsbyImageData;
    return (
      <div className="col-6 col-md-4 col-lg-3 mb-3" key={id}>
        <Link to={group} className="d-block">
          <figure className="mb-0">
            {image && <GatsbyImage image={image} alt={title} />}
            <figcaption className="text-center fs-5 mt-2">{title}</figcaption>
          </figure>
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
