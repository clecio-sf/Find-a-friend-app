import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateOrgUseCase } from '@/use-cases/authenticate-org-use-case'

const orgsRepository = new PrismaOrgsRepository()
const useCase = new AuthenticateOrgUseCase(orgsRepository)

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const data = authenticateBodySchema.parse(request.body)

  try {
    const { org } = await useCase.execute(data)

    const token = await reply.jwtSign(
      {
        role: org.role,
      },
      {
        sign: {
          sub: org.id,
        },
      },
    )

    return reply.status(200).send({
      token,
    })
  } catch (err) {
    return reply.status(400).send('Invalid Credentials')
  }
}
