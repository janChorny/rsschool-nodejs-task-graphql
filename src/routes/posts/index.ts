import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createPostBodySchema, changePostBodySchema } from './schema';
// import type { PostEntity } from '../../utils/DB/entities/DBPosts';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    const posts = await this.db.posts.findMany();

    return posts;
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply) {
      const post = await this.db.posts.findOne({ key: 'id', equals: request.params.id });

      if (post) {
        return post;
      }

      return this.httpErrors.notFound();
    },
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createPostBodySchema,
      },
    },
    async function (request, reply) {
      const post = await this.db.posts.create(request.body);

      if (post) {
        return post;
      }

      return this.httpErrors.badRequest();
    },
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply) {
      try {
        await this.db.posts.delete(request.params.id);

        return this.httpErrors.notFound()
      } catch (error) {
        return this.httpErrors.badRequest();
      }
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
    async function (request, reply) {
      try {
        const post = await this.db.posts.change(request.params.id, request.body);

        return post;
      } catch (error) {
        return this.httpErrors.badRequest();
      }
    },
  );
};

export default plugin;
