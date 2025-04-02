import { $Enums, Pets, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PetsRepository, PetFilters } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findAll(params: PetFilters): Promise<Pets[]> {
    const pets = await prisma.pets.findMany({
      where: {
        age: {
          contains: params.age,
          mode: 'insensitive',
        },
        type: {
          contains: params.type,
          mode: 'insensitive',
        },
        size: {
          contains: params.size,
          mode: 'insensitive',
        },
        color: {
          contains: params.color,
          mode: 'insensitive',
        },
        environment: params.environment as $Enums.Environment,
        independencyLevel: params.independencyLevel as $Enums.IndependencyLevel,
        org: {
          city: {
            contains: params.city,
            mode: 'insensitive',
          },
        },
      },
      include: {
        org: {
          select: {
            name: true,
            whatsapp: true,
          },
        },
      },
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pets.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async create(data: Prisma.PetsUncheckedCreateInput) {
    const pet = await prisma.pets.create({
      data,
    })

    return pet
  }
}
