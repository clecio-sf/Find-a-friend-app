import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreateOrgUseCase } from '@/use-cases/create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const orgsRepository = new PrismaOrgsRepository()
const useCase = new CreateOrgUseCase(orgsRepository)

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    whatsapp: z.string(),
    street: z.string(),
    number: z.string(),
    city: z.string(),
    state: z.string(),
    zipcode: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  })

  const data = createBodySchema.parse(request.body)

  await useCase.execute(data)

  return reply.status(200).send()
}
