import { FastifyInstance } from "fastify";
import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
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
    user: {
      type: userType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: async (_: any, args: any, fastify: FastifyInstance) => {
        const user = await fastify.db.users.findOne({ key: 'id', equals: args.id });
        if (!user) {
          throw fastify.httpErrors.notFound();
        }
        return user;
      }
    },
    profiles: {
      type: new GraphQLList(profileType),
      resolve: async (_: any, args: any, fastify: FastifyInstance) => {
        return await fastify.db.profiles.findMany();
      },
    },
    profile: {
      type: profileType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: async (_: any, args: any, fastify: FastifyInstance) => {
        const profile = await fastify.db.profiles.findOne({ key: 'id', equals: args.id });
        if (!profile) {
          throw fastify.httpErrors.notFound();
        }
        return profile;
      }
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: async (_: any, args: any, fastify: FastifyInstance) => {
        return await fastify.db.posts.findMany();
      },
    },
    post: {
      type: postType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: async (_: any, args: any, fastify: FastifyInstance) => {
        const post = await fastify.db.posts.findOne({ key: 'id', equals: args.id });
        if (!post) {
          throw fastify.httpErrors.notFound();
        }
        return post;
      }
    },
    memberTypes: {
      type: new GraphQLList(memberType),
      resolve: async (_: any, args: any, fastify: FastifyInstance) => {
        return await fastify.db.memberTypes.findMany();
      },
    },
    memberType: {
      type: memberType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: async (_: any, args: any, fastify: FastifyInstance) => {
        const memberType = await fastify.db.memberTypes.findOne({ key: 'id', equals: args.id });
        if(!memberType){
          throw fastify.httpErrors.notFound();
        }
        return memberType
      }
    }
  }
})
