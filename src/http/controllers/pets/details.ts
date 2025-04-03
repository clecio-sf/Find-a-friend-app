import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetDetailsUseCase } from '@/use-cases/get-pet-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const petsRepository = new PrismaPetsRepository()
const useCase = new GetPetDetailsUseCase(petsRepository)

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const { pets } = await useCase.execute({ pet_id: id })

  return reply.status(200).send({ pets })
}
