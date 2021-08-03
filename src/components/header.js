import React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { Navigation } from './navigation';
import { useSiteMetadata } from './useSiteMetadata';
import styled from 'styled-components';

const TitleStyle = styled.span`
  margin-left: 0.25rem;
`

export const Header = () => {
  const { title } = useSiteMetadata();

  return (
    <nav className="navbar navbar-expand-lg justify-content-between navbar-light">
      <Link to="/" className="navbar-brand">
        <StaticImage src="../images/header.jpg" className="align-middle" alt="Header Icon" loading="eager" placeholder="none" />
        <TitleStyle>
          { title }
        </TitleStyle>
      </Link>
      <Navigation />
    </nav>
  )
}