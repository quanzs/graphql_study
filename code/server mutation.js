const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

(async function () {
  const typeDefs = gql`
    type Query {
      hello: String!
    }
    type Mutation {
      createPost(author: String, comment: String, other: ReviewInput): Post
    }
    type Post {
      comment: String
      author: Author
      stars: Int
    }
    type Author {
      name: String
    }
    input ReviewInput {
      stars: Int!
      commentary: String
    }
  `;

  const resolvers = {
    Mutation: {
      createPost(parent, args, context) {
        console.log("****args", args);
        return {
          author: {
            name: args.author,
          },
          comment: args.comment,
          stars: args.other.stars,
        };
      },
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      authScope: { role: "admin" },
    }),
  });

  const app = express();
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log("Now browse to http://localhost:4000" + server.graphqlPath)
  );
})();
