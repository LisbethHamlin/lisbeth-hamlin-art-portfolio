import { useSiteMetadata } from './useSiteMetadata';
import { FontAwesomeIcon, faRssSquare } from './icons';

export const Footer = () => {
  const { buildTime, title } = useSiteMetadata();

  return (
    <footer className="border-top pt-5 pb-2 fs-6">
      <p>
        &#169; {buildTime} {title}. This work is licensed under a{' '}
        <a rel="license noreferrer" href="http://creativecommons.org/licenses/by-nc/4.0/">
          Creative Commons Attribution-NonCommercial 4.0 International License.{' '}
        </a>
      </p>
      <p className="links">
        <a href="/rss.xml" target="_blank" className="rss">
          <FontAwesomeIcon icon={faRssSquare} size="3x" title="RSS Feed" />
        </a>
      </p>
    </footer>
  );
};
