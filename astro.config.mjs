// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://brycemehring.com',
  redirects: {
    '/projects': '/',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: [
            'mixed-decls',
            'color-functions',
            'if-function',
            'global-builtin',
            'import',
          ],
        },
      },
    },
  },

  integrations: [sitemap()],
});
