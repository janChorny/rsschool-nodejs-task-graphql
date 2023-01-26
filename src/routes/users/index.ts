import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import {
  createUserBodySchema,
  changeUserBodySchema,
  subscribeBodySchema,
} from './schemas';
import type { UserEntity } from '../../utils/DB/entities/DBUsers';
import { validate } from "uuid";

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<UserEntity[]> {
    const result = await fastify.db.users.findMany();
    return result;
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const searchedUser = await fastify.db.users.findOne({ key: 'id', equals: request.params.id });
      if (searchedUser === null) {
        throw fastify.httpErrors.notFound();
      }
      return searchedUser;
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
      const result = await fastify.db.users.create(request.body);
      return result;
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
      if (!validate(request.params.id)) {
        throw fastify.httpErrors.badRequest();
      }

      const userToDelete = await fastify.db.users.findOne({ key: 'id', equals: request.params.id });
      if (userToDelete === null) {
        throw fastify.httpErrors.notFound();
      } 
      const userToDeleteProfile = await fastify.db.profiles.findOne({ key: 'userId', equals: userToDelete.id });
      if (userToDeleteProfile) {
        await fastify.db.posts.delete(userToDeleteProfile.id)
      }
      const userToDeletePosts = await fastify.db.posts.findMany({ key: 'userId', equals: userToDelete.id });
      userToDeletePosts.forEach(async (post) => {
        await fastify.db.posts.delete(post.id)
      })
      const userToDeleteSubscribers = await fastify.db.users.findMany({ key: 'subscribedToUserIds', equals: [userToDelete.id] });
      userToDeleteSubscribers.forEach(async (subscriber)=>
        await fastify.db.users.change(subscriber.id, {
          subscribedToUserIds: subscriber.subscribedToUserIds.filter(
            (subscriberId) => subscriberId !== userToDelete.id)
          })
        )
      await fastify.db.users.delete(request.params.id);
      return userToDelete;
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
      const subscriber = await fastify.db.users.findOne({ key: 'id', equals: request.params.id });
      if (subscriber === null) {
        throw fastify.httpErrors.notFound();
      } 

      const userSubscribeTo= await fastify.db.users.findOne({ key: 'id', equals: request.body.userId });
      if (userSubscribeTo === null) {
        throw fastify.httpErrors.notFound();
      }

      if (userSubscribeTo.subscribedToUserIds.includes(request.params.id)) {
        throw fastify.httpErrors.badRequest();
      }

      userSubscribeTo.subscribedToUserIds.push(request.params.id);
      await fastify.db.users.change(request.body.userId, userSubscribeTo);

      return subscriber;
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
      const subscriber = await fastify.db.users.findOne({ key: 'id', equals: request.body.userId });
      if (subscriber === null) {
        throw fastify.httpErrors.notFound();
      }

      if (!subscriber.subscribedToUserIds.includes(request.params.id)) {
        throw fastify.httpErrors.badRequest();
      }

      const userToUnsubscribe = await fastify.db.users.findOne({ key: 'id', equals: request.params.id });
      if (userToUnsubscribe === null) {
        throw fastify.httpErrors.notFound();
      }

      const removeIndex = subscriber.subscribedToUserIds.indexOf(request.params.id);
      subscriber.subscribedToUserIds.slice(removeIndex, 1);
      await fastify.db.users.change(request.body.userId, subscriber);

      return subscriber;
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
      if (!validate(request.params.id)) {
        throw fastify.httpErrors.badRequest();
      }
      
      const userToChange = await fastify.db.users.findOne({ key: 'id', equals: request.params.id });
      if (userToChange === null) {
        throw fastify.httpErrors.notFound();
      } 

      return await fastify.db.users.change(request.params.id, request.body);
    }
  );
};

export default plugin;
