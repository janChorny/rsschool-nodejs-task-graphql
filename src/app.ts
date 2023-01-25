import { join } from 'path';
import AutoLoad from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
import mercurius from 'mercurius';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { gql } from 'mercurius-codegen';

const app: FastifyPluginAsync = async (fastify): Promise<void> => {
  type createUserDTO = {
    firstName: 'string';
    lastName: 'string';
    email: 'string';
  };
  const typeDefs = gql`
    type Query {
      users: [UserEntity]!
      posts: [PostEntity]!
      user(id: String): UserEntity
    }
    input CreateUserInput {
      firstName: String!
      lastName: String!
      email: String!
    }

    type UserEntity {
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
      subscribedToUserIds: [String]!
    }
    type PostEntity {
      id: ID!
      title: String!
      content: String!
      userId: String!
    }
    type Mutation {
      createUser(input: CreateUserInput!): UserEntity
    }
  `;
  const resolvers = {
    Query: {
      users: async () => fastify.db.users.findMany(),
      posts: async () => fastify.db.posts.findMany(),
      user: async (id: string) => fastify.db.users.findOne({ key: 'id', equals: id }),
    },
    Mutation: {
      createUser: async (input: createUserDTO) => await fastify.db.users.create(input),
    },
  };

  fastify.register(mercurius, {
    schema: makeExecutableSchema({
      typeDefs: mergeTypeDefs([typeDefs]),
      resolvers: mergeResolvers([resolvers]),
    }),
    graphiql: true,
  });

  fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: {},
  });

  fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: {},
  });
};

export default app;
