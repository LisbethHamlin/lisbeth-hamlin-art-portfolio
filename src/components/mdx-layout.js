import React from "react"
import { MDXProvider } from "@mdx-js/react"

const Table = (props) => <table className="table table-hover" {...props}>{props.children}</table>

const components = {
  table: Table,
}

const MDXLayout = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
)

export default MDXLayout;