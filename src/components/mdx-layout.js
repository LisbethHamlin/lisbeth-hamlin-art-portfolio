import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { useSiteMetadata } from '../components/useSiteMetadata';

const Table = (props) => <table className="table table-hover" {...props}>{props.children}</table>
const ContactEmailAddress = (props) => {
  const { email } = useSiteMetadata();
  const href = `mailto:${email}`
  return <a {...props} href={ href }>{ email }</a>
}

const components = {
  table: Table,
  ContactEmailAddress
}

const MDXLayout = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
)

export default MDXLayout;