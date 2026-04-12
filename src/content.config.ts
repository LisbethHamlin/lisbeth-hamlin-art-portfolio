import { defineCollection, type SchemaContext } from 'astro:content';
import { z } from 'astro/zod';
import { file } from 'astro/loaders';
import yaml from 'js-yaml';

interface PortfolioItem extends Record<string, unknown> {
  image: string;
  description?: string;
  id?: string;
}

interface PortfolioGroup extends Record<string, unknown> {
  id: string;
  order: number;
  title: string;
  description?: string;
  thumbnail: string;
  images: PortfolioItem[];
}

const getImagePath = (group: string) => (image: string) => {
  return `/src/images/portfolio/${group}/${image}.jpg`;
};

const portfolioCollection = defineCollection({
  loader: file('src/data/portfolio.yml', {
    parser: (text: string) => {
      const res = yaml.load(text) as PortfolioGroup[];

      for (const group of res) {
        const imagePath = getImagePath(group.id);
        group.thumbnail = imagePath(group.thumbnail);
        for (const imgItem of group.images) {
          imgItem.id = imgItem.image;
          imgItem.image = imagePath(imgItem.image);
        }
      }

      return res;
    },
  }),
  schema: ({ image }) =>
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
      ),
    }),
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
      const res = yaml.load(text) as PortfolioGroup[];
      const data = res
        .flatMap((group) => {
          return group.images.map((item) => {
            return {
              ...item,
              id: item.image,
              image: `/src/images/portfolio/${group.id}/${item.image}.jpg`,
            };
          });
        })
        .filter((item) => {
          return indexPortfolioImageNames.includes(item.id);
        })
        .map((item) => ({
          ...item,
          order: indexPortfolioImageNames.findIndex(
            (indexItem) => indexItem === item.id
          ),
        }));

      return data;
    },
  }),
  schema: ({ image }: SchemaContext) =>
    z.object({
      image: image(),
      id: z.string(),
      order: z.number(),
      description: z.string().optional(),
    }),
});

export const collections = {
  portfolio: portfolioCollection,
  indexPortfolio: indexPortfolioCollection,
};
