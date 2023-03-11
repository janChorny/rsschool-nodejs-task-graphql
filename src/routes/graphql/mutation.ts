import { GraphQLObjectType } from "graphql";
import { updateMemberTypeQuery } from "./mutations/memberTypeMutation";
import { createPostQuery, updatePostQuery } from "./mutations/postMutation";
import { createProfileQuery, updateProfileQuery } from "./mutations/profileMutation";
import { createUserQuery, subscribeUserToQuery, unsubscribeUserFromQuery, updateUserQuery } from "./mutations/userMutation";

export const generalMutation = new GraphQLObjectType({
  name: 'GeneralMutation',
  fields: {
    createUser: createUserQuery,
    updateUser: updateUserQuery,
    subscribeUserTo: subscribeUserToQuery,
    unsubscribeUserFrom: unsubscribeUserFromQuery,

    createProfile: createProfileQuery,
    updateProfile: updateProfileQuery,

    createPost: createPostQuery,
    updatePost: updatePostQuery,

    updateMemberType: updateMemberTypeQuery,
  }
});
