import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createUserBodySchema, changeUserBodySchema, subscribeBodySchema } from './schemas';
// import type { UserEntity } from '../../utils/DB/entities/DBUsers';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    const users = await this.db.users.findMany();

    return users;
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply) {
      const user = await this.db.users.findOne({ key: 'id', equals: request.params.id });

      if (user) {
        return user;
      }

      return this.httpErrors.notFound();
    },
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createUserBodySchema,
      },
    },
    async function (request, reply) {
      const user = await this.db.users.create(request.body);

      if (user) {
        return user;
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
        await this.db.users.delete(request.params.id);

        return this.httpErrors.notFound();
      } catch (error) {
        return this.httpErrors.badRequest();
      }
    },
  );

  fastify.post(
    '/:id/subscribeTo',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply) {},
  );

  fastify.post(
    '/:id/unsubscribeFrom',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply) {},
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeUserBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply) {
      try {
        const user = await this.db.users.change(request.params.id, request.body);

        return user;
      } catch (error) {
        return this.httpErrors.badRequest();
      }
    },
  );
};

export default plugin;
