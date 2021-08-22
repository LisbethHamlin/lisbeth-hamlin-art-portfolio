const { urlFromTitle } = require('./src/url-builder');

module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.lisbethhamlin.com',
    title: 'Lisbeth Hamlin',
    email: 'betsydhamlin@yahoo.com',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-58096804-1',
      },
    },
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
    'gatsby-transformer-json',
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
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map((node) => {
                const url = urlFromTitle(site.siteMetadata.siteUrl + `/${node.parent.relativeDirectory}/` + node.frontmatter.title);
                return {
                  ...node.frontmatter,
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: url,
                  guid: url,
                  custom_elements: [{ 'content:encoded': node.html }],
                };
              });
            },
            query: `
            {
              allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
                nodes {
                  excerpt
                  html
                  frontmatter {
                    date
                    title
                  }
                  parent {
                    ... on File {
                      relativeDirectory
                    }
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
