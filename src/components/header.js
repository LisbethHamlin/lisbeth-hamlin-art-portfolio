import React, { useMemo } from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { Navigation } from './navigation';
import { useSiteMetadata } from './useSiteMetadata';

export const Header = () => {
  const { title } = useSiteMetadata();

  const img = useMemo(() => {
    return <StaticImage src="../images/header.jpg" className="align-middle" alt="Header Icon" loading="eager" placeholder="none" />;
  }, []);

  return (
    <nav className="navbar navbar-expand-lg justify-content-between navbar-light">
      <Link to="/" className="navbar-brand">
        {img}
        <span className="ms-1">{title}</span>
      </Link>
      <Navigation />
    </nav>
  );
};
