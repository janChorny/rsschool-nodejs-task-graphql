import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createProfileBodySchema, changeProfileBodySchema } from './schema';
// import type { ProfileEntity } from '../../utils/DB/entities/DBProfiles';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    const profiles = await this.db.profiles.findMany();

    return profiles;
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply) {
      const profile = await this.db.profiles.findOne({ key: 'id', equals: request.params.id });

      if (profile) {
        return profile;
      }

      return this.httpErrors.notFound();
    },
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createProfileBodySchema,
      },
    },
    async function (request, reply) {
      const isUserProfileExist = await this.db.profiles.findOne({ key: 'userId', equals: request.body.userId });
      const isMemberTypeExist = await this.db.memberTypes.findOne({key: 'id', equals: request.body.memberTypeId})
      const profile = await this.db.profiles.create(request.body);

      if (!isUserProfileExist && isMemberTypeExist) {
        return profile;
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
        await this.db.profiles.delete(request.params.id);

        return this.httpErrors.notFound();
      } catch (error) {
        return this.httpErrors.badRequest();
      }
    },
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeProfileBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply) {
      try {
        const profile = await this.db.profiles.change(request.params.id, request.body);

        return profile;
      } catch (error) {
        return this.httpErrors.badRequest();
      }
    },
  );
};

export default plugin;
