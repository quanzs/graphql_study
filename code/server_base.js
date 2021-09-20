const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

(async function () {
  const typeDefs = gql`
    union SearchResult = Person | Pets
    type Query {
      hello: String!
      person: [Person]
      pet: [Pets]
      search: [SearchResult]
      animal: [Animal]
    }
    interface Animal {
      id: ID
      name: String
    }
    type Person implements Animal {
      id: ID
      age: Int
      name: String
      salary: Float
      retired: Boolean
      gender: Sex
    }
    type Pets implements Animal {
      id: ID
      name: String
      price: Float
    }
    enum Sex {
      male
      female
    }
  `;

  const resolvers = {
    Query: {
      hello: () => {
        return "hello world";
      },
      person: () => {
        return [
          {
            id: 11086,
            name: "移动",
            salary: 10000,
            retired: false,
            gender: "male",
          },
        ];
      },
      pet: () => {
        return [
          {
            id: 11096,
            name: "猫头鹰",
            price: 1000,
          },
        ];
      },
      animal: () => {
        return [
          {
            id: 11096,
            name: "猫头鹰",
            price: 1000,
          },
        ];
      },
      search: () => {
        return [
          {
            id: 11086,
            name: "移动",
            salary: 10000,
            retired: false,
            gender: "male",
          },
          {
            id: 11087,
            name: "小狗",
            price: 2000,
          },
        ];
      },
    },
    Animal: {
      __resolveType: (obj, context, info) => {
        if (obj.salary) return "Person";
        return "Pets";
      },
    },
    SearchResult: {
      __resolveType: (obj, context, info) => {
        if (obj.salary) return "Person";
        return "Pets";
      },
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  const app = express();
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log("Now browse to http://localhost:4000" + server.graphqlPath)
  );
})();
