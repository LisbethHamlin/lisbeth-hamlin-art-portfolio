import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { artShows } from '@/contentful';
import { metadata } from '@/metadata';
import { urlFromTitle } from '@/utils';

export function GET(context: APIContext) {
  return rss({
    title: metadata.title,
    description: metadata.description,
    site: context.site!,
    items: artShows.items.map((item) => ({
      title: item.fields.displayField,
      pubDate: new Date(item.sys.createdAt),
      description: item.fields.excerpt,
      link: `/art-shows/${urlFromTitle(item.fields.displayField)}`,
    })),
    customData: `<language>en-us</language>`,
    stylesheet: '/rss/styles.xsl',
  });
}
