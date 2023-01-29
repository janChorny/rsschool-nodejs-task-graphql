import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

export const postType = new GraphQLObjectType({
  name: 'UserPost',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    userId: { type: GraphQLString }
  })
});
