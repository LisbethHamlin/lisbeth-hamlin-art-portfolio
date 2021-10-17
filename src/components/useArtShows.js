import { graphql, useStaticQuery } from 'gatsby';

export const useArtShows = () => {
  return useStaticQuery(graphql`
    fragment ArtShowFrontMatter on MarkdownRemark {
      frontmatter {
        title
        excerpt
      }
    }
    query {
      futureArtShows: allMarkdownRemark(filter: { isEndDateFuture: { eq: true } }, sort: { fields: frontmatter___end_date, order: ASC }) {
        nodes {
          ...ArtShowFrontMatter
        }
      }
      pastArtShows: allMarkdownRemark(filter: { isEndDateFuture: { eq: false } }, sort: { fields: frontmatter___end_date, order: DESC }, limit: 3) {
        nodes {
          ...ArtShowFrontMatter
        }
      }
    }
  `);
};
