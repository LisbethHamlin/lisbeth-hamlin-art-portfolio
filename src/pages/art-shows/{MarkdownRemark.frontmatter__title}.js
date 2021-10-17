import { graphql } from 'gatsby';
import { Page } from '../../components/page';

const Post = ({ data }) => {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <Page title={frontmatter.title}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Page>
  );
};

export default Post;

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
