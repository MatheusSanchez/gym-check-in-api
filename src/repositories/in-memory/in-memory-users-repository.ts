import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../user-repository'

export class InMemoryUserRepository implements UserRepository {
  public dbUsers: User[] = []

  async create({ name, email, password_hash }: Prisma.UserCreateInput) {
    const user: User = {
      id: 'user-in-memory-1',
      email,
      password_hash,
      name,
      created_at: new Date(),
    }

    this.dbUsers.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.dbUsers.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(userId: string) {
    const user = this.dbUsers.find((user) => user.id === userId)

    if (!user) {
      return null
    }

    return user
  }
}
