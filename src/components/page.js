import React from 'react';
import PropTypes from 'prop-types';
import { cleanGroup } from '../utils';
import { SEO } from './seo';
import { Breacrumb } from './breadcrumb';

export const Page = ({ children, title, seoTitle = title, description, clean }) => {
  title = clean ? cleanGroup(title) : title;

  return (
    <>
      <SEO pageTitle={seoTitle} description={description} />
      <Breacrumb />
      <h1>{title}</h1>
      {children}
    </>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  seoTitle: PropTypes.string,
  clean: PropTypes.bool,
};
