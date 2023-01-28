import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { graphql, GraphQLSchema } from 'graphql';
import { graphqlBodySchema } from './schema';
import { userQuery } from './users/userQuery';

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
        query: userQuery
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
