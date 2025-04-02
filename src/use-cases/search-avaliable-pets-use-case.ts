import { Pets } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface SearchAvailablePetUseCaseRequest {
  city: string
  age?: string
  type?: string
  size?: string
  color?: string
  independencyLevel?: 'LOW' | 'MEDIUM' | 'HIGH'
  environment?: 'SMALL' | 'MEDIUM' | 'LARGE'
}

interface SearchAvailablePetUseCaseResponse {
  pets: Pets[]
}

export class SearchAvailablePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    data: SearchAvailablePetUseCaseRequest,
  ): Promise<SearchAvailablePetUseCaseResponse> {
    const pets = await this.petsRepository.findAll(data)

    return {
      pets,
    }
  }
}
