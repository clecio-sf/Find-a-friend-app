import { Pets, Prisma } from '@prisma/client'

export interface PetFilters {
  city: string
  age?: string
  type?: string
  size?: string
  color?: string
  environment?: string
  independencyLevel?: string
}

export interface PetsRepository {
  create(data: Prisma.PetsUncheckedCreateInput): Promise<Pets>
  findAll(params: PetFilters): Promise<Pets[]>
  findById(id: string): Promise<Pets | null>
}
