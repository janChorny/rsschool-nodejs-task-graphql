import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createPostBodySchema, changePostBodySchema } from './schema';
import type { PostEntity } from '../../utils/DB/entities/DBPosts';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<PostEntity[]> {
    const posts = await this.db.posts.findMany();

    reply.code(200).send(posts);
    return posts;
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<PostEntity> {
      const post = await this.db.posts.findOne({ key: 'id', equals: request.params.id });

      if (post) {
        reply.code(200).send(post);
        return post;
      }

      return reply.code(404);
    },
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createPostBodySchema,
      },
    },
    async function (request, reply): Promise<PostEntity> {
      const post = await this.db.posts.create(request.body);

      if (post) {
        reply.code(200).send(post);
        return post;
      }

      return reply.code(400);
    },
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<PostEntity> {
      const postExist = await this.db.posts.findOne({ key: 'id', equals: request.params.id });

      if (postExist) {
        await this.db.posts.delete(request.params.id);

        return reply.code(404);
      }

      return reply.code(400);
    },
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changePostBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<PostEntity> {
      const post = await this.db.posts.change(request.params.id, request.body);

      if (post) {
        reply.code(200).send(post);
        return post;
      }

      return reply.code(400);
    },
  );
};

export default plugin;
