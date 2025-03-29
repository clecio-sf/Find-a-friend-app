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
    await useCase.execute(data)

    return reply.status(200).send()
  } catch (err) {}
  return reply.status(400).send('Invalid Credentials')
}
