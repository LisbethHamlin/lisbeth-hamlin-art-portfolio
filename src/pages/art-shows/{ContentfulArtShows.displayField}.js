import { graphql } from 'gatsby';
import { Page } from '../../components/page';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

const Post = ({ data }) => {
  const { title, post } = data.contentfulArtShows;

  const richText = renderRichText(post);

  return <Page title={title}>{richText}</Page>;
};

export default Post;

export const pageQuery = graphql`
  query ($id: String!) {
    contentfulArtShows(id: { eq: $id }) {
      title: displayField
      post {
        raw
      }
    }
  }
`;
