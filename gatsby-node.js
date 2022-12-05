const { urlFromTitle } = require('./src/url-builder');

const getRandomPortfolioItems = async ({ array, limit }) => {
  const { got } = await import('got');
  const items = await got(process.env.WORKER_URL, {
    http2: true,
    searchParams: {
      limit: array.length,
    },
    headers: {
      'X-Custom-PSK': process.env.PSK,
    },
  }).json();

  const newArray = new Array(limit);
  for (let i = 0; i < limit; i++) {
    newArray[i] = array[items[i]];
  }

  return newArray;
};

exports.createSchemaCustomization = ({ actions, schema }) => {
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

exports.createResolvers = async ({ createResolvers }) => {
  const resolvers = {
    Query: {
      randomPortfolioItems: {
        type: ['PortfolioImage'],
        args: {
          limit: {
            type: 'Int!',
          },
        },
        resolve(source, args, context, info) {
          const nodes = context.nodeModel.getAllNodes({ type: 'PortfolioYaml' });
          return getRandomPortfolioItems({
            array: nodes.flatMap((node) => node.images),
            limit: args.limit,
          });
        },
      },
    },
  };
  createResolvers(resolvers);
};

exports.createPages = async ({ actions, graphql }) => {
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
