import { urlFromTitle } from '../utils';
import { FontAwesomeIcon, faCalendarAlt } from '../components/icons';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

export const ArtShow = ({ show }) => {
  const { displayField: title, excerpt } = show;
  const to = urlFromTitle(title);

  return (
    <div className="col">
      <div className="card text-center">
        <Link to={to}>
          <div className="card-img-top">
            <FontAwesomeIcon icon={faCalendarAlt} size="2x" />
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
  show: PropTypes.object.isRequired,
};
