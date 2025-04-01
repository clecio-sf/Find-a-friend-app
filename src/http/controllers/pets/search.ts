import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchAvailablePetUseCase } from '@/use-cases/search-avaliable-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const petsRepository = new PrismaPetsRepository()
const useCase = new SearchAvailablePetUseCase(petsRepository)

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    type: z.string().optional(),
    size: z.string().optional(),
    color: z.string().optional(),
    independencyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    environment: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
  })

  const data = createBodySchema.parse(request.query)

  const { pets } = await useCase.execute(data)

  return reply.status(200).send({ pets })
}
