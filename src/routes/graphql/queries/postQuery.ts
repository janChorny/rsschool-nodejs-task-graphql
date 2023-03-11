import { GraphQLList, GraphQLString } from "graphql";
import { ContextValueType } from "../loaders/loaders";
import { postType } from "../types/postType";

export const postQuery = {
  type: postType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: async (_: any, args: any, context: ContextValueType) => {
    return await context.loaders.postById.load(args.id);
  }
};

export const postsQuery = {
  type: new GraphQLList(postType),
  resolve: async (_: any, args: any, context: ContextValueType) => {
    return await context.fastify.db.posts.findMany();
  }
};
