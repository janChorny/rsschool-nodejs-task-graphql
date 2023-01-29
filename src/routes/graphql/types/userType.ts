import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export const userType = new GraphQLObjectType({
  name: 'User',
  fields:() => ({
    id: {type: GraphQLID},
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    subscribedToUserIds: { type: new GraphQLList(GraphQLString) }
  })
});
