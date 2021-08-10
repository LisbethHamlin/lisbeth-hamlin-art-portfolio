import React from "react";
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";
import { useSiteMetadata } from "./useSiteMetadata";

export const SEO = ({ pageTitle = '', description }) => {
  const { title: siteTitle } = useSiteMetadata();

  const first = pageTitle && `${pageTitle} | `;
  const combinedTitle = `${first}${siteTitle}`;
  return (
    <Helmet>
      <title>{ combinedTitle }</title>
      { description && <meta name="description" content={description} /> }
    </Helmet>
  )
}

SEO.propTypes = {
  pageTitle: PropTypes.string,
  description: PropTypes.string
}