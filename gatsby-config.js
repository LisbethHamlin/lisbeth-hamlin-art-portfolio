module.exports = {
  flags: {
    DEV_SSR: true
  },
  siteMetadata: {
    siteUrl: "https://www.lisbethhamlin.com",
    title: "Lisbeth Hamlin",
    email: "betsydhamlin@yahoo.com"
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-58096804-1",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    "gatsby-transformer-remark",
    "gatsby-transformer-yaml",
    "gatsby-transformer-json",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
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
          default: require.resolve("./src/components/mdx-layout.js"),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
              maxWidth: 590,
              wrapperStyle: `margin: 0`,
            },
          },
        ],
      },
    },
    "gatsby-plugin-sass",
    'gatsby-plugin-styled-components',
  ]
};
