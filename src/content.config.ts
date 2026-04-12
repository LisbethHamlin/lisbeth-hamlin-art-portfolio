import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file } from 'astro/loaders';
import yaml from 'js-yaml';

const getImagePath = (group: string) => (image: string) => {
  return `/src/images/portfolio/${group}/${image}.jpg`;
};

const portfolioParser = (text: string) => {
  const res: any = yaml.load(text);

  for (const group of res) {
    const imagePath = getImagePath(group.id);
    group.thumbnail = imagePath(group.thumbnail);
    for (const imgItem of group.images) {
      imgItem.id = imgItem.image;
      imgItem.image = imagePath(imgItem.image);
    }
  }

  return res;
};

const portfolioSchema = ({ image }) =>
  z.object({
    id: z.string(),
    order: z.number(),
    title: z.string(),
    description: z.string().optional(),
    thumbnail: image(),
    images: z.array(
      z.object({
        id: z.string(),
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
  portfolio: portfolioCollection,
  indexPortfolio: indexPortfolioCollection,
};
