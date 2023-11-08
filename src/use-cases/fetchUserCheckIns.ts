import { CheckInRepository } from '@/repositories/check-in-repository'
import { CheckIn } from '@prisma/client'

export interface FetchUserCheckInsRequest {
  userId: string
  page: number
}

export interface FetchUserCheckInsResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({ userId, page }: FetchUserCheckInsRequest) {
    const checkIns: CheckIn[] = await this.checkInRepository.findManyByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}
