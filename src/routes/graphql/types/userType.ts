import { GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { MemberTypeEntity } from "../../../utils/DB/entities/DBMemberTypes";
import { PostEntity } from "../../../utils/DB/entities/DBPosts";
import { ProfileEntity } from "../../../utils/DB/entities/DBProfiles";
import { UserEntity } from "../../../utils/DB/entities/DBUsers";
import { Loaders } from "../loaders/loaders";
import { memberType } from "./memberType";
import { postType } from "./postType";
import { profileType } from "./profileType";

export const userType: GraphQLObjectType = new GraphQLObjectType({
  name: 'userType',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    subscribedToUserIds: { type: new GraphQLList(GraphQLString) },
    posts: {
      type: new GraphQLList(postType),
      resolve: async (user: UserEntity, args: any, loaders: Loaders): Promise<PostEntity[]> => {
        const postsByUserId = loaders.postsByUserId;
        return await postsByUserId.load(user.id);
      }
    },
    profile: {
      type: profileType,
      resolve: async (user: UserEntity, args: any, loaders: Loaders): Promise<ProfileEntity | null> => {
        const profilesByUserId = loaders.profilesByUserId;
        const profiles = await profilesByUserId.load(user.id);
        return profiles.length === 0 ? null : profiles[0];
      }
    },
    memberType: {
      type: memberType,
      resolve: async (user: UserEntity, args: any, loaders: Loaders): Promise<MemberTypeEntity | null> => {
        const profilesByUserId = loaders.profilesByUserId;
        const profiles = await profilesByUserId.load(user.id);
        if (profiles.length === 0) {
          return Promise.resolve(null);
        }
        const memberTypeById = loaders.memberTypeById;
        return await memberTypeById.load(profiles[0].memberTypeId);
      }
    },
    // followings.
    userSubscribedTo: {
      type: new GraphQLList(userType),
      resolve: async (user: UserEntity, args: any, loaders: Loaders): Promise<UserEntity[]> => {
        const usersBySubscribedToUserIds = loaders.usersBySubscribedToUserIds;
        return await usersBySubscribedToUserIds.load(user.id);
      }
    },
    //followers.
    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve: async (user: UserEntity, args: any, loaders: Loaders): Promise<(UserEntity | Error)[]> => {
        const userById = loaders.userById;
        return await userById.loadMany(user.subscribedToUserIds);
      }
    }
  })
});

export const userCreateType = new GraphQLInputObjectType({
  name: 'userCreateType',
  fields: () => ({
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  })
});

export const userUpdateType = new GraphQLInputObjectType({
  name: 'userUpdateType',
  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
  })
});

export const userSubscribeToInput = new GraphQLInputObjectType({
  name: 'userSubscribeToInput',
  fields: () => ({
    currentUserId: { type: new GraphQLNonNull(GraphQLID) },
    subscribeToUserId: { type: new GraphQLNonNull(GraphQLID) },
  })
});

export const userUnsubscribeFromInput = new GraphQLInputObjectType({
  name: 'userUnsubscribeFromInput',
  fields: () => ({
    currentUserId: { type: new GraphQLNonNull(GraphQLID) },
    unsubscribeFromUserId: { type: new GraphQLNonNull(GraphQLID) },
  })
});
