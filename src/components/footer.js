import React from 'react';
import styled from 'styled-components';
import { useSiteMetadata } from './useSiteMetadata';

const StyledFooter = styled.footer`
  margin-top: 4.5rem;
  font-size: 0.75rem;
  padding-bottom: 2rem;
`

export const Footer = () => {

  const { buildTime, title } = useSiteMetadata();

  return (
    <StyledFooter>
      <p>
        &#169; { buildTime } { title }. 
        This work is licensed under a <a rel="license noreferrer" href="http://creativecommons.org/licenses/by-nc/4.0/">
        Creative Commons Attribution-NonCommercial 4.0 International License. </a>
      </p>
    </StyledFooter>
  )
}