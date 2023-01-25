import { FastifyInstance } from "fastify/types/instance";
// import { ProfileEntity } from "../../../../utils/DB/entities/DBProfiles";
import { MercuriusLoaders } from "mercurius";
import DB from "../../../../utils/DB/DB";

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

export const loaders: MercuriusLoaders = {
  User: {
    profile: {
      async loader(queries: any) {
        const db = new DB();

        const profile = await db.profiles.findOne({
          key: "userId",
          equals: queries.id,
        });

        if (profile) {
          const { userId, ...rest } = profile;
          return rest;
        }
      },
      opts: {
        cache: false,
      },
    },
  },
};

// const loaders = {
//     Song: {
//             genre: async (queries, {client}) => {
//             let genreids = queries.map(({ obj }) => obj.genreid)
//             let {rows} = await client.query(`
//             SELECT genreid, genredescription genre FROM genres WHERE  genres.genreid = ANY ($1)
//             `,[genreids])
//             return genreids.map(genreid => {
//                return rows.filter(genreitem => genreitem.genreid === genreid)[0].genre
//             })
//         },
//     }
// }

// type Song {
//  songid: ID!
//  songname: String!
//  genre: String!
// }
// type Query {
//  songs: [Song]
// }
