import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createProfileBodySchema, changeProfileBodySchema } from './schema';
import type { ProfileEntity } from '../../utils/DB/entities/DBProfiles';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<
    ProfileEntity[]
    > {
    const profiles = await this.db.profiles.findMany();

    reply.code(200).send(profiles)
    return profiles;
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      const profile = await this.db.profiles.findOne({ key: 'id', equals: request.params.id });

      if (profile) {
        reply.code(200).send(profile);
        profile;
      }

      return reply.code(404);
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createProfileBodySchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      const profile = await this.db.profiles.create(request.body);

      if (profile) {
        reply.code(200).send(profile);
        return profile;
      }

      return reply.code(400);
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      const profileExist = await this.db.profiles.findOne({ key: 'id', equals: request.params.id });

      if (profileExist) {
        await this.db.profiles.delete(request.params.id);

        return reply.code(404);
      }

      return reply.code(400);
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeProfileBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      const profile = await this.db.profiles.change(request.params.id, request.body);

      if (profile) {
        reply.code(200).send(profile);
        return profile;
      }

      return reply.code(400);
    }
  );
};

export default plugin;
