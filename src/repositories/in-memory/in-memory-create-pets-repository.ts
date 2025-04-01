import { Pets, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class inMemoryCreatePetsRepository implements PetsRepository {
  public items: Pets[] = []

  async create(data: Prisma.PetsUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      age: data.name,
      about: data.about,
      type: data.type,
      size: data.size,
      color: data.color,
      independencyLevel: data.independencyLevel,
      environment: data.environment,
      created_at: new Date(),
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }
}
