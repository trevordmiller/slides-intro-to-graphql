# Intro to GraphQL

---

## About me

---

## Outline

Let's dig in to real-world GraphQL

- Overview
- Syntax
- Tools
- Examples
- Summary

---

# Overview

---

## What is GraphQL?

A query language for your API

> "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools."

---

## Wait, what?

![What is GraphQL](src/assets/what-is-graphql.png)

---

## What does it look like?

![What GraphQL looks like](src/assets/what-graphql-looks-like.gif)

---

## "Ask for what you need, get exactly that"

> "Send a GraphQL query to your API and get exactly what you need, nothing more and nothing less. GraphQL queries always return predictable results. Apps using GraphQL are fast and stable because they control the data they get, not the server."

---

# Syntax

---

# Tools

---

## GraphiQL

---

## Browser Dev Tools

---

# Examples

---

## cURL

---

## Fetch

---

## Libraries

- https://graphql.org/code

---

## Apollo

- Apollo works with React, React Native, Angular, Vue, Polymer, vanilla JS etc.

---

```jsx
const ALL_POSTS_QUERY = gql`
  query {
    posts {
      id
      title
      description
      featuredImage
    }
  }
`

const Feed = () => (
  <Query query={ALL_POSTS_QUERY}>
    {({ loading, error, data }) => {
      if (error) {
        return <Error />
      }

      if (loading || !data) {
        return <LoadingSpinner />
      }

      return <AllPosts posts={data.posts} />
    }}
  </Query>
)
```

---

## Adding Apollo to a new React app

---

{apollo next.js example + apollo getting started pieces}

---

## Adding Apollo to an existing React + Redux app

---

{redux => apollo pieces}

---

# Summary

---

## Stability

- GraphQL is officially supported now 🎉
- Initially developed by Facebook since 2012
- Made public and open source in 2015
- Now stable and used by companies like Facebook, Twitter, Pinterest, GitHub, The New York Times, etc.
- Works with any database + back-end + front-end with minimal lock-in

---

## Performance

Get many resources in a single request

> "GraphQL queries access not just the properties of one resource but also smoothly follow references between them. While typical REST APIs require loading from multiple URLs, GraphQL APIs get all the data your app needs in a single request. Apps using GraphQL can be quick even on slow mobile network connections."

---

## Declarative

Write **what** data you want instead of **how**

---

![REST vs GraphQL](src/assets/rest-vs-graphql.png)

---

## Self-contained

- Data pieces live where they are used
- Like when we moved from `html/`, `css/`, `javascript/` to `components/`

---

## Versioned

Evolve your API without versions

> "Add new fields and types to your GraphQL API without impacting existing queries. Aging fields can be deprecated and hidden from tools. By using a single evolving version, GraphQL APIs give apps continuous access to new features and encourage cleaner, more maintainable server code."

---

## Self-documenting

GraphQL has simple type system

- Automatic documentation
- Can work in parallel between back-end/front-end once schema is decided

---

## Trade-offs of GraphQL + Apollo vs REST

### Pros

- Similiar trade-offs to going from vanilla JS to React but for data
- Opens up lots of community tools: Apollo addons, Prisma, etc.

### Cons

- Locked in to GraphQL
- Still a little new
- Most systems still in REST

---

REST isn't going anywhere any time soon, don't stress

But if you like this, feel free to give it a try!

---

# Review

## Declarative

What data your component needs, not how to get it/store it/update it etc.

## Self-contained

Data requirements live where they are used

## Community

Can rely on libraries for common functionality

---

# Where to now?

- https://graphql.org
- https://www.apollographql.com

---

# The end
