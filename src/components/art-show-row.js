import { ArtShow } from './art-show';
import PropTypes from 'prop-types';

export const ArtShowRow = ({ shows, type }) => {
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
