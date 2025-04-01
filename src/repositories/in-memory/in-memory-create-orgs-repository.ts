import { Org, Prisma, Role } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class inMemoryCreateOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      whatsapp: data.whatsapp,
      street: data.street,
      number: data.number,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
      role: Role.MEMBER,
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    return org || null
  }

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    return org || null
  }

  async findByManyCity(city: string): Promise<Org[]> {
    return this.items.filter((item) => item.city === city)
  }
}
