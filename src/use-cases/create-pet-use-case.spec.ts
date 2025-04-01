import { CreatePetUseCase } from './create-pet-use-case'
import { inMemoryCreatePetsRepository } from '@/repositories/in-memory/in-memory-create-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'

let petsRepository: inMemoryCreatePetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new inMemoryCreatePetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create an pet', async () => {
    const { pet } = await sut.execute({
      name: 'cleitin',
      age: '4',
      about: 'um capeta',
      type: 'gato',
      size: 'pequeno',
      color: 'preto',
      independencyLevel: 'LOW',
      environment: 'LARGE',
      org_id: '1',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
