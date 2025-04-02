import { Pets, Prisma } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface CreatePetUseCaseRequest {
  name: string
  age: string
  about: string
  type: string
  size: string
  color: string
  independencyLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  environment: 'SMALL' | 'MEDIUM' | 'LARGE'
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pets
}

export class CreatePetUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute(
    data: CreatePetUseCaseRequest,
  ): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petRepository.create(
      data as Prisma.PetsUncheckedCreateInput,
    )

    return {
      pet,
    }
  }
}
