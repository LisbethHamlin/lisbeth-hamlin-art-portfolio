// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeClassNames from 'rehype-class-names';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://lisbethhamlin.com',
  markdown: {
   rehypePlugins: [
     [rehypeClassNames, {
       table: 'table'
     }],
   ],
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