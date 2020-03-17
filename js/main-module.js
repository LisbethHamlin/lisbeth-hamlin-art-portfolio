import dynamicImportPolyfill from 'dynamic-import-polyfill';
import { main } from './app';

// This needs to be done before any dynamic imports are used.
dynamicImportPolyfill.initialize({
  modulePath: './js/es/',
});

main();
