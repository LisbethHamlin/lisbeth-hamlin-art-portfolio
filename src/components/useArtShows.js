import { graphql, useStaticQuery } from 'gatsby';

export const useArtShows = () => {
  return useStaticQuery(graphql`
    query {
      artShows: allContentfulArtShows(filter: { ignore: { eq: false } }, sort: { endDate: ASC }) {
        nodes {
          displayField
          endDate
          excerpt
        }
      }
    }
  `);
};
