import { AuthenticateOrgUseCase } from './authenticate-org-use-case'
import { inMemoryCreateOrgsRepository } from '@/repositories/in-memory/in-memory-create-orgs-repository'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'

let orgsRepository: inMemoryCreateOrgsRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new inMemoryCreateOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      name: 'org 1',
      email: 'org1@org.com',
      password_hash: await hash('123456', 6),
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
      email: 'org1@org.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(
      sut.execute({
        email: 'org1@org.com',
        password: '123456',
      }),
    ).rejects.toThrow('Invalid Credentials')
  })
})
