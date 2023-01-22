import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createUserBodySchema, changeUserBodySchema, subscribeBodySchema } from './schemas';
import type { UserEntity } from '../../utils/DB/entities/DBUsers';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<UserEntity[]> {
    const users = await this.db.users.findMany();

    reply.code(200).send(users);
    return users;
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const user = await this.db.users.findOne({ key: 'id', equals: request.params.id });

      if (user) {
        reply.code(200).send(user);
        return user;
      }

      return reply.code(404);
    },
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createUserBodySchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const user = await this.db.users.create(request.body);

      if (user) {
        reply.code(200).send(user);
        return user;
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
    async function (request, reply) {
      const userExist = await this.db.users.findOne({ key: 'id', equals: request.params.id });

      if (userExist) {
        await this.db.users.delete(request.params.id);

        return reply.code(404);
      }

      return reply.code(400);
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
      const user = await this.db.users.change(request.params.id, request.body);

      if (user) {
        reply.code(200).send(user);
        return user;
      }

      return reply.code(400);
    },
  );
};

export default plugin;
