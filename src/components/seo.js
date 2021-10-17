import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from './useSiteMetadata';
import { useLocation } from '@reach/router';

export const SEO = ({ pageTitle, description = 'My art is dedicated to fostering an appreciation of cultural diversity.' }) => {
  const { title: siteTitle } = useSiteMetadata();
  const { href } = useLocation();

  const combinedTitle = `${pageTitle} | ${siteTitle}`;

  return (
    <Helmet>
      <title>{combinedTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:url" content={href} />
      <meta property="og:title" content={pageTitle} />
      <meta name="og:description" content={description} />
    </Helmet>
  );
};

SEO.propTypes = {
  pageTitle: PropTypes.string,
  description: PropTypes.string,
};
