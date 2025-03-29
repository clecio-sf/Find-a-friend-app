import { CreateOrgUseCase } from './create-org-use-case'
import { inMemoryCreateOrgsRepository } from '@/repositories/in-memory/in-memory-create-orgs-repository'
import { expect, describe, it, beforeEach } from 'vitest'

let orgsRepository: inMemoryCreateOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new inMemoryCreateOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create an org', async () => {
    const { org } = await sut.execute({
      name: 'org 1',
      email: 'org1@org.com',
      password: '123456',
      whatsapp: '77777777',
      street: 'Street A',
      number: '10',
      city: 'city 1',
      state: 'BOSTIL',
      zipcode: '1234',
      latitude: -14.8478133,
      longitude: -40.867746,
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
