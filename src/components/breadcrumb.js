import React from "react"
import { useLocation } from "@reach/router"
import { Link } from "gatsby";

export const Breacrumb = () => {
  const { pathname } = useLocation();
  const splitPath = pathname
    .split('/')
    .filter((item) => item);

  if (splitPath.length <= 1) {
    return null;
  }

  let index = 0;
  const pathElements = [];
  let currentPath = '';

  for (const item of splitPath) {
    const isLastIndex = index === splitPath.length - 1;
    currentPath += '/' + splitPath[index]

    pathElements.push(
      <li class="breadcrumb-item" key={item}>
        {isLastIndex && item}
        {!isLastIndex && <Link to={currentPath}>{item}</Link>}
      </li>
    )
    
    index++;
  }

  return (
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        {pathElements}
      </ol>
    </nav>
  )
}

// 