import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file } from 'astro/loaders';
import yaml from 'js-yaml';

const pagesCollection = defineCollection({
  loader: file('src/data/navigation.yml'),
  schema: () =>
    z.object({
      title: z.string(),
      slug: z.string(),
      excerpt: z.string(),
    })
});

const portfolioParser = (text: string) => {
  const res: any = yaml.load(text);

  for (const group of res) {
    for (const imgItem of group.images) {
      imgItem.image = `/src/images/portfolio/${group.id}/${imgItem.image}.jpg`;
    }
  }

  return res;
};

const portfolioSchema = ({ image }) =>
  z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    images: z.array(
      z.object({
        image: image(),
        description: z.string().optional(),
      })
    )
  });

const portfolioCollection = defineCollection({
  loader: file('src/data/portfolio.yml', {
    parser: portfolioParser,
  }),
  schema: portfolioSchema,
});

const indexPortfolioImageNames = [
  'floating-vegetable-market',
  'desert-wayside-triptych',
  'bushwoman',
  'celebration',
  'reflection',
  'camel-caravan',
  'zemba-girl',
  'djenne-mosque',
  'nomads-moving-on',
  'bushman-at-llaru',
];

const indexPortfolioCollection = defineCollection({
  loader: file('src/data/portfolio.yml', {
    parser: (text) => {
      const res: any = yaml.load(text);
      const data = Iterator
        .from(res)
        .flatMap((group: any) => {
          return group.images.map((item: any) => {
            return {
              ...item,
              id: item.image,
              image: `/src/images/portfolio/${group.id}/${item.image}.jpg`
            };
          })
        })
        .filter((item: any) => {
          return indexPortfolioImageNames.includes(item.id);
        })
        .toArray();

      return data;

    },
  }),
  schema: ({ image }) => z.object({
    image: image(),
    description: z.string().optional(),
  })
});

export const collections = {
  pages: pagesCollection,
  portfolio: portfolioCollection,
  indexPortfolio: indexPortfolioCollection,
};
