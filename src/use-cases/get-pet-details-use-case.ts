import { Pets } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface GetPetDetailsUseCaseRequest {
  pet_id: string
}

interface GetPetDetailsUseCaseResponse {
  pets: Pets
}

export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    data: GetPetDetailsUseCaseRequest,
  ): Promise<GetPetDetailsUseCaseResponse> {
    const pets = await this.petsRepository.findById(data.pet_id)

    if (!pets) {
      throw new Error('Pet not found')
    }

    return { pets }
  }
}
