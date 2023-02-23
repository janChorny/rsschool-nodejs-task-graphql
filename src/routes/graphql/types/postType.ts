import { GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const postType = new GraphQLObjectType({
  name: 'postType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    userId: { type: GraphQLString }
  })
});

export const postCreateType = new GraphQLInputObjectType({
  name: 'postCreateType',
  fields: () => ({
    userId: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const postUpdateType = new GraphQLInputObjectType({
  name: 'postUpdateType',
  fields: () => ({
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  }),
});
