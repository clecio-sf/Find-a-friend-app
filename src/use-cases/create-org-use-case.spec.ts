import { CreateOrgUseCase } from './create-org-use-case'
import { inMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'

let orgsRepository: inMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new inMemoryOrgsRepository()
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
  it('should not be able to register with same email twice', async () => {
    const email = 'org1@org.com'

    await sut.execute({
      name: 'org 1',
      email,
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

    await expect(() =>
      sut.execute({
        name: 'org 1',
        email,
        password: '123456',
        whatsapp: '77777777',
        street: 'Street A',
        number: '10',
        city: 'city 1',
        state: 'BOSTIL',
        zipcode: '1234',
        latitude: -14.8478133,
        longitude: -40.867746,
      }),
    ).rejects.toThrow('Organization with this email already exists')
  })

  it('Should hash org password upon registration', async () => {
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

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
