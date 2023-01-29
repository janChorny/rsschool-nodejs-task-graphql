import { GraphQLID, GraphQLInt, GraphQLObjectType } from "graphql";

export const memberType = new GraphQLObjectType({
  name: 'UserMemberType',
  fields: () => ({
    id: { type: GraphQLID },
    discount: { type: GraphQLInt },
    monthPostsLimit: { type: GraphQLInt }
  })
});
