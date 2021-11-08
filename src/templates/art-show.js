import { Page } from '../components/page';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

const Post = ({ pageContext }) => {
  const richText = renderRichText(pageContext.post);

  return <Page title={pageContext.title}>{richText}</Page>;
};

export default Post;
