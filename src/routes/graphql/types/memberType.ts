import { GraphQLID, GraphQLInputObjectType, GraphQLInt, GraphQLObjectType } from "graphql";

export const memberType = new GraphQLObjectType({
  name: 'memberType',
  fields: () => ({
    id: { type: GraphQLID},
    discount: { type: GraphQLInt },
    monthPostsLimit: { type: GraphQLInt }
  })
});

export const updateMemberType = new GraphQLInputObjectType({
  name: 'updateMemberType',
  fields: () => ({
    discount: { type: GraphQLInt },
    monthPostsLimit: { type: GraphQLInt },
  }),
});
