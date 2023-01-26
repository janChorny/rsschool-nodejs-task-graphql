import { FastifyInstance } from "fastify/types/instance";

export const getUsersProfileSubscribedToResolver = {
  Query: {
    getUsersProfileSubscribedTo: async (
      root: unknown,
      _: unknown,
      fastify: FastifyInstance
    ) => await fastify.db.users.findMany(),
  },
};
