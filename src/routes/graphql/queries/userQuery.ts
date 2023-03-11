import { GraphQLList, GraphQLString } from "graphql";
import { UserEntity } from "../../../utils/DB/entities/DBUsers";
import { ContextValueType } from "../loaders/loaders";
import { userType } from "../types/userType";

export const userQuery = {
  type: userType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: async (_: any, args: any, context: ContextValueType) => {
    return await context.loaders.userById.load(args.id);
  }
};

export const usersQuery = {
  type: new GraphQLList(userType),
  resolve: async (_: any, args: any, context: ContextValueType) => {
    const allUsers: UserEntity[] = await context.fastify.db.users.findMany();
    context.loaders.populateUserCache(allUsers);
    return allUsers;
  }
};
