import { FastifyPluginAsync, RouteShorthandOptions } from 'fastify';
import { Static, Type } from '@sinclair/typebox';

const User = Type.Object({
  name: Type.String(),
  mail: Type.Optional(Type.String({ format: "email" })),
});
type UserType = Static<typeof User>;
const reqOpts: RouteShorthandOptions = {
  schema: {
    body: User
  }
};
interface GetUserRequest {
  Body: UserType,
  Reply: UserType
}

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  });

  fastify.post<GetUserRequest>('/user', reqOpts, async(request, reply)=> {
    request.log.info("User Name: " + request.body.name);
    request.log.info("User Mail: " + request.body.mail);

    return {...request.body};
  });
}

export default root;
