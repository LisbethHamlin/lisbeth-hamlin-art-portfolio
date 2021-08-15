import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

export { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
export { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
