import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { graphql, GraphQLSchema } from 'graphql';
import { graphqlBodySchema } from './schema';
import { generalQuery } from './query';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.post(
    '/',
    {
      schema: {
        body: graphqlBodySchema,
      },
    },
    async function (request, reply) {

      const schema: GraphQLSchema = new GraphQLSchema({
        query: generalQuery
      });

      return await graphql({
        schema: schema,
        source: String(request.body.query),
        contextValue: fastify
      });

    }
  );
};

export default plugin;
