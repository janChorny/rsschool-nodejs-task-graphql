import { GraphQLList, GraphQLObjectType } from "graphql";
import { UserEntity } from "../../../utils/DB/entities/DBUsers";
import { userType } from "./userType";

export const userQuery = new GraphQLObjectType({
  name: 'UserQuery',
  fields: {
    users: {
      type: new GraphQLList(userType),
      async resolve(source, args, context): Promise<UserEntity[]> {
        return await context.db.users.findMany();
      },
    }
  }
})
