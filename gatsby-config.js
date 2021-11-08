const { urlFromTitle } = require('./src/url-builder');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
require('dotenv').config();

module.exports = {
  siteMetadata: {
    siteUrl: 'https://lisbethhamlin.com',
    title: 'Lisbeth Hamlin',
    email: 'betsydhamlin@yahoo.com',
  },
  jsxRuntime: 'automatic',
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        stripMetadata: false,
        defaults: {
          formats: ['auto', 'avif', 'webp'],
        },
      },
    },
    `gatsby-transformer-sharp`,
    'gatsby-transformer-remark',
    'gatsby-plugin-image',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/images/`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve('./src/components/mdx-layout.js'),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              quality: 80,
              withWebp: true,
              withAvif: true,
              linkImagesToOriginal: false,
              maxWidth: 590,
              wrapperStyle: `margin: 0`,
            },
          },
        ],
      },
    },
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, artShows } }) => {
              return artShows.nodes.map((node) => {
                const url = urlFromTitle(site.siteMetadata.siteUrl + `/art-shows/` + node.title);
                const html = documentToHtmlString(JSON.parse(node.post.raw));
                return {
                  title: node.title,
                  description: node.excerpt,
                  date: node.createdAt,
                  url: url,
                  guid: url,
                  custom_elements: [{ 'content:encoded': html }],
                };
              });
            },
            query: `
            {
              artShows: allContentfulArtShows(sort: {order: DESC, fields: endDate}) {
                nodes {
                  title: displayField
                  excerpt
                  createdAt
                  post {
                    raw
                  }
                }
              }
            }
            `,
            output: '/rss.xml',
            title: 'Lisbeth Hamlin Art Shows',
          },
        ],
      },
    },
  ],
};
