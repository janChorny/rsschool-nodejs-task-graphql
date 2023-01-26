import { MercuriusLoaders } from "mercurius";

export const loaders: MercuriusLoaders = {
  UserWithEntities: {
    async profile(queries, ctx) {
      const { db } = ctx.app;

      return queries.map(({ obj, params }) => {
        return db.profiles.findOne({
          key: "userId",
          equals: obj.id,
        });
      });
    },
    async posts(queries, ctx) {
      const { db } = ctx.app;

      return queries.map(async ({ obj, params }) => {
        const posts = await db.posts.findMany({
          key: "userId",
          equals: obj.id,
        });

        return posts.map((post) =>
          db.posts.findOne({
            key: "id",
            equals: post.id,
          })
        );
      });
    },
    async memberType(queries, ctx) {
      const { db } = ctx.app;

      return queries.map(async ({ obj, params }) => {
        const profile = await db.profiles.findOne({
          key: "userId",
          equals: obj.id,
        });

        if (profile)
          return db.memberTypes.findOne({
            key: "id",
            equals: profile.memberTypeId,
          });
      });
    },
  },
};
