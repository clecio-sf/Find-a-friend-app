import { Pets, Prisma } from '@prisma/client'
import { PetFilters, PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { inMemoryOrgsRepository } from './in-memory-orgs-repository'

export class inMemoryPetsRepository implements PetsRepository {
  constructor(private orgsRepository: inMemoryOrgsRepository) {}

  public items: Pets[] = []

  async create(data: Prisma.PetsUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      age: data.age,
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

  async findAll(params: PetFilters): Promise<Pets[]> {
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === params.city,
    )

    const pets = this.items
      .filter((item) => orgsByCity.some((org) => org.id === item.org_id))
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.type ? item.type === params.type : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) => (params.color ? item.color === params.color : true))
      .filter((item) =>
        params.independencyLevel
          ? item.independencyLevel === params.independencyLevel
          : true,
      )
      .filter((item) =>
        params.environment ? item.environment === params.environment : true,
      )

    return pets
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    return pet || null
  }
}
