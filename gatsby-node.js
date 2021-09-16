const { shuffler } = require('d3-array');
const { randomLcg } = require('d3-random');

const shuffle = shuffler(randomLcg(Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7 * 4.345))));

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

exports.createResolvers = ({ createResolvers }) => {
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
          return shuffle(nodes.flatMap((node) => node.images)).slice(0, args.limit);
        },
      },
    },
  };
  createResolvers(resolvers);
};
