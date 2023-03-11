import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { graphql, GraphQLSchema } from 'graphql';
import { graphqlBodySchema } from './schema';
import { generalQuery } from './query';
import { createDataLoaders } from './loaders/loaders';
import { validateQuery } from '../../utils/validateQuery';
import { generalMutation } from './mutation';

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
        query: generalQuery,
        mutation: generalMutation
      });
      const { query, variables } = request.body;
      const validationErrors = validateQuery(schema, String(query), fastify);

      if (validationErrors.length > 0) {
        reply.send({ data: null, errors: validationErrors });
        return;
      }

      const loaders = createDataLoaders(fastify);

      return await graphql({
        schema: schema,
        source: String(query),
        variableValues: variables,
        contextValue: {
          fastify,
          loaders
        },
      });

    }
  );
};

export default plugin;
