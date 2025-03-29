import { Org } from '@prisma/client'
import { compare } from 'bcryptjs'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrgUseCaseResponse {
  org: Org
}

export class AuthenticateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new Error('Invalid Credentials')
    }

    const doesPasswordMatches = await compare(password, org.password_hash)

    if (!doesPasswordMatches) {
      throw new Error('Invalid Credentials')
    }

    return {
      org,
    }
  }
}
