import React from "react";
import { Helmet } from "react-helmet";
import { Header } from './header';
import { Footer } from './footer';
import { createGlobalStyle } from "styled-components"

import 'bootstrap/scss/bootstrap.scss';

const GlobalStyle = createGlobalStyle`
.lisbeth-hamlin {
  h1, h2, h3 {
    font-family: "Indie Flower",cursive;
  }

  h1 {
    font-weight: bold;
  }
  
  h2 {
    margin: 1.5rem 0;
  }
  
  hr {
    margin: 3rem 0;
  }
  
  a {
    color: black;
    text-decoration: none;
    background-color: transparent
  }
}
`

export const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <div className="container lisbeth-hamlin">
        <Helmet>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Indie+Flower" />
        </Helmet>
        <Header />
        { children }
        <Footer />
      </div>
    </>
  )
}