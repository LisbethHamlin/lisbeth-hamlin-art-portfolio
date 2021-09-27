const { default: got } = require('got');
require('dotenv').config();

const getRandomPortfolioItems = async ({ array, limit }) => {
  const { items } = await got(process.env.WORKER_URL, {
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
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter implements Node {
      end_date: Date
    }
  `;

  createTypes([
    schema.buildObjectType({
      name: 'MarkdownRemark',
      interfaces: ['Node'],
      fields: {
        isEndDateFuture: {
          type: 'Boolean!',
          resolve: (source) => new Date(source.frontmatter.end_date) > new Date(),
        },
      },
    }),
  ]);

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
