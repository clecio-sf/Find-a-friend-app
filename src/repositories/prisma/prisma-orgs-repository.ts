import { Org, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async findByManyCity(city: string): Promise<Org[]> {
    const org = await prisma.org.findMany({
      where: {
        city,
      },
    })

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })
    return org
  }
}
