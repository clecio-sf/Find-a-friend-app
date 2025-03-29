import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class inMemoryCreateOrgsRepository implements OrgsRepository {
  public itens: Org[] = []

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
    }

    this.itens.push(org)

    return org
  }
}
