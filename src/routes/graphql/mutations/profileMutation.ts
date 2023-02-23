import { FastifyInstance } from "fastify";
import { GraphQLString } from "graphql";
import { isUuid } from "../../../utils/isUuid";
import { ContextValueType } from "../loaders/loaders";
import { createProfileType, profileType, updateProfileType } from "../types/profileType";

export const createProfileQuery = {
  type: profileType,
  args: {
    profile: { type: createProfileType }
  },
  resolve: async (_: any, args: any, context: ContextValueType) => {
    const fastify: FastifyInstance = context.fastify;
    const { userId, memberTypeId } = args.profile;

    const user = await fastify.db.users.findOne({ key: 'id', equals: userId });

    if (user === null) {
      throw fastify.httpErrors.badRequest('User not found');
    }

    const profileByUserId = await fastify.db.profiles.findOne({ key: 'userId', equals: userId });

    if (profileByUserId !== null) {
      throw fastify.httpErrors.badRequest('Profile already exists');
    }

    const memberType = await fastify.db.memberTypes.findOne({ key: 'id', equals: memberTypeId });

    if (memberType === null) {
      throw fastify.httpErrors.badRequest('Member type not found');
    }

    const profile = await fastify.db.profiles.create(args.profile);

    return profile;
  }
};

export const updateProfileQuery = {
  type: profileType,
  args: {
    profileId: { type: GraphQLString },
    profile: { type: updateProfileType }
  },
  resolve: async (_: any, args: any, context: ContextValueType) => {
    const fastify: FastifyInstance = context.fastify;
    const id = args.profileId;

    if (!isUuid(id)) {
      throw fastify.httpErrors.badRequest('Profile id is not a valid uuid');
    }

    const profile = await fastify.db.profiles.findOne({ key: 'id', equals: id });

    if (profile === null) {
      throw fastify.httpErrors.notFound('Profile not found');
    }

    const updatedProfile = await fastify.db.profiles.change(id, args.profile);

    return updatedProfile!;
  }
};
