import 'core-js/stable/promise';
import 'core-js/stable/array/find-index';
import 'systemjs/s.js';

System
  .import('/js/bundle/app.js')
  .catch((e) => console.error(e));