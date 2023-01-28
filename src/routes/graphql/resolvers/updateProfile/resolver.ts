import { FastifyInstance } from "fastify/types/instance";
import { ProfileEntity } from "../../../../utils/DB/entities/DBProfiles";

export const updateProfileResolver = {
  Mutation: {
    updateProfile: async (
      root: unknown,
      {
        id,
        input,
      }: { id: string; input: Partial<Omit<ProfileEntity, "id" | "userId">> },
      fastify: FastifyInstance
    ) => {
      try {
        const profile = await fastify.db.profiles.change(id, input);

        return profile;
      } catch (error) {
        throw fastify.httpErrors.badRequest();
      }
    },
  },
};
