import { Gym } from '@prisma/client'
import { GymRepository } from '@/repositories/gym-repository'

export interface SearchGymUseCaseRequest {
  title: string
  page: number
}

export interface SearchGymUseCaseResponse {
  gym: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    title,
    page,
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    const gym = await this.gymRepository.searchByTitle(title, page)

    return { gym }
  }
}
