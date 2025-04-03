import { inMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetPetDetailsUseCase } from './get-pet-details-use-case'
import { inMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'

let petsRepository: inMemoryPetsRepository
let orgsRepository: inMemoryOrgsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Detail', () => {
  beforeEach(() => {
    orgsRepository = new inMemoryOrgsRepository()
    petsRepository = new inMemoryPetsRepository(orgsRepository)
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get an pet details', async () => {
    const org = await orgsRepository.create({
      name: 'Happy Tails Rescue',
      email: 'contact@happytails.org',
      password_hash: 'hashed_password_here',
      whatsapp: '+15551234567',
      street: 'Maple Street',
      number: '456',
      city: 'Springfield',
      state: 'CA',
      zipcode: '90210',
      latitude: 34.0522,
      longitude: -118.2437,
    })

    const pet = await petsRepository.create({
      name: 'Buddy',
      age: '3',
      about: 'Friendly and loyal dog',
      type: 'dog',
      size: 'small',
      color: 'brown',
      independencyLevel: 'LOW',
      environment: 'LARGE',
      org_id: org.id,
    })

    const { pets } = await sut.execute({
      pet_id: pet.id,
    })

    expect(pets).toEqual(
      expect.objectContaining({
        name: 'Buddy',
        age: '3',
        about: 'Friendly and loyal dog',
        type: 'dog',
        size: 'small',
        color: 'brown',
        independencyLevel: 'LOW',
        environment: 'LARGE',
        org_id: org.id,
      }),
    )
  })
})
