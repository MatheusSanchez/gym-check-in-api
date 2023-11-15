import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-in-repository'
import { ResourceNotFoundError } from './errors/resourceNotFound'
import dayjs from 'dayjs'
import { LateCheckInError } from './errors/lateCheckInError'

export interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

export interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInError()
    }

    checkIn.validated_at = new Date()
    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}
