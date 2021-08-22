import React from 'react';
import PropTypes from 'prop-types';
import { cleanGroup } from '../utils';
import { SEO } from './seo';
import { Breacrumb } from './breadcrumb';

export const Page = ({ children, title, description, clean }) => {
  title = clean ? cleanGroup(title) : title;
  description = clean ? cleanGroup(description) : description;

  return (
    <>
      <SEO pageTitle={title} description={description} />
      <Breacrumb />
      <h1>{title}</h1>
      {children}
    </>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  clean: PropTypes.bool,
};
