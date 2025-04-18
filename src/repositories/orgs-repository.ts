import { Org, Prisma } from '@prisma/client'

export interface OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findByEmail(email: string): Promise<Org | null>
  findByManyCity(city: string): Promise<Org[]>
  findById(id: string): Promise<Org | null>
}
