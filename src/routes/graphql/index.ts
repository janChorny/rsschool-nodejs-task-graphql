// import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
// import { graphqlBodySchema } from './schema';

// const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
//   fastify
// ): Promise<void> => {
//   fastify.post(
//     '/',
//     {
//       schema: {
//         body: graphqlBodySchema,
//       },
//     },
//     async function (request, reply) {}
//   );
// };

// export default plugin;

import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { entitiesTypeDefs } from './resolvers/entities/typeDefs';
import { entitiesByIdTypeDefs } from './resolvers/entitiesById/typeDefs';
import { entitiesResolver } from './resolvers/entities/resolver';
import { entitiesByIdResolver } from './resolvers/entitiesById/resolver';

export const schema = makeExecutableSchema({
      typeDefs: mergeTypeDefs([entitiesTypeDefs, entitiesByIdTypeDefs]),
      resolvers: mergeResolvers([entitiesResolver, entitiesByIdResolver]),
})