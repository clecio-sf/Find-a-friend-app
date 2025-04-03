import { inMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { ValidateOrgUseCase } from './validate-org-use-case'
import { expect, it, beforeEach, describe } from 'vitest'

let orgsRepository: inMemoryOrgsRepository
let sut: ValidateOrgUseCase

describe('Validate Org Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new inMemoryOrgsRepository()
    sut = new ValidateOrgUseCase(orgsRepository)
  })

  it('Should be able to validate an org', async () => {
    const createdOrg = await orgsRepository.create({
      name: 'org 1',
      email: 'org1@org.com',
      password_hash: '123456',
      whatsapp: '77777777',
      street: 'Street A',
      number: '10',
      city: 'city 1',
      state: 'BOSTIL',
      zipcode: '1234',
      latitude: -14.8478133,
      longitude: -40.867746,
    })

    const { org } = await sut.execute({
      orgId: createdOrg.id,
    })

    expect(org.id).toEqual(createdOrg.id)
  })

  it('Should not be able to validate an in inexistent org', async () => {
    await expect(() =>
      sut.execute({
        orgId: 'Inexistent-org-id',
      }),
    ).rejects.toThrow('Organization not found')
  })
})
