import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../createGym'

export function buildCreateGymUseCase() {
  const gymRepository = new PrismaGymsRepository()
  const createGymUseCase = new CreateGymUseCase(gymRepository)

  return createGymUseCase
}
