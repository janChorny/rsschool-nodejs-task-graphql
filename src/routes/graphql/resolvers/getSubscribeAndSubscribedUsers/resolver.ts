import { FastifyInstance } from "fastify/types/instance";

export const getSubscribeAndSubscribedUsersResolver = {
  Query: {
    getSubscribeAndSubscribedUsers: async (
      root: unknown,
      _: unknown,
      fastify: FastifyInstance
    ) => await fastify.db.users.findMany(),
  },
};
