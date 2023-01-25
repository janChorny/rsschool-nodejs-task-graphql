import { join } from 'path';
import AutoLoad from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
import mercurius from 'mercurius';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
// import { gql } from 'mercurius-codegen';
import DB from './utils/DB/DB';

const app: FastifyPluginAsync = async (fastify): Promise<void> => {
  type createUserDTO = {
    firstName: 'string';
    lastName: 'string';
    email: 'string';
  };

  const typeDefs = `
    type Query {
      users: [UserEntity]!
      posts: [PostEntity]!
      user(id: ID!): UserEntity
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
      user: async (root: unknown, { id }: { id: string }, { db }: { db: DB }) => {
        const user = await db.users.findOne({ key: 'id', equals: id });

        if (user) {
          return user;
        }

        throw fastify.httpErrors.notFound();
      },
    },
    Mutation: {
      createUser: async (root: unknown, { input }: { input: createUserDTO }, { db }: { db: DB }) => {
        const user = await db.users.create(input);

        if (user) {
          return user;
        }

        throw fastify.httpErrors.badRequest();
      },
    },
  };

  fastify.register(mercurius, {
    schema: makeExecutableSchema({
      typeDefs: mergeTypeDefs([typeDefs]),
      resolvers: mergeResolvers([resolvers]),
    }),
    graphiql: true,
    context: () => ({ db : fastify.db}) 
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
