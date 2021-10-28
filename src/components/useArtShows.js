import { graphql, useStaticQuery } from 'gatsby';

export const useArtShows = () => {
  return useStaticQuery(graphql`
    query {
      artShows: allContentfulArtShows {
        nodes {
          displayField
          endDate
          excerpt
          id
        }
      }
    }
  `);
};
