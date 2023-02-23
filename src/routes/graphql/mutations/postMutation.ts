import { FastifyInstance } from "fastify";
import { GraphQLString } from "graphql";
import { PostEntity } from "../../../utils/DB/entities/DBPosts";
import { isUuid } from "../../../utils/isUuid";
import { ContextValueType } from "../loaders/loaders";
import { postCreateType, postType, postUpdateType } from "../types/postType";

export const createPostQuery = {
  type: postType,
  args: {
    post: { type: postCreateType }
  },
  resolve: async (_: any, args: any, context: ContextValueType): Promise<PostEntity> => {
    const fastify: FastifyInstance = context.fastify;
    const { userId } = args.post;

    if (!isUuid(userId)) {
      throw fastify.httpErrors.badRequest('User id is not a valid uuid');
    }

    const user = await fastify.db.users.findOne({ key: 'id', equals: userId });

    if (user === null) {
      throw fastify.httpErrors.badRequest('User not found');
    }

    const post = await fastify.db.posts.create(args.post);

    return post;
  }
};

export const updatePostQuery = {
  type: postType,
  args: {
    postId: { type: GraphQLString },
    post: { type: postUpdateType }
  },
  resolve: async (_: any, args: any, context: ContextValueType) => {
    const id = args.postId;
    const fastify: FastifyInstance = context.fastify;

    if (!isUuid(id)) {
      throw fastify.httpErrors.badRequest('Post id is not a valid uuid');
    }

    const post = await fastify.db.posts.findOne({ key: 'id', equals: id });

    if (post === null) {
      throw fastify.httpErrors.notFound('Post not found');
    }

    const changed = await fastify.db.posts.change(id, args.post);

    return changed!;
  }
};
