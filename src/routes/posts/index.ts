import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createPostBodySchema, changePostBodySchema } from './schema';
import type { PostEntity } from '../../utils/DB/entities/DBPosts';
import { validate } from "uuid";

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<PostEntity[]> {
    return await fastify.db.posts.findMany()
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<PostEntity> {
      const post =  await fastify.db.posts.findOne({ key: 'id', equals: request.params.id });
      if(post === null){
        throw fastify.httpErrors.notFound();
      }
      return post;
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createPostBodySchema,
      },
    },
    async function (request, reply): Promise<PostEntity> {
      if (!validate(request.body.userId)) {
        throw fastify.httpErrors.badRequest();
      }

      const user = await fastify.db.users.findOne({ key: 'id', equals: request.body.userId });
      if (user === null) {
        throw fastify.httpErrors.badRequest();
      }

      const post = await fastify.db.posts.create(request.body);
      return post;
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<PostEntity> {
      if (!validate(request.params.id)) {
        throw fastify.httpErrors.badRequest();
      }

      const post = await fastify.db.posts.findOne({ key: 'id', equals: request.params.id });
      if (post === null) {
        throw fastify.httpErrors.notFound();
      }

      await fastify.db.posts.delete(request.params.id);
      return post;
    }
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
      if (!validate(request.params.id)) {
        throw fastify.httpErrors.badRequest();
      }
      
      const post = await fastify.db.posts.findOne({ key: 'id', equals: request.params.id });
      if (post === null) {
        throw fastify.httpErrors.notFound();
      }

      const result = await fastify.db.posts.change(request.params.id, request.body);
      return result!;
    }
  );
};

export default plugin;
