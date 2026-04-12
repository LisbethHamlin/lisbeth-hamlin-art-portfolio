// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeClassNames from 'rehype-class-names';

// https://astro.build/config
export default defineConfig({
  site: 'https://brycemehring.com',
   markdown: {
    rehypePlugins: [
      [rehypeClassNames, {
        table: 'table'
      }],
    ],
  },
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
