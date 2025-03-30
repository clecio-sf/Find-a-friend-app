import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'

interface CreateOrgUseCaseRequest {
  name: string
  email: string
  password: string
  whatsapp: string
  street: string
  number: string
  city: string
  state: string
  zipcode: string
  latitude: number
  longitude: number
}

interface CreatePetUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute(
    data: CreateOrgUseCaseRequest,
  ): Promise<CreatePetUseCaseResponse> {
    const { email, password, ...orgData } = data

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new Error('Organization with this email already exists')
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgRepository.create({
      ...orgData,
      email,
      password_hash,
    })

    return {
      org,
    }
  }
}
