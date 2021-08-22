import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Header } from './header';
import { Footer } from './footer';
import favicon from '../images/favicon.png';

import '../styles/styles.scss';

export const Layout = ({ children }) => {
  return (
    <div className="container lisbeth-hamlin">
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Indie+Flower" />
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
