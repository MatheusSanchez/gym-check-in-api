import { PrismaCheckInsRepositoru } from '@/repositories/prisma/prisma-check-ins-repository'

import { FetchUserCheckInsUseCase } from '../fetchUserCheckIns'

export function buildFetchUserCheckInsUseCase() {
  const checkInRepo = new PrismaCheckInsRepositoru()
  const fetchUserCheckInsUseCase = new FetchUserCheckInsUseCase(checkInRepo)

  return fetchUserCheckInsUseCase
}
