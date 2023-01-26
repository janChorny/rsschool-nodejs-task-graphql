import { FastifyInstance } from "fastify/types/instance";
// import { MercuriusLoaders } from "mercurius";

export const getUserByIdWithEntitiesResolver = {
  Query: {
    getUserByIdWithEntities: async (
      root: unknown,
      { id }: { id: string },
      fastify: FastifyInstance
    ) => {
      const user = await fastify.db.users.findOne({ key: "id", equals: id });

      if (user) {
        return user;
      }

      throw fastify.httpErrors.notFound();
    },
  },
  // User: {
  //   profile: async (
  //     queries: ProfileEntity,
  //     _: any,
  //     fastify: FastifyInstance
  //   ) => {
  //     const profile = await fastify.db.profiles.findOne({
  //       key: "userId",
  //       equals: queries.id,
  //     });

  //     console.log("profile",profile);

  //     if (profile) {
  //       const { userId, ...rest } = profile;
  //       console.log("rest",rest);
  //       return rest;
  //     }
  //   },
  // },
};

// export const getUserByIdWithEntitiesLoaders: MercuriusLoaders = {
//   UserWithEntities: {
//     async profile(queries, ctx) {
//       const { db } = ctx.app;

//       return queries.map(({ obj, params }) => {
//         return db.profiles.findOne({
//           key: "userId",
//           equals: obj.id,
//         });
//       });
//     },
//     async posts(queries, ctx) {
//       const { db } = ctx.app;

//       return queries.map(async ({ obj, params }) => {
//         const posts = await db.posts.findMany({
//           key: "userId",
//           equals: obj.id,
//         });

//         return posts.map((post) =>
//           db.posts.findOne({
//             key: "id",
//             equals: post.id,
//           })
//         );
//       });
//     },
//     async memberType(queries, ctx) {
//       const { db } = ctx.app;

//       return queries.map(async ({ obj, params }) => {
//         const profile = await db.profiles.findOne({
//           key: "userId",
//           equals: obj.id,
//         });

//         if (profile)
//           return db.memberTypes.findOne({
//             key: "id",
//             equals: profile.memberTypeId,
//           });
//       });
//     },
//   },
// };