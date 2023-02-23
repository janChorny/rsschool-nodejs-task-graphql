import { GraphQLList, GraphQLString } from "graphql";
import { ContextValueType } from "../loaders/loaders";
import { profileType } from "../types/profileType";

export const profileQuery = {
  type: profileType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: async (_: any, args: any, context: ContextValueType) => {
    return await context.loaders.profileById.load(args.id);
  }
};

export const profilesQuery = {
  type: new GraphQLList(profileType),
  resolve: async (_: any, args: any, context: ContextValueType) => {
    return await context.fastify.db.profiles.findMany();
  }
};
