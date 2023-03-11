import { GraphQLList, GraphQLString } from "graphql";
import { ContextValueType } from "../loaders/loaders";
import { memberType } from "../types/memberType";

export const memberTypeQuery = {
  type: memberType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: async (_: any, args: any, context: ContextValueType) => {
    return await context.loaders.memberTypeById.load(args.id);
  }
};

export const memberTypesQuery = {
  type: new GraphQLList(memberType),
  resolve: async (_: any, args: any, context: ContextValueType) => {
    const memberTypes = await context.fastify.db.memberTypes.findMany();
    context.loaders.populateMemberTypeCache(memberTypes);
    return memberTypes;
  }
};
