import module from 'node:module';

const require = module.createRequire(import.meta.url);
const { urlFromTitle } = require('./src/url-builder');

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

export const createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type PortfolioImage {
      file: File! @link(by: "name", from: "image")
      title: String
    }
    type PortfolioYaml implements Node {
      images: [PortfolioImage]!
      firstImage: PortfolioImage
    }
  `;

  createTypes(typeDefs);
};

export const createResolvers = async ({ createResolvers: createResolversParam }) => {
  // mapping of group to thumbnail image name
  const thumbnailMapping = {
    ceramics: 'mugs',
    hats: 'hat-01-outside',
    jewelry: 'polymer-clay-jewlery',
    mosaics: 'bushwoman',
    'paper-collage': 'celebration',
    printmaking: 'desert-wayside-triptych',
    watercolor: 'floating-vegetable-market',
  };

  const resolvers = {
    PortfolioYaml: {
      firstImage: {
        type: 'PortfolioImage',
        resolve(source) {
          const thumbnailImageName = thumbnailMapping[source.group];
          if (!thumbnailImageName) {
            throw new Error('No thumbnail mapping found for group: ' + source.group);
          }
          const thumbnailImage = source.images?.find((img) => img.image === thumbnailImageName);
          if (!thumbnailImage) {
            throw new Error('No image found with name: ' + thumbnailImageName);
          }
          return thumbnailImage;
        },
      },
    },
    Query: {
      indexPortfolioItems: {
        type: ['PortfolioImage'],
        args: {
          limit: {
            type: 'Int!',
          },
        },
        async resolve(source, args, { nodeModel }, info) {
          const { entries } = await nodeModel.findAll({ type: 'PortfolioYaml' });
          const allImages = Array.from(entries).flatMap((node) => node.images);
          const imageByName = new Map(allImages.map((image) => [image.image, image]));

          const selectedImages = indexPortfolioImageNames.map((imageName) => {
            const selectedImage = imageByName.get(imageName);
            if (!selectedImage) {
              throw new Error('No image found with name: ' + imageName);
            }
            return selectedImage;
          });

          return selectedImages.slice(0, args.limit);
        },
      },
    },
  };
  createResolversParam(resolvers);
};

export const createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query {
      allContentfulArtShows(filter: { ignore: { eq: false } }) {
        nodes {
          title: displayField
          post {
            raw
          }
        }
      }
    }
  `);

  for (const artShow of data.allContentfulArtShows.nodes) {
    const path = `/art-shows/${urlFromTitle(artShow.title)}`;
    const component = require.resolve('./src/templates/art-show.js');
    actions.createPage({
      path,
      component,
      context: artShow,
    });
  }
};
