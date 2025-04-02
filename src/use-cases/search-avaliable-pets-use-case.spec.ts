import { inMemoryCreateOrgsRepository } from '@/repositories/in-memory/in-memory-create-orgs-repository'
import { inMemoryCreatePetsRepository } from '@/repositories/in-memory/in-memory-create-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchAvailablePetUseCase } from './search-avaliable-pets-use-case'

let petsRepository: inMemoryCreatePetsRepository
let orgsRepository: inMemoryCreateOrgsRepository
let sut: SearchAvailablePetUseCase

describe('Search Avaliable Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new inMemoryCreateOrgsRepository()
    petsRepository = new inMemoryCreatePetsRepository(orgsRepository)
    sut = new SearchAvailablePetUseCase(petsRepository)
  })

  it('should be able do search avaliable pets', async () => {
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

    await petsRepository.create({
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

    await petsRepository.create({
      name: 'Luna',
      age: '1',
      about: 'Quiet and observant cat',
      type: 'cat',
      size: 'small',
      color: 'gray',
      independencyLevel: 'HIGH',
      environment: 'SMALL',
      org_id: org.id,
    })

    const { pets } = await sut.execute({
      city: 'Springfield',
      type: 'cat',
    })

    console.log(pets)

    expect(pets).toHaveLength(1)
    expect(pets[0].name).toBe('Luna')
  })
})
