import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar DateTime

  type User {
    id: ID!
    nome: String!
    email: String!
    dt_criacao: DateTime
  }

  type Query {
    user(id: ID!): User
    users: [User!]!
  }

  input CreateUserInput {
    nome: String!
    email: String!
  }

  input UpdateUserInput {
    nome: String
    email: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
  }
`;

export default typeDefs;