import React from 'react';
import { useLocation } from '@reach/router';
import { Link } from 'gatsby';
import { cleanGroup } from '../utils';

export const Breacrumb = () => {
  const { pathname } = useLocation();
  const splitPath = pathname.split('/').filter((item) => item);

  if (splitPath.length <= 1) {
    return null;
  }

  let index = 0;
  const pathElements = [];
  let currentPath = '';

  for (const item of splitPath) {
    const isLastIndex = index === splitPath.length - 1;
    currentPath += '/' + splitPath[index];
    const prettyItem = cleanGroup(item);

    pathElements.push(
      <li className="breadcrumb-item" key={item}>
        {isLastIndex && prettyItem}
        {!isLastIndex && <Link to={currentPath}>{prettyItem}</Link>}
      </li>
    );

    index++;
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">{pathElements}</ol>
    </nav>
  );
};
