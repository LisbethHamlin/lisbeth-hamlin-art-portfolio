import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Header } from './header';
import { Footer } from './footer';

import '../styles/styles.scss';

export const Layout = ({ children }) => {
  return (
    <>
      <div className="container lisbeth-hamlin">
        <Helmet>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Indie+Flower" />
          <noscript>
            {`
              <style>
                .lisbeth-hamlin .portfolio-grid { 
                  visibility: visible;
                }
              </style>
          `}
          </noscript>
        </Helmet>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
