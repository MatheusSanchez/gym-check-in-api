import { PrismaCheckInsRepositoru } from '@/repositories/prisma/prisma-check-ins-repository'
import { GetUserMetricsUseCase } from '../getUserMetrics'

export function buildGetUserMetricsUseCase() {
  const checkInRepo = new PrismaCheckInsRepositoru()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInRepo)

  return getUserMetricsUseCase
}
