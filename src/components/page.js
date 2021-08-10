import React from "react";
import PropTypes from 'prop-types';
import { cleanGroup } from "../utils";
import { SEO } from "./seo";
import { Breacrumb } from "./breadcrumb";

export const Page = (props) => {
  const children = props.children;
  const title = cleanGroup(props.title);

  return (
    <>
      <SEO pageTitle={title} />
      <Breacrumb />
      <h1>{ title }</h1>
      { children }
    </>
  )
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

