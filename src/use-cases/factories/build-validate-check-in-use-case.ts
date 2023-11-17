import { PrismaCheckInsRepositoru } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../validateCheckIn'

export function buildValidateCheckInUseCase() {
  const checkInRepo = new PrismaCheckInsRepositoru()
  const validateCheckInUseCase = new ValidateCheckInUseCase(checkInRepo)

  return validateCheckInUseCase
}
