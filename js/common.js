import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';

library.add(faCalendarAlt, faFolderOpen, faFacebookF, faTwitter);

dom.i2svg();
