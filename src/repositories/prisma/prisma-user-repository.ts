import { prisma } from '../../lib/prisma'
import { Prisma } from '@prisma/client'
import { UserRepository } from '../user-repository'

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const newUser = await prisma.user.create({ data })

    return newUser
  }

  async findById(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    return user
  }
}
