import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

export const Navigation = () => {
  const { allNavigationYaml } = useStaticQuery(graphql`
    query {
      allNavigationYaml {
        nodes {
          url
          title
          excerpt
        }
      }
    }
  `);

  const navLinks = allNavigationYaml.nodes.map((item) => (
    <li className="nav-item" key={item.url}>
      <Link className="nav-link" to={item.url}>
        {item.title}
      </Link>
    </li>
  ));

  return <ul className="navbar-nav">{navLinks}</ul>;
};
