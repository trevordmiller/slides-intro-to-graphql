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

## GraphQL at the Church

- Going forward, the stack team is evaluating adding support for GraphQL
- In this presentation, we'll look at some cool ideas that you can explore
- GraphQL + Apollo eliminates much of the complexity we see in REST + Redux without many sacrifices
- But don't worry, the stack team will continue to support REST + Redux
- We hope to cover more about GraphQL during the React Bootcamp in July

---

## What is GraphQL?

A query language for your API

> "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools."

---

![What is GraphQL](src/assets/what-is-graphql.png)

---

![What GraphQL looks like](src/assets/what-graphql-looks-like.gif)

---

### "Ask for what you need, get exactly that"

> "Send a GraphQL query to your API and get exactly what you need, nothing more and nothing less. GraphQL queries always return predictable results. Apps using GraphQL are fast and stable because they control the data they get, not the server."

---

# Syntax

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

input ReviewInput {
  stars: Int!
  commentary: String
}
```

---

## Service

Back-end wires up "resolver" functions for the schema

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

## Queries

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

## Mutations

Send what you data you want changed

```graphql
mutation CreateReview($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
```

Wire up variables:

```javascript
{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}
```

---

# Examples

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

So far we've covered some vanilla GraphQL

At this point you could use a state management tool like Redux to work with GraphQL JSON responses in the same way we've been doing with REST

---

## Libraries

But because of the predictability of GraphQL's type system, there are libraries that can automate a lot of things for you

See https://graphql.org/code

---

### Apollo

We suggest Apollo as the GraphQL library for your client because it...

- works with React, React Native, Angular, Vue, Polymer, vanilla JS etc.
- is easy to get started with
- requires less lock-in than alternatives
- is lightweight and performant
- is currently the most popular option
- has the best documentation
- has modular middleware for many common data problems

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

      return <AllPosts posts={data.posts} />;
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
  mutation addPost($type: String!) {
    addPost(type: $type) {
      id
      type
    }
  }
`;

const AddPost = () => {
  let input;

  return (
    <Mutation mutation={ADD_POST}>
      {(addPost, { data }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              addPost({ variables: { type: input.value } });
              input.value = "";
            }}
          >
            <input
              ref={node => {
                input = node;
              }}
            />
            <button type="submit">Add Post</button>
          </form>
        </div>
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

So for most use cases, Apollo replaces Redux

👋 Bye to action creators + actions + reducers + manual global state tree management

---

## Let's build an app using GraphQL + Apollo

---

{apollo next.js example + apollo getting started pieces}

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

GraphQL has a simple type system (schema) so you get automatic documentation

This means that you can work in parallel between back-end/front-end once the schema is decided on

---

## Trade-offs of GraphQL + Apollo vs REST + Redux

Similiar trade-offs to going from vanilla JS to React but for data

### Pros

- Better performance
- Simpler data code
- Community libraries for common problems

### Cons

- Locked in to GraphQL instead of REST
- Most systems still in REST
- Still a little new

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

---

# The end
