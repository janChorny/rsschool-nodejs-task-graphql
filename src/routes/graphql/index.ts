import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { entitiesTypeDefs } from './resolvers/entities/typeDefs';
import { entitiesByIdTypeDefs } from './resolvers/entitiesById/typeDefs';
import { entitiesResolver } from './resolvers/entities/resolver';
import { entitiesByIdResolver } from './resolvers/entitiesById/resolver';
import { createUserTypeDefs } from './resolvers/createUser/typeDefs';
import { createUserResolver } from './resolvers/createUser/resolver';
import { createProfileTypeDefs } from './resolvers/createProfile/typeDefs';
import { createProfileResolver } from './resolvers/createProfile/resolver';
import { createPostResolver } from './resolvers/createPost/resolver';
import { createPostTypeDefs } from './resolvers/createPost/typeDefs';
import { updatePostTypeDefs } from './resolvers/updatePost/typeDefs';
import { updatePostResolver } from './resolvers/updatePost/resolver';
import { updateMemberTypeResolver } from './resolvers/updateMemberType/resolver';
import { updateUserResolver } from './resolvers/updateUser/resolver';
import { updateProfileResolver } from './resolvers/updateProfile/resolver';
import { updateProfileTypeDefs } from './resolvers/updateProfile/typeDefs';
import { updateUserTypeDefs } from './resolvers/updateUser/typeDefs';
import { updateMemberTypeTypeDefs } from './resolvers/updateMemberType/typeDefs';

export const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([
    entitiesTypeDefs,
    entitiesByIdTypeDefs,
    createUserTypeDefs,
    createProfileTypeDefs,
    createPostTypeDefs,
    updatePostTypeDefs,
    updateUserTypeDefs,
    updateProfileTypeDefs,
    updatePostTypeDefs,
    updateMemberTypeTypeDefs,
  ]),
  resolvers: mergeResolvers([
    entitiesResolver,
    entitiesByIdResolver,
    createUserResolver,
    createProfileResolver,
    createPostResolver,
    updatePostResolver,
    updateMemberTypeResolver,
    updateUserResolver,
    updateProfileResolver,
  ]),
});