import { CreatePetUseCase } from './create-pet-use-case'
import { inMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { inMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, describe, it, beforeEach } from 'vitest'

let petsRepository: inMemoryPetsRepository
let orgsRepository: inMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new inMemoryOrgsRepository()
    petsRepository = new inMemoryPetsRepository(orgsRepository) // passa o orgsRepository aqui
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a pet', async () => {
    const org = await orgsRepository.create({
      name: 'Org Example',
      email: 'org@example.com',
      password_hash: '123456',
      whatsapp: '123456789',
      street: 'Rua A',
      number: '123',
      city: 'Cidade',
      state: 'SP',
      zipcode: '00000000',
      latitude: 0,
      longitude: 0,
    })

    const { pet } = await sut.execute({
      name: 'Oreo',
      age: '4',
      about: 'a nice cat',
      type: 'gato',
      size: 'small',
      color: 'preto',
      independencyLevel: 'LOW',
      environment: 'LARGE',
      org_id: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
