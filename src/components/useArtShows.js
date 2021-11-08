import { graphql, useStaticQuery } from 'gatsby';

export const useArtShows = () => {
  return useStaticQuery(graphql`
    query {
      artShows: allContentfulArtShows(filter: { ignore: { eq: false } }, sort: { order: ASC, fields: endDate }) {
        nodes {
          displayField
          endDate
          excerpt
        }
      }
    }
  `);
};
