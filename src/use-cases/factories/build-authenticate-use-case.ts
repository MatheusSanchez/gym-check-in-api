import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { AuthenticateUserUseCase } from '../authenticateUser'

export function buildAuthenticateUseCase() {
  const userRepository = new PrismaUserRepository()
  const authenticateUser = new AuthenticateUserUseCase(userRepository)

  return authenticateUser
}
