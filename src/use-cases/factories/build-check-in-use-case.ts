import { PrismaCheckInsRepositoru } from '@/repositories/prisma/prisma-check-ins-repository'
import { CheckInUseCase } from '../checkIn'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function buildCheckInUseCase() {
  const checkInRepo = new PrismaCheckInsRepositoru()
  const gymRepository = new PrismaGymsRepository()
  const checkInUseCase = new CheckInUseCase(checkInRepo, gymRepository)

  return checkInUseCase
}
