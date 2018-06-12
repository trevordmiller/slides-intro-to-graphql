# Intro to GraphQL

---

# About me

---

# Outline

- Overview
- Syntax
- Examples
- Tools
- General Info

---

# Overview

---

## Where does GraphQL fit in at the Church?

- Going forward, the stack team is evaluating adding support for GraphQL
- In this presentation, we'll look at some cool ideas that you can explore
- We feel GraphQL + Apollo eliminates some of the complexity we see in REST + Redux without sacrificing most of the benefit
- But don't worry, the stack team will continue to support REST + Redux
- We hope to cover more about GraphQL during the React Bootcamp in July

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

## Schema

```graphql
type Query {
  me: User
}

type User {
  id: ID
  name: String
}

input ReviewInput {
  stars: Int!
  commentary: String
}
```

---

## Service

Back-end wires up "resolver" functions to data. This example is in JavaScript for simplicity, but this can be in any language.

```javascript
function Query_me(request) {
  return request.auth.user;
}

function User_name(user) {
  return user.getName();
}
```

---

## Queries

```graphql
{
  me {
    name
  }
}
```

Outputs JSON:

```javascript
{
  "me": {
    "name": "Luke Skywalker"
  }
}
```

---

## Mutations

```graphql
mutation CreateReview($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
```

```javascript
{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}
```

```javascript
{
  "data": {
    "createReview": {
      "stars": 5,
      "commentary": "This is a great movie!"
    }
  }
}
```

# Examples

---

## Vanilla JS

```javascript
fetch("https://myapi.com", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: "{ me { name } }"
  })
})
  .then(res => res.json())
  .then(res => console.log(res.data));
```

Outputs JSON:

```javascript
{
  "me": {
    "name": "Luke Skywalker"
  }
}
```

---

## Libraries

- https://graphql.org/code

---

## Apollo

Handles a lot of problems for you:

- Local state management
- Error state
- Loading state
- Mutation state changes
- Data updates (subscriptions or polling)
- Caching
- Memoization
- Optimistic UI
- etc

Apollo works with React, React Native, Angular, Vue, Polymer, vanilla JS etc.

---

```jsx
import { Query } from "react-apollo";
import gql from "graphql-tag";

const ALL_POSTS_QUERY = gql`
  query {
    posts {
      id
      title
      description
      featuredImage
    }
  }
`;

const Feed = () => (
  <Query query={ALL_POSTS_QUERY}>
    {({ loading, error, data }) => {
      if (error) {
        return <Error />;
      }

      if (loading || !data) {
        return <LoadingSpinner />;
      }

      return <AllPosts posts={data.posts} />;
    }}
  </Query>
);

export default Feed;
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

{apollo links middleware}

---

# Tools

---

## GraphiQL

---

## Browser Dev Tools

---

# General Info

---

## Stability

- Initially developed by Facebook since 2012
- Made public and open source in 2015
- Now stable and used by companies like Facebook, Twitter, Pinterest, GitHub, The New York Times, etc.
- Works with any database + back-end + front-end

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

## Trade-offs of GraphQL + Apollo vs REST + Redux

### Pros

- Similiar trade-offs to going from vanilla JS to React but for data
- GraphQL schema has led to many community tools: Apollo addons, Prisma, etc.

### Cons

- Locked in to GraphQL
- Most systems still in REST
- Still a little new

---

REST + Redux isn't going anywhere any time soon, don't stress

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

# Where can I learn more?

- July React Bootcamp: https://reactbootcampjuly.eventbrite.com
- GraphQL docs: https://graphql.org
- Apollo docs: https://www.apollographql.com

---

# The end
