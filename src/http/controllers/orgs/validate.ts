import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { ValidateOrgUseCase } from '@/use-cases/validate-org-use-case'

const orgsRepository = new PrismaOrgsRepository()
const useCase = new ValidateOrgUseCase(orgsRepository)

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateOrgParamsSchema = z.object({
    orgId: z.string().uuid(),
  })

  const data = validateOrgParamsSchema.parse(request.params)

  await useCase.execute(data)

  return reply
    .status(200)
    .send({ message: 'Organization successfully validated' })
}
