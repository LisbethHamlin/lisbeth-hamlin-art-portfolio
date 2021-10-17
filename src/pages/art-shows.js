import PropTypes from 'prop-types';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { Page } from '../components/page';
import { FontAwesomeIcon, faCalendarAlt } from '../components/icons';
import { urlFromTitle } from '../utils';

const ArtShow = ({ frontmatter }) => {
  const { title, excerpt } = frontmatter;
  const to = urlFromTitle(title);

  return (
    <div className="col">
      <div className="card text-center">
        <Link to={to}>
          <div className="card-img-top">
            <FontAwesomeIcon icon={faCalendarAlt} size="4x" />
          </div>
          <div className="card-body">
            <h3>{title}</h3>
            <p>{excerpt}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

ArtShow.propTypes = {
  frontmatter: PropTypes.object.isRequired,
};

const ArtShowRow = ({ shows, type }) => {
  if (shows.length) {
    const ArtShowElements = shows.map(({ frontmatter }) => <ArtShow frontmatter={frontmatter} key={frontmatter.title} />);
    return <div className="row row-cols-md-3 row-cols-1">{ArtShowElements}</div>;
  }

  if (type) {
    return <p>I currently do not have any {type}.</p>;
  }
  return null;
};

ArtShowRow.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string,
};

const ArtShows = () => {
  const { futureArtShows, pastArtShows } = useStaticQuery(graphql`
    fragment ArtShowFrontMatter on MarkdownRemark {
      frontmatter {
        title
        excerpt
      }
    }
    query {
      futureArtShows: allMarkdownRemark(filter: { isEndDateFuture: { eq: true } }, sort: { fields: frontmatter___end_date, order: ASC }) {
        nodes {
          ...ArtShowFrontMatter
        }
      }
      pastArtShows: allMarkdownRemark(filter: { isEndDateFuture: { eq: false } }, sort: { fields: frontmatter___end_date, order: DESC }, limit: 3) {
        nodes {
          ...ArtShowFrontMatter
        }
      }
    }
  `);

  return (
    <Page title="Current Art Shows">
      <ArtShowRow shows={futureArtShows.nodes} type="upcoming art shows" />
      <h2>Previous Art Shows</h2>
      <ArtShowRow shows={pastArtShows.nodes} />
    </Page>
  );
};

export default ArtShows;
