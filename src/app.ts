import { join } from 'path';
import AutoLoad from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
import mercurius from 'mercurius';
// import { makeExecutableSchema } from '@graphql-tools/schema';
// import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
// import { entitiesResolver } from './routes/graphql/resolvers/entities/resolver';
// import { entitiesTypeDefs } from './routes/graphql/resolvers/entities/typeDefs';
// import { entitiesByIdTypeDefs } from './routes/graphql/resolvers/entitiesById/typeDefs';
// import { entitiesByIdResolver } from './routes/graphql/resolvers/entitiesById/resolver';
import { schema } from './routes/graphql';
// import { gql } from 'mercurius-codegen';
// import DB from './utils/DB/DB';

const app: FastifyPluginAsync = async (fastify): Promise<void> => {
  // type createUserDTO = {
  //   firstName: 'string';
  //   lastName: 'string';
  //   email: 'string';
  // };

  // const typeDefs = `
  //   type Query {
  //     users: [UserEntity]!
  //     posts: [PostEntity]!
  //     user(id: ID!): UserEntity
  //     post(id: ID!): PostEntity
  //   }
  //   input CreateUserInput {
  //     firstName: String!
  //     lastName: String!
  //     email: String!
  //   }

  //   type UserEntity {
  //     id: ID!
  //     firstName: String!
  //     lastName: String!
  //     email: String!
  //     subscribedToUserIds: [String]!
  //   }
  //   type PostEntity {
  //     id: ID!
  //     title: String!
  //     content: String!
  //     userId: String!
  //   }
  //   type Mutation {
  //     createUser(input: CreateUserInput!): UserEntity
  //   }
  // `;

  // const resolvers = {
  //   Query: {
  //     users: async () => fastify.db.users.findMany(),
  //     posts: async () => fastify.db.posts.findMany(),
  //     user: async (root: unknown, { id }: { id: string }, { db }: { db: DB }) => {
  //       const user = await db.users.findOne({ key: 'id', equals: id });

  //       if (user) {
  //         return user;
  //       }

  //       throw fastify.httpErrors.notFound();
  //     },
  //     post: async (root: unknown, { id }: { id: string }, { db }: { db: DB }) => {
  //       const post = await db.posts.findOne({ key: 'id', equals: id });

  //       if (post) {
  //         return post;
  //       }

  //       throw fastify.httpErrors.notFound();
  //     },
  //   },
  //   Mutation: {
  //     createUser: async (root: unknown, { input }: { input: createUserDTO }, { db }: { db: DB }) => {
  //       const user = await db.users.create(input);

  //       if (user) {
  //         return user;
  //       }

  //       throw fastify.httpErrors.badRequest();
  //     },
  //   },
  // };

  fastify.register(mercurius, {
    schema,
    graphiql: true,
    context: () => ({ fastify }),
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
