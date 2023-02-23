import { GraphQLObjectType } from "graphql";
import { memberTypeQuery, memberTypesQuery } from "./queries/memberTypeQuery";
import { postQuery, postsQuery } from "./queries/postQuery";
import { profileQuery, profilesQuery } from "./queries/profileQuery";
import { userQuery, usersQuery } from "./queries/userQuery";

export const generalQuery = new GraphQLObjectType({
  name: 'GeneralQuery',
  fields: {
    user: userQuery,
    users: usersQuery,

    profile: profileQuery,
    profiles: profilesQuery,

    post: postQuery,
    posts: postsQuery,

    memberType: memberTypeQuery,
    memberTypes: memberTypesQuery,
  }
})
