import { FastifyInstance } from "fastify";
import { GraphQLList, GraphQLObjectType } from "graphql";
import { memberType } from "./types/memberType";
import { postType } from "./types/postType";
import { profileType } from "./types/profileType";
import { userType } from "./types/userType";

export const generalQuery = new GraphQLObjectType({
  name: 'GeneralQuery',
  fields: {
    users: {
      type: new GraphQLList(userType),
      resolve: async (_: any, args: any, fastify: FastifyInstance) => {
        return await fastify.db.users.findMany();
      },
    },
    profiles: {
      type: new GraphQLList(profileType),
      resolve: async (_: any, args: any, fastify: FastifyInstance) => {
        return await fastify.db.profiles.findMany();
      },
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: async (_: any, args: any, fastify: FastifyInstance) => {
        return await fastify.db.posts.findMany();
      },
    },
    memberTypes: {
      type: new GraphQLList(memberType),
      resolve: async (_: any, args: any, fastify: FastifyInstance) => {
        return await fastify.db.memberTypes.findMany();
      },
    },
  }
})
