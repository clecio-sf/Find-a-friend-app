import { FastifyReply, FastifyRequest } from 'fastify'

export async function jwtVerify(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized jwt' })
  }
}
