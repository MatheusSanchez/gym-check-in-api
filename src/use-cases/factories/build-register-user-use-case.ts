import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { RegisterUserUseCase } from '../registerUser'

export function buildRegisterUserUseCase() {
  const userRepository = new PrismaUserRepository()
  const userRegisterUseCase = new RegisterUserUseCase(userRepository)

  return userRegisterUseCase
}
