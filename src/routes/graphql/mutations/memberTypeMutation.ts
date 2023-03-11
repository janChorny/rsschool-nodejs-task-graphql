import { FastifyInstance } from "fastify";
import { GraphQLString } from "graphql";
import { MemberTypeEntity } from "../../../utils/DB/entities/DBMemberTypes";
import { ContextValueType } from "../loaders/loaders";
import { memberType, updateMemberType } from "../types/memberType";

export const updateMemberTypeQuery = {
  type: memberType,
  args: {
    memberTypeId: { type: GraphQLString },
    memberType: { type: updateMemberType }
  },
  resolve: async (_: any, args: any, context: ContextValueType): Promise<MemberTypeEntity> => {
    const id = args.memberTypeId;
    const fastify: FastifyInstance = context.fastify;

    const memberType = await context.loaders.memberTypeById.load(id);

    if (memberType === null) {
      throw fastify.httpErrors.badRequest('Member type not found');
    }

    const updatedMemberType = await fastify.db.memberTypes.change(id, args.memberType);

    return updatedMemberType!;
  }
};
