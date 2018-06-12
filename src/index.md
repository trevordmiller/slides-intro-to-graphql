# Intro to GraphQL

---

# A bit about me

---

# GraphQL at the Church

- Going forward, the stack team is evaluating adding support for GraphQL
- The starter will not include GraphQL by default
- In this presentation, we'll look at some cool ideas that you can explore
- GraphQL eliminates much of the complexity we see in REST + Redux without many sacrifices
- We hope to cover more about GraphQL during the React Bootcamp in July

---

# What is GraphQL?

A query language for your API

![What is GraphQL](src/assets/what-is-graphql.png)

---

![What GraphQL looks like](src/assets/what-graphql-looks-like.gif)

---

## "Ask for what you need, get exactly that"

- Send a GraphQL query to your API and get exactly what you need, nothing more and nothing less
- GraphQL queries always return predictable results
- Apps using GraphQL are fast and stable because they control the data they get, not the server

---

# GraphQL is a shift from imperative to declarative code

GraphQL is about writing **what** data you want instead of **how** to get it/store it/etc.

- Declarative: what
- Imperative: how

---

# GraphQL Syntax

Next let's see basic GraphQL syntax

Later I'll show full working examples in an app

---

## Schema

Describe your data with types

```graphql
type Query {
  me: User
}

type User {
  id: ID
  name: String
}
```

---

## GraphQL Service

Back-end wires up "resolver" functions for the schema to your database

```javascript
function Query_me(request) {
  return request.auth.user;
}

function User_name(user) {
  return user.getName();
}
```

This example is in JavaScript, but this can be in any back-end language

---

## GraphQL Queries

Ask for the data you want

```graphql
{
  me {
    name
  }
}
```

Gives you JSON:

```javascript
{
  "me": {
    "name": "Luke Skywalker"
  }
}
```

---

# Examples

Next let's see GraphQL used in JavaScript

---

## Vanilla JS

```javascript
const request = async () => {
  const response = await fetch("https://myapi.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: "{ me { name } }"
    })
  });

  const json = await response.json();

  console.log(json);
};

request();
```

Gives you JSON:

```javascript
{
  "me": {
    "name": "Luke Skywalker"
  }
}
```

---

## What now?

So far we've covered some vanilla GraphQL with vanilla JavaScript

At this point you could use a state management tool like Redux to work with GraphQL JSON responses in the same way we've been doing with REST

---

## Libraries

But because of the predictability of GraphQL's type system, there are libraries that can automate a lot of things for you

From https://graphql.org/code

![graphql.org screenshot](src/assets/graphql-org-screenshot.png)

---

### Apollo

We suggest Apollo as the GraphQL library for your client

- works with React, React Native, Angular, Vue, Polymer, vanilla JS etc.
- is easy to get started with
- requires less lock-in than alternatives
- is lightweight and performant
- is currently the most popular option
- has the best documentation
- has modular middleware for many common data problems
- has escape hatches for doing advanced things and taking full control

---

### Solutions

Apollo can handle a lot of data problems for you

- Syncing local state with your data
- Error state
- Loading state
- Mutation state changes
- Data updates (subscriptions or polling)
- Caching
- Memoization
- Optimistic UI
- etc.

---

```jsx
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loading from "components/Loading";
import Error from "components/Error";
import AllBlogPosts from "components/AllBlogPost";

const FEED = gql`
  query {
    posts {
      id
      type
      title
      description
    }
  }
`;

const Feed = () => (
  <Query query={FEED}>
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <Error>{error.message}</Error>;

      return <AllBlogPosts posts={data.posts} />;
    }}
  </Query>
);

export default Feed;
```

---

```jsx
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_POST = gql`
  mutation addBlogPost($type: String!) {
    addBlogPost(type: $type) {
      id
      type
    }
  }
`;

const AddBlogPost = () => {
  return (
    <Mutation mutation={ADD_POST}>
      {addBlogPost => (
        <button
          onClick={addBlogPost({
            variables: { type: "affiliate" }
          })}
        >
          Create new affiliate blog Post
        </button>
      )}
    </Mutation>
  );
};
```

---

When the components mount, Apollo subscribes to the result of the query via the Apollo Client cache

- First, Apollo tries to load the query result from the Apollo cache
- If it’s not in there, Apollo sends the request to the server
- Once the data comes back, Apollo normalizes it and stores it in the Apollo cache
- Since the component subscribes to the result, it updates with the data reactively

---

So for many use cases, if you have a GraphQL back-end, Apollo can potentially replace Redux

- Action creators
- Actions
- Reducers
- Thunks
- Manual global state tree management

---

## Apollo set up in a React app

```jsx
import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "https://myapi.com"
});

const App = () => <ApolloProvider client={client}>Your app</ApolloProvider>;

render(<App />, document.getElementById("root"));
```

---

### Add server-side rendering

You can rehydrate the client using the initial state passed from the server

```html
<script>
  window.__APOLLO_STATE__ = client.extract();
</script>
```

```javascript
const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  link
});
```

---

# Tools

---

## GraphiQL

---

## Browser Dev Tools

---

# GraphQL Stability

- Initially developed by Facebook since 2012
- Made public and open source in 2015
- Now stable and used by companies like Facebook, Twitter, Pinterest, GitHub, The New York Times, etc.
- Works with any database + back-end + front-end

---

# GraphQL Performance

Get many resources in a single request

- GraphQL queries access not just the properties of one resource but also smoothly follow references between them
- While typical REST APIs require loading from multiple URLs, GraphQL APIs get all the data your app needs in a single request
- Apps using GraphQL can be quick even on slow mobile network connections

---

# GraphQL is self-documenting

GraphQL has a simple type system (schema) so you get automatic documentation

This means that you can work in parallel between back-end/front-end once the schema is decided on

---

# Trade-offs of GraphQL + Apollo vs REST + Redux

Similiar trade-offs to going from vanilla JavaScript to a JavaScript framework but for data

### Pros

- Better performance
- Simpler code for data
- Community libraries for common problems

### Cons

- Locked in to GraphQL instead of REST
- Most systems are still in REST
- GraphQL is still a little new

---

# Summary

- GraphQL + Apollo is pretty slick
- Try it out if you'd like
- But REST + Redux isn't going anywhere any time soon, so don't stress 😃

---

# Where can I learn more?

- July React Bootcamp: https://reactbootcampjuly.eventbrite.com
- GraphQL docs: https://graphql.org
- Apollo docs: https://www.apollographql.com
- Next.js docs with Apollo: https://github.com/zeit/next.js/tree/canary/examples/with-apollo
- Try out GraphQL syntax: https://graphql.github.io/swapi-graphql

---

# The end
