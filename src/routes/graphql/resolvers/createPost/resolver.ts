import { FastifyInstance } from 'fastify/types/instance';
import { PostEntity } from '../../../../utils/DB/entities/DBPosts';

export const createPostResolver = {
  Mutation: {
    createPost: async (
      root: unknown,
      { input }: { input: Omit<PostEntity, 'id'> },
      { fastify }: { fastify: FastifyInstance },
    ) => {
      const post = await fastify.db.posts.create(input);

      if (post) {
        return post;
      }

      throw fastify.httpErrors.badRequest();
    },
  },
};
