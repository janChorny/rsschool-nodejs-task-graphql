import { FastifyInstance } from "fastify";
import { GraphQLString } from "graphql";
import { UserEntity } from "../../../utils/DB/entities/DBUsers";
import { isUuid } from "../../../utils/isUuid";
import { removeArrayItem } from "../../../utils/DB/removeItem";
import { ContextValueType } from "../loaders/loaders";
import { userCreateType, userSubscribeToInput, userType, userUnsubscribeFromInput, userUpdateType } from "../types/userType";

export const createUserQuery = {
  type: userType,
  args: {
    user: { type: userCreateType }
  },
  resolve: async (_: any, args: any, context: ContextValueType) => {
    const user = await context.fastify.db.users.create(args.user);

    return user;
  }
};

export const updateUserQuery = {
  type: userType,
  args: {
    user: { type: userUpdateType },
    userId: { type: GraphQLString }
  },
  resolve: async (_: any, args: any, context: ContextValueType) => {
    const fastify: FastifyInstance = context.fastify;
    const id = args.userId;

    if (!isUuid(id)) {
      throw fastify.httpErrors.badRequest('User id is not a valid uuid');
    }

    const user = await fastify.db.users.findOne({ key: 'id', equals: id });

    if (user === null) {
      throw fastify.httpErrors.notFound('User not found');
    }

    const changedUser = await fastify.db.users.change(id, args.user);

    return changedUser!;
  }
};

export const subscribeUserToQuery = {
  type: userType,
  args: {
    payload: { type: userSubscribeToInput }
  },
  resolve: async (_: any, args: any, context: ContextValueType) => {
    const fastify: FastifyInstance = context.fastify;
    const currentUserId = args.payload.currentUserId;
    const subscribeToUserId = args.payload.subscribeToUserId;

    const currentUser = await fastify.db.users.findOne({ key: 'id', equals: currentUserId });

    if (currentUser === null) {
      throw fastify.httpErrors.notFound('Current user not found');
    }

    const userSubscribeTo = await fastify.db.users.findOne({ key: 'id', equals: subscribeToUserId });

    if (userSubscribeTo === null) {
      throw fastify.httpErrors.notFound('User to subscribe to not found');
    }

    if (userSubscribeTo.subscribedToUserIds.includes(currentUserId)) {
      throw fastify.httpErrors.badRequest('User already subscribed to');
    }

    userSubscribeTo.subscribedToUserIds.push(currentUserId);

    await fastify.db.users.change(subscribeToUserId, userSubscribeTo);

    return currentUser;
  }
};

export const unsubscribeUserFromQuery = {
  type: userType,
  args: {
    payload: { type: userUnsubscribeFromInput }
  },
  resolve: async (_: any, args: any, context: ContextValueType): Promise<UserEntity> => {
    const fastify: FastifyInstance = context.fastify;
    const unsubscribeFromUserId = args.payload.unsubscribeFromUserId;
    const currentUserId = args.payload.currentUserId;

    const userUnsubscribeFrom = await fastify.db.users.findOne({ key: 'id', equals: unsubscribeFromUserId });

    if (userUnsubscribeFrom === null) {
      throw fastify.httpErrors.notFound('User to unsubscribe from not found');
    }

    const currentUser = await fastify.db.users.findOne({ key: 'id', equals: currentUserId });

    if (currentUser === null) {
      throw fastify.httpErrors.notFound('Current user not found');
    }

    // `subscribedToUserIds` - followers
    if (!userUnsubscribeFrom.subscribedToUserIds.includes(currentUserId)) {
      throw fastify.httpErrors.badRequest('User not subscribed to');
    }

    removeArrayItem(userUnsubscribeFrom.subscribedToUserIds, currentUserId);

    await fastify.db.users.change(unsubscribeFromUserId, userUnsubscribeFrom);

    return currentUser;
  }
};
