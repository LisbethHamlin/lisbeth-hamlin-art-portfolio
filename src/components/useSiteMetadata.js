import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
  const { site, siteBuildMetadata } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      siteBuildMetadata {
        buildTime(formatString: "YYYY")
      }
    }
  `)

  return {
    ...site.siteMetadata,
    ...siteBuildMetadata
  }
}