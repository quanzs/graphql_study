const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

(async function () {
  const typeDefs = gql`
    type Query {
      pet(id: ID!): [Pets]
    }
    type Pets {
      id: ID
      name: String
      owner: Person
      price(unit: String): String
    }
    type Person {
      name: String
      gender: String
    }
  `;

  const resolvers = {
    Query: {
      pet: (parent, args, context, info) => {
        console.log("***pet", args.id);
        return [
          {
            id: 11086,
            name: "猎豹",
            price: 200000,
          },
          {
            id: 11096,
            name: "猫头鹰",
            price: 1000,
          },
        ];
      },
    },
    Pets: {
      owner(parent, args) {
        console.log("***Pets -> owner", parent, args);
        return { name: "小明" };
      },
      price(parent, args) {
        console.log("***Pets -> length", parent, args);
        return parent.price + args.unit;
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
