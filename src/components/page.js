import React from "react";
import { cleanGroup } from "../utils";

export const Page = (props) => {
  const children = props.children;
  const pageTitle = cleanGroup(props.pageTitle);

  return (
    <>
      <h1>{ pageTitle }</h1>
      { children }
    </>
  )
}