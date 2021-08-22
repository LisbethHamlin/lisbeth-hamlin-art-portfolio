const shuffle = require('lodash/shuffle');

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type PortfolioJson implements Node {
      file: File @link(by: "name", from: "title")
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
        type: ['PortfolioJson'],
        args: {
          limit: {
            type: 'Int!',
          },
        },
        resolve(source, args, context, info) {
          return shuffle(context.nodeModel.getAllNodes({ type: 'PortfolioJson' })).slice(0, args.limit);
        },
      },
    },
  };
  createResolvers(resolvers);
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /masonry-layout/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
