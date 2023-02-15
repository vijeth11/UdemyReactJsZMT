import * as React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogLink = styled(Link)`
  text-decoration: none;

`
const Blogtitle = styled.h3`
margin-bottom: 20px;
color: blue;
`

const IndexPage = ({data}) => (
  <Layout>
    <div>
      <h1>Vijeth Thoughts</h1>
      <h4>{data.allMarkdownRemark.totalCount}</h4>
      {
        data.allMarkdownRemark.edges.map(({node})=> (
          <div key={node.id}>
            <BlogLink to={node.fields.slug}>
              <Blogtitle>{node.frontmatter.title} - {node.frontmatter.date}</Blogtitle>
            </BlogLink>
            <p>{node.excerpt}</p>
          </div>
        ))
      }
    </div>    
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage

export const query = graphql`
      query {
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
    edges {
      node {
        id
        frontmatter {
          description
          title
          date
        }
        html
        excerpt
        fields {
          slug
        }
      }
    }
    totalCount
  }
}
`
