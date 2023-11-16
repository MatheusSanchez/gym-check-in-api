import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymUseCase } from '../searchGym'

export function buildSearchGymUseCase() {
  const gymRepository = new PrismaGymsRepository()
  const searchGymUseCase = new SearchGymUseCase(gymRepository)

  return searchGymUseCase
}
