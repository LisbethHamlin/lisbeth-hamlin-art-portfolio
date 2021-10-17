import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Header } from './header';
import { Footer } from './footer';
import favicon from '../images/favicon.png';

import '../styles/styles.scss';

export const Layout = ({ children }) => {
  return (
    <div className="container lisbeth-hamlin">
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="stylesheet" href={'https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap'} />
        <link rel="stylesheet" href={'https://fonts.googleapis.com/css2?family=Andada+Pro&display=swap'} />
        <link rel="icon" type="image/png" href={favicon} />
      </Helmet>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
