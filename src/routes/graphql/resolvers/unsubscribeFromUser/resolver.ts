import { FastifyInstance } from "fastify/types/instance";
import { ProfileEntity } from "../../../../utils/DB/entities/DBProfiles";

export const unsubscribeFromUserResolver = {
  Mutation: {
    unsubscribeFromUser: async (
      root: unknown,
      { id, input }: { id: string; input: Pick<ProfileEntity, "userId"> },
      fastify: FastifyInstance
    ) => {
      const user = await fastify.db.users.findOne({
        key: "id",
        equals: input.userId,
      });

      if (user) {
        const isUserSubscribed = user.subscribedToUserIds.includes(id);

        if (isUserSubscribed) {
          const updatedUser = await fastify.db.users.change(input.userId, {
            subscribedToUserIds: user.subscribedToUserIds.filter(
              (_id) => _id !== id
            ),
          });

          return updatedUser;
        }

        throw fastify.httpErrors.badRequest();
      }

      throw fastify.httpErrors.badRequest();
    },
  },
};
