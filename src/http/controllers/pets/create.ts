import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '@/use-cases/create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const petsRepository = new PrismaPetsRepository()
const useCase = new CreatePetUseCase(petsRepository)

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    age: z.string(),
    about: z.string(),
    type: z.string(),
    size: z.string(),
    color: z.string(),
    independencyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    environment: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    org_id: z.string().uuid(),
  })

  const data = createBodySchema.parse(request.body)

  await useCase.execute(data)

  return reply.status(200).send()
}
