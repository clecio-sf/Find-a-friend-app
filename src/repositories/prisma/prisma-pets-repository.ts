import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetsUncheckedCreateInput) {
    const pet = await prisma.pets.create({
      data,
    })

    return pet
  }
}
