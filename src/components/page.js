import React from "react";
import { cleanGroup } from "../utils";
import { SEO } from "./seo";

export const Page = (props) => {
  const children = props.children;
  const pageTitle = cleanGroup(props.pageTitle);

  return (
    <>
      <SEO pageTitle={pageTitle} />
      <h1>{ pageTitle }</h1>
      { children }
    </>
  )
}