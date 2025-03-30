import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface ValidateOrgUseCaseRequest {
  orgId: string
}

interface ValidateOrgUseCaseResponse {
  org: Org
}

export class ValidateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: ValidateOrgUseCaseRequest): Promise<ValidateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new Error('Organization not found')
    }

    return {
      org,
    }
  }
}
