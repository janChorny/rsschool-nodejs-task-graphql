import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import {
  createUserBodySchema,
  changeUserBodySchema,
  subscribeBodySchema,
} from './schemas';
import type { UserEntity } from '../../utils/DB/entities/DBUsers';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<UserEntity[]> {
    return await fastify.db.users.findMany();
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity | null> {
      return await fastify.db.users.findOne({key: 'id', equals: request.params.id});
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createUserBodySchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      return await fastify.db.users.create(request.body);
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      return await fastify.db.users.delete(request.params.id);
    }
  );

  fastify.post(
    '/:id/subscribeTo',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const userToSubscribe = await fastify.db.users.findOne({ key: 'id', equals: request.params.id });
      return await fastify.db.users.change(request.body.userId, { subscribedToUserIds: [...userToSubscribe!.subscribedToUserIds, request.params.id]})
    }
  );

  fastify.post(
    '/:id/unsubscribeFrom',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const userToUnSubscribeFrom = await fastify.db.users.findOne({ key: 'id', equals: request.params.id });
      const userToUnSubscribeFromIndex = userToUnSubscribeFrom!.subscribedToUserIds.indexOf(request.params.id);
      const subscribedUsers = userToUnSubscribeFrom!.subscribedToUserIds.splice(userToUnSubscribeFromIndex, 1);
      return await fastify.db.users.change(request.body.userId, { subscribedToUserIds: subscribedUsers });
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeUserBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      return await fastify.db.users.change(request.params.id, request.body);
    }
  );
};

export default plugin;
