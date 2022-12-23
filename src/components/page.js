import PropTypes from 'prop-types';
import { SEO } from './seo';
import { Breacrumb } from './breadcrumb';

export const Page = ({ children, title, description, showBreadcrumb }) => {
  return (
    <>
      <SEO pageTitle={title} description={description} />
      {showBreadcrumb && <Breacrumb />}
      <h1>{title}</h1>
      {children}
    </>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  showBreadcrumb: PropTypes.bool,
};
