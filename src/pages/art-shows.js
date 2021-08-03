import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { Page } from '../components/page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import styledd from 'styled-components';

const CardStyle = styledd.div`
border: none
`

const ArtShow = ({ frontmatter }) => {
  const { title, excerpt } = frontmatter;
  const to = title
    .replace(/\s/g, '-')
    .replace(/&/g, 'and')
    .toLowerCase();

  return (
    <div className="col">
      <CardStyle className="card text-center">
        <Link to={to}>
          <div className="card-img-top">
            <FontAwesomeIcon icon={faCalendarAlt} size="4x" />
          </div>
          <div className="card-body">
            <h3>{title}</h3>
            <p>{excerpt}</p>
          </div>
        </Link>
      </CardStyle>
    </div>
  )
}

const ArtShows = () => {

  const { futureArtShows, pastArtShows } = useStaticQuery(graphql`
    query {
      futureArtShows: allMarkdownRemark(
        filter: {isEndDateFuture: {eq: true}}
        sort: {fields: frontmatter___end_date, order: ASC}
      ) {
        nodes {
          frontmatter {
            title
            excerpt
          }
        }
      }
      pastArtShows: allMarkdownRemark(
        filter: {isEndDateFuture: {eq: false}}
        sort: {fields: frontmatter___end_date, order: DESC}
        limit: 3
      ) {
        nodes {
          frontmatter {
            title
            excerpt
          }
        }
      }
    }
  `);

  const pastArtShowElements = <div className="row row-cols-md-3 row-cols-1">
    {pastArtShows.nodes.map(({ frontmatter }) => <ArtShow frontmatter={frontmatter} key={frontmatter.title} />)}
  </div>

  return (
    <Page pageTitle="Current Art Shows">
      {!futureArtShows.length && <p>I currently do not have any upcoming art shows.</p>}
      <h2>Previous Art Shows</h2>
      {pastArtShowElements}
    </Page>
  )
}

export default ArtShows;
