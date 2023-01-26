import { FastifyInstance } from "fastify/types/instance";

export const getSubscribedUsersProfileResolver = {
  Query: {
    getSubscribedUsersProfile: async (
      root: unknown,
      _: unknown,
      fastify: FastifyInstance
    ) => await fastify.db.users.findMany(),
  },
};
