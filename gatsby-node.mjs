import module from 'node:module';

const require = module.createRequire(import.meta.url);
const { urlFromTitle } = require('./src/url-builder');

const getRandomPortfolioItems = async ({ array, limit }) => {
  const url = new URL(process.env.WORKER_URL);
  url.searchParams.set('limit', array.length);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Custom-PSK': process.env.PSK,
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
    }
  `;

  createTypes(typeDefs);
};

export const createResolvers = async ({ createResolvers: createResolversParam }) => {
  const resolvers = {
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
