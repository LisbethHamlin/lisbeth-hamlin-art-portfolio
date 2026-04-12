import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeClassNames from 'rehype-class-names';

// https://astro.build/config
export default defineConfig({
  site: 'https://lisbethhamlin.com',
  markdown: {
    rehypePlugins: [
      [
        rehypeClassNames,
        {
          table: 'table',
        },
      ],
    ],
  },
  security: {
    csp: {
      directives: ["default-src 'none'", "img-src 'self'", "font-src 'self'", "connect-src https://cloudflareinsights.com"],
      scriptDirective: {
        resources: ["'self'", 'https://static.cloudflareinsights.com'],
      },
    },
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
