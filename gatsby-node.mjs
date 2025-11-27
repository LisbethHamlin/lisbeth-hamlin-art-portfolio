import module from 'node:module';

const require = module.createRequire(import.meta.url);
const { urlFromTitle } = require('./src/url-builder');

const getRandomPortfolioItems = async ({ array, limit }) => {
  const url = new URL(process.env.WORKER_URL);
  url.searchParams.set('limit', array.length);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'CF-Access-Client-Id': process.env.CLIENT_ID,
      'CF-Access-Client-Secret': process.env.CLIENT_SECRET,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error status from worker: ${response.status}`);
  }

  const items = await response.json();

  const newArray = new Array(limit);
  for (let i = 0; i < limit; i++) {
    newArray[i] = array[items[i]];
  }

  return newArray;
};

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
    watercolor: 'kavango-clan',
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
      randomPortfolioItems: {
        type: ['PortfolioImage'],
        args: {
          limit: {
            type: 'Int!',
          },
        },
        async resolve(source, args, { nodeModel }, info) {
          const { entries } = await nodeModel.findAll({ type: 'PortfolioYaml' });
          return getRandomPortfolioItems({
            array: Array.from(entries).flatMap((node) => node.images),
            limit: args.limit,
          });
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
